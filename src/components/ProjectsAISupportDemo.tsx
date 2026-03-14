import React, { useState, useRef, useEffect, useMemo } from "react";
import CloseSvg from "../assets/svg/common/CloseSvg";
import InfoCircleSvg from "../assets/svg/common/InfoCircleSvg";
import SupportAvatarSvg from "../assets/svg/DemoAI/SupportAvatarSvg";
import SupportAvatarSmallSvg from "../assets/svg/DemoAI/SupportAvatarSmallSvg";
import SupportErrorSvg from "../assets/svg/DemoAI/SupportErrorSvg";
import SendButtonSvg from "../assets/svg/DemoAI/SendButtonSvg";

type Message = {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

const SYSTEM_PROMPT = `You are a friendly, helpful AI customer support assistant for "TylerBuilds LLC", a software company that sells workflow automation tools, dashboards, and other software solutions..

Your personality:
- Warm and professional, but not robotic
- Concise - keep responses friendly and concise, avoid using MD formatting in messages. The only tag that is supported in this chat window is **bold**.
- Proactive - offer next steps or related help, your job is to help convert visitors into customers without being pushy, or salesy.

Company info you know:
- Projects: Be creative but keep it realistic. Tyler builds custom software for your business.
- Support hours: 24/7 chat, phone 9am-6pm EST
- Pricing: We offer a variety of plans, including: Project flat rate, and developer hourly, potential finance options can be discussed.
- We builds all types of software. If it will improve or benefit your business, we'll build it. Improving your workflow is our goal.'
- Refund policy: With custom software such as this, there's no guarantee of a refund. We do have a satisfaction guarantee for all plans. We will work tirelessly to resolve your issue and ensure that we meet the customers needs.'
- Integration: Works with Slack, Salesforce, QuickBooks, Zapier, and 50+ other tools. If there is an API to integrate with, we can work with you to make it happen.
- Implementation: Onboarding, training, and support documentation available for all tools at all levels. We will ensure you are comfortable with the integration process.

If asked something outside this scope, politely offer to connect them with a human agent. Refer them to tylere@tylerbuilds.net, and ensure the customer I will be with them within 24 hours, Mon-Sat.

Remember: This is a demo showcasing AI support capabilities. Be impressive but authentic.`;

const SUGGESTED_QUESTIONS = [
  "What are some ways that TylerBuilds can improve my business workflows?",
  "How long does a project typically take to complete?",
  "How do I get started with building a new tool for my business?",
];

// Persist message count across modal open/close within same page session
let sessionMessageCount = 0;

const ProjectsAISupportDemo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! 👋 I'm the TylerBuilds Support Agent. How can I help you today?",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(sessionMessageCount);
  const [error, setError] = useState<string | null>(null);
  const [suggestionsClicked, setSuggestionsClicked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_MESSAGES = 8;

  function getTimestamp() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  function formatMessage(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n(\d+\.\s)/g, "<br/>$1")
      .replace(/\n/g, "<br/>");
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
    setMessageCount((prev) => {
      sessionMessageCount = prev + 1;
      return prev + 1;
    });

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
      setSuggestionsClicked(true);
      sendMessage(question);
    }


    const remainingMessages = MAX_MESSAGES - messageCount;

  return (
    <div className="ai-support-demo">
      {/* Header */}
      <div className="ai-support-header">
        <div className="ai-support-header-info">

          <div className="ai-support-avatar">
            <SupportAvatarSvg/>
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
          <CloseSvg/>
        </button>
      </div>

      <div className="ai-support-banner">
        <InfoCircleSvg/>
        <span>Live demo with real AI • {remainingMessages} message{remainingMessages !== 1 ? "s" : ""} remaining</span>
      </div>

      <div className="ai-support-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`ai-support-message ${msg.role}`}>
            {msg.role === "assistant" && (<SupportAvatarSmallSvg/>)}
            <div className="ai-support-message-content">
              <p dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
              <span className="ai-support-message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="ai-support-message assistant">
            <SupportAvatarSmallSvg/>
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
              <SupportErrorSvg/>
              {error}
            </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!suggestionsClicked && messageCount < 2 && !isTyping && (
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
        <SendButtonSvg/>
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
