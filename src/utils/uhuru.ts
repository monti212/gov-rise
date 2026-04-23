const BASE_URL = import.meta.env.VITE_UHURU_BASE_URL || 'https://ucloud.orionx.xyz/v1';
const API_KEY  = import.meta.env.VITE_UHURU_API_KEY  || '';
const MODEL    = import.meta.env.VITE_UHURU_MODEL    || 'uhuru';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function uhuruChat(messages: Message[]): Promise<string> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.7 }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Uhuru AI error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '(no response)';
}

export async function uhuruChatStream(
  messages: Message[],
  onChunk: (text: string) => void,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.7, stream: true }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Uhuru AI error ${res.status}: ${text}`);
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = decoder.decode(value, { stream: true }).split('\n');
    for (const line of lines) {
      const trimmed = line.replace(/^data: /, '').trim();
      if (!trimmed || trimmed === '[DONE]') continue;
      try {
        const json = JSON.parse(trimmed);
        const chunk = json.choices?.[0]?.delta?.content;
        if (chunk) onChunk(chunk);
      } catch {
        // ignore malformed SSE lines
      }
    }
  }
}
