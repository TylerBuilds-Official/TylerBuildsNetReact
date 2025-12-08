import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

const SYSTEM_PROMPT = `You are a friendly, helpful AI customer support assistant for "TylerBuilds LLC", a software company that sells workflow automation tools, dashboards, and other software solutions..

Your personality:
- Warm and professional, but not robotic
- Concise - keep responses under 3 sentences when possible
- Proactive - offer next steps or related help

Company info you know:
- Projects: Be creative but keep it realistic.
- Support hours: 24/7 chat, phone 9am-6pm EST
- Pricing: We offer a variety of plans, including: Project flat rate, and developer hourly.
- We builds all types of software. If it will improve or benefit your business, we'll build it. Improving your workflow is our goal.'
- Refund policy: With custom software such as this, there's no guarantee of a refund. We do have a satisfaction guarantee for all plans. We will work tirelessly to resolve your issue and ensure that we meet the customers needs.'
- Integration: Works with Slack, Salesforce, QuickBooks, Zapier, and 50+ other tools
- Implementation: Onboarding, training, and support documentation available

If asked something outside this scope, politely offer to connect them with a human agent.

Remember: This is a demo showcasing AI support capabilities. Be impressive but authentic.`;

const SUGGESTED_QUESTIONS = [
  "Can I get a refund if it doesn't work for us?",
  "What's the difference between your plans?",
  "Do you offer phone support?",
];

const ProjectsAISupportDemo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! 👋 I'm the TylerBuilds LLC support assistant. How can I help you today?",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_MESSAGES = 8;

  function getTimestamp() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping || messageCount >= MAX_MESSAGES) return;

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
    setMessageCount((prev) => prev + 1);

    try {
      const conversationHistory = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
          .filter((m) => m.role !== "system")
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: content.trim() },
      ];

        const response = await fetch("/.netlify/functions/ai-support", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: conversationHistory,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });


      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const assistantContent = data.choices[0]?.message?.content || "I apologize, I'm having trouble responding. Let me connect you with a human agent.";

      // Simulate typing delay based on response length
      const typingDelay = Math.min(1500, assistantContent.length * 15);
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      const assistantMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: assistantContent,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError("Unable to connect to AI service. This demo requires an API key.");
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
    sendMessage(question);
  };

  const remainingMessages = MAX_MESSAGES - messageCount;

  return (
    <div className="ai-support-demo">
      {/* Header */}
      <div className="ai-support-header">
        <div className="ai-support-header-info">
          <div className="ai-support-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"></path>
              <rect x="2" y="8" width="20" height="12" rx="2"></rect>
              <path d="M6 12h.01"></path>
              <path d="M18 12h.01"></path>
              <path d="M9 16v.01"></path>
              <path d="M15 16v.01"></path>
            </svg>
          </div>
          <div>
            <h3>AI Support Assistant</h3>
            <span className="ai-support-status">
              <span className="ai-support-status-dot"></span>
              Online • Typically replies instantly
            </span>
          </div>
        </div>
        <button className="btn ai-support-close" onClick={onClose} aria-label="Close demo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="ai-support-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Live demo with real AI • {remainingMessages} message{remainingMessages !== 1 ? "s" : ""} remaining</span>
      </div>

      <div className="ai-support-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`ai-support-message ${msg.role}`}>
            {msg.role === "assistant" && (
              <div className="ai-support-message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8"></path>
                  <rect x="2" y="8" width="20" height="12" rx="2"></rect>
                  <path d="M6 12h.01"></path>
                  <path d="M18 12h.01"></path>
                </svg>
              </div>
            )}
            <div className="ai-support-message-content">
              <p>{msg.content}</p>
              <span className="ai-support-message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="ai-support-message assistant">
            <div className="ai-support-message-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"></path>
                <rect x="2" y="8" width="20" height="12" rx="2"></rect>
                <path d="M6 12h.01"></path>
                <path d="M18 12h.01"></path>
              </svg>
            </div>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messageCount < 2 && !isTyping && (
        <div className="ai-support-suggestions">
          <span className="ai-support-suggestions-label">Try asking:</span>
          <div className="ai-support-suggestions-list">
            {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
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
          placeholder={messageCount >= MAX_MESSAGES ? "Demo message limit reached" : "Type your message..."}
          disabled={isTyping || messageCount >= MAX_MESSAGES}
          className="ai-support-input"
        />
        <button
          type="submit"
          className="btn primary ai-support-send"
          disabled={!input.trim() || isTyping || messageCount >= MAX_MESSAGES}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
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
