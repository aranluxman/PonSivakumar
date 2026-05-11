"use client";

import { FormEvent, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hello, I can help with investment strategy, the Kennedy & Denison Plaza details, or booking a call with Pon."
  }
];

const prompts = [
  "Tell me about the featured Markham asset",
  "What is the investment strategy?",
  "How do I book a call?"
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function sendMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: nextMessages })
      });
      const data = (await response.json()) as { ok?: boolean; message?: string; reply?: string };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.message || "The assistant is unavailable right now.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply || "" }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "The assistant is unavailable right now."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      <button
        className="chat-widget__launcher"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => {
          setOpen((value) => !value);
          window.setTimeout(() => inputRef.current?.focus(), 120);
        }}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 8h20v13H13l-7 5V8Z" />
        </svg>
        <span>Chat</span>
      </button>

      <section className="chat-panel" aria-label="Website chatbot">
        <header className="chat-panel__header">
          <div>
            <strong>Investment Assistant</strong>
            <span>Ask about assets, strategy, or next steps.</span>
          </div>
          <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
            x
          </button>
        </header>

        <div className="chat-panel__messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`chat-message chat-message--${message.role}`} key={`${message.role}-${index}`}>
              {message.content}
            </div>
          ))}
          {loading ? (
            <div className="chat-message chat-message--assistant">Reviewing the details...</div>
          ) : null}
        </div>

        <div className="chat-panel__prompts">
          {prompts.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => void sendMessage(prompt)}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className="chat-panel__form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a question"
            aria-label="Ask the investment assistant"
          />
          <button type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
