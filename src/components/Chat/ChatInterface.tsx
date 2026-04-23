import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { uhuruChatStream, uhuruChat } from '../../utils/uhuru';
import type { Message } from '../../utils/uhuru';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
};

const SYSTEM_PROMPT = `You are GovRise AI, a knowledgeable and compassionate assistant specialising in refugee support, family reunification, and immigration. You help refugees, asylum seekers, caseworkers, NGO staff, and family members navigate complex immigration processes.

You have been provided with relevant excerpts from UNHCR guidelines, government immigration policies, and other authoritative documents below. Use these to answer questions accurately. If the provided context does not cover the question, draw on your general knowledge but make clear when you are doing so.

Always be:
- Clear and accessible (avoid jargon, explain acronyms)
- Compassionate and trauma-informed
- Accurate — never make up visa numbers, processing times, or legal requirements
- Helpful — always suggest a next step or who to contact if uncertain

If someone is in immediate danger, always direct them to emergency services first.`;

async function searchKnowledgeBase(query: string): Promise<{ content: string; title: string; source_url: string | null }[]> {
  const { data } = await supabase
    .from('knowledge_documents')
    .select('title, content, source_url')
    .textSearch('content', query, { type: 'plain', config: 'english' })
    .limit(3);

  // Fallback: if full-text search returns nothing, do a simple ilike search
  if (!data || data.length === 0) {
    const words = query.split(' ').filter(w => w.length > 3);
    if (words.length === 0) return [];
    const { data: fallback } = await supabase
      .from('knowledge_documents')
      .select('title, content, source_url')
      .ilike('content', `%${words[0]}%`)
      .limit(3);
    return fallback ?? [];
  }

  return data;
}

function buildContextPrompt(docs: { content: string; title: string }[]): string {
  if (docs.length === 0) return '';
  const excerpts = docs.map((d, i) =>
    `--- Source ${i + 1}: ${d.title} ---\n${d.content.slice(0, 2000)}`
  ).join('\n\n');
  return `\n\nRELEVANT KNOWLEDGE BASE EXCERPTS:\n${excerpts}\n\nPlease use the above to inform your answer.`;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm GovRise AI, your refugee support and family reunification assistant. I'm trained on UNHCR guidelines and immigration policies. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');
    setError('');

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);
    setStreamingText('');

    try {
      // 1. Search knowledge base for relevant context
      const docs = await searchKnowledgeBase(text);
      const contextBlock = buildContextPrompt(docs);
      const sourceNames = docs.map(d => d.title);

      // 2. Build messages array for Uhuru AI
      const apiMessages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT + contextBlock },
        // Include last 6 messages for context (not including the new user message)
        ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: text },
      ];

      // 3. Try streaming first, fall back to non-streaming
      let fullResponse = '';
      try {
        await uhuruChatStream(apiMessages, (chunk) => {
          fullResponse += chunk;
          setStreamingText(fullResponse);
        });
      } catch {
        // Streaming failed (e.g. CORS on SSE), fall back to regular call
        fullResponse = await uhuruChat(apiMessages);
      }

      setStreamingText('');
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: fullResponse,
        sources: sourceNames.length > 0 ? sourceNames : undefined,
      };
      setMessages(prev => [...prev, assistantMsg]);

      // 4. Save to chat_messages table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('chat_messages').insert([
          { user_id: user.id, role: 'user', content: text },
          { user_id: user.id, role: 'assistant', content: fullResponse },
        ]);
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
      setStreamingText('');
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="h-[560px] flex flex-col">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] rounded-xl p-3 text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center mb-1.5">
                  <Bot size={14} className="text-blue-600 mr-1" />
                  <span className="text-xs font-semibold text-blue-600">GovRise AI</span>
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center mb-1">
                    <BookOpen size={11} className="mr-1" /> Sources used:
                  </p>
                  {msg.sources.map((s, j) => (
                    <p key={j} className="text-xs text-blue-600 truncate">· {s}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming in-progress */}
        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[82%] bg-gray-100 text-gray-800 rounded-xl rounded-bl-none p-3 text-sm">
              <div className="flex items-center mb-1.5">
                <Bot size={14} className="text-blue-600 mr-1" />
                <span className="text-xs font-semibold text-blue-600">GovRise AI</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{streamingText}<span className="inline-block w-1.5 h-4 bg-blue-400 ml-0.5 animate-pulse rounded-sm" /></p>
            </div>
          </div>
        )}

        {/* Thinking indicator */}
        {thinking && !streamingText && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl rounded-bl-none p-3">
              <Loader2 size={16} className="text-blue-500 animate-spin" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertCircle size={14} className="mr-2 flex-shrink-0" /> {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask about visas, family reunification, UASC rights…"
            disabled={thinking}
            className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-60"
          />
          <button onClick={handleSend} disabled={!input.trim() || thinking}
            className="p-1.5 rounded-full bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-400 flex-shrink-0 transition-colors">
            <Send size={15} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-center">
          Powered by Uhuru AI · Answers informed by UNHCR guidelines & immigration policy
        </p>
      </div>
    </div>
  );
};
