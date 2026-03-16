import React, { useState, useRef, useEffect } from "react";
import CloseSvg from "../assets/svg/common/CloseSvg";
import InfoCircleSvg from "../assets/svg/common/InfoCircleSvg";
import SupportAvatarSvg from "../assets/svg/DemoAI/SupportAvatarSvg";
import SupportAvatarSmallSvg from "../assets/svg/DemoAI/SupportAvatarSmallSvg";
import SupportErrorSvg from "../assets/svg/DemoAI/SupportErrorSvg";
import SendButtonSvg from "../assets/svg/DemoAI/SendButtonSvg";
import { formatMarkdown } from "./chat/formatMarkdown";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const API_BASE = import.meta.env.PROD
    ? "https://api.tylerbuilds.net"
    : "http://localhost:8000";

const SUGGESTED_QUESTIONS = [
  "What are some ways that TylerBuilds can improve my business workflows?",
  "How long does a project typically take to complete?",
  "How do I get started with building a new tool for my business?",
];

function getTimestamp() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

const ProjectsAISupportDemo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! I'm the TylerBuilds assistant. Ask me anything about our services, past work, or how we can help your business.",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput]                     = useState("");
  const [isTyping, setIsTyping]               = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [suggestionsClicked, setSuggestionsClicked] = useState(false);
  const [sessionId, setSessionId]             = useState<string | null>(null);
  const messagesEndRef                        = useRef<HTMLDivElement>(null);
  const inputRef                              = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: content.trim(),
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content.trim(),
          session_id: sessionId,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      setSessionId(data.session_id);

      const assistantMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: data.message,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError("Unable to connect to AI service. Please try again.");
      console.error("AI Support Demo Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (question: string) => {
    setSuggestionsClicked(true);
    sendMessage(question);
  };

  return (
    <div className="ai-support-demo">
      <div className="ai-support-header">
        <div className="ai-support-header-info">
          <div className="ai-support-avatar">
            <SupportAvatarSvg />
          </div>
          <div>
            <h3>AI Support Assistant</h3>
            <span className="ai-support-status">
              <span className="ai-support-status-dot"></span>
              Online
            </span>
          </div>
        </div>
        <button className="btn ai-support-close" onClick={onClose} aria-label="Close demo">
          <CloseSvg />
        </button>
      </div>

      <div className="ai-support-banner">
        <InfoCircleSvg />
        <span>Live demo powered by real AI</span>
      </div>

      <div className="ai-support-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`ai-support-message ${msg.role}`}>
            {msg.role === "assistant" && <SupportAvatarSmallSvg />}
            <div className="ai-support-message-content">
              {msg.role === "assistant"
                ? <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                : <p>{msg.content}</p>
              }
              <span className="ai-support-message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="ai-support-message assistant">
            <SupportAvatarSmallSvg />
            <div className="ai-support-message-content">
              <div className="ai-support-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="ai-support-error">
            <SupportErrorSvg />
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!suggestionsClicked && !isTyping && (
        <div className="ai-support-suggestions">
          <span className="ai-support-suggestions-label">Try asking:</span>
          <div className="ai-support-suggestions-list">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} className="ai-support-suggestion" onClick={() => handleSuggestion(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="ai-support-input-area" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
          className="ai-support-input"
        />
        <button
          type="submit"
          className="btn primary ai-support-send"
          disabled={!input.trim() || isTyping}
        >
          <SendButtonSvg />
        </button>
      </form>

      <div className="ai-support-footer">
        <div className="ai-support-footer-stats">
          <div className="ai-support-stat">
            <span className="ai-support-stat-value">70%</span>
            <span className="ai-support-stat-label">Auto-resolved</span>
          </div>
          <div className="ai-support-stat">
            <span className="ai-support-stat-value">&lt;5s</span>
            <span className="ai-support-stat-label">Avg response</span>
          </div>
          <div className="ai-support-stat">
            <span className="ai-support-stat-value">24/7</span>
            <span className="ai-support-stat-label">Availability</span>
          </div>
        </div>
        <p className="ai-support-footer-note">Powered by AI trained on your docs & past tickets</p>
      </div>
    </div>
  );
};

export default ProjectsAISupportDemo;
