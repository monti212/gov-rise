import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const UHURU_BASE_URL = Deno.env.get('UHURU_BASE_URL') ?? 'https://ucloud.orionx.xyz/v1';
const UHURU_API_KEY  = Deno.env.get('UHURU_API_KEY')  ?? '';
const UHURU_MODEL    = Deno.env.get('UHURU_MODEL')    ?? 'uhuru';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  try {
    const { messages } = await req.json();

    const upstreamRes = await fetch(`${UHURU_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${UHURU_API_KEY}`,
      },
      body: JSON.stringify({ model: UHURU_MODEL, messages, temperature: 0.7 }),
    });

    if (!upstreamRes.ok) {
      const text = await upstreamRes.text();
      return new Response(
        JSON.stringify({ error: `Uhuru AI error ${upstreamRes.status}: ${text}` }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    const data = await upstreamRes.json();
    return new Response(JSON.stringify(data), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } },
    );
  }
});
