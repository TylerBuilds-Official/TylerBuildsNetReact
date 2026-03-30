import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import SupportAvatarSmallSvg from '../../assets/svg/DemoAI/SupportAvatarSmallSvg';
import { formatMarkdown } from './formatMarkdown';

const WELCOME_MESSAGE = "Hey there! I'm the TylerBuilds assistant. Ask me anything about our services, past work, or how we can help your business.";

const STATUS_MESSAGES = [
    'Checking availability...',
    'Setting things up...',
    'Putting it all together...',
    'Almost there...',
];

const TypingIndicator: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);
    const [statusIdx, setStatusIdx] = useState(0);

    useEffect(() => {
        let cycleTimer: ReturnType<typeof setInterval>;

        // Only show status after 7s (long operations like booking)
        const showTimer = setTimeout(() => {
            setStatus(STATUS_MESSAGES[0]);

            cycleTimer = setInterval(() => {
                setStatusIdx(prev => {
                    const next = Math.min(prev + 1, STATUS_MESSAGES.length - 1);
                    setStatus(STATUS_MESSAGES[next]);

                    return next;
                });
            }, 4000);
        }, 7000);

        return () => {
            clearTimeout(showTimer);
            if (cycleTimer) clearInterval(cycleTimer);
        };
    }, []);

    return (
        <>
            <div className="chat-widget__message assistant">
                <SupportAvatarSmallSvg />
                <div className="chat-widget__bubble">
                    <div className="chat-widget__typing">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
            {status && (
                <div className="chat-widget__status-bar" key={status}>
                    <div className="chat-widget__status-shimmer" />
                    <span>{status}</span>
                </div>
            )}
        </>
    );
};

const ChatMessages: React.FC = () => {
    const { messages, isLoading, error } = useChat();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="chat-widget__messages">
            {/* Welcome message (always shown) */}
            <div className="chat-widget__message assistant">
                <SupportAvatarSmallSvg />
                <div className="chat-widget__bubble">
                    <p>{WELCOME_MESSAGE}</p>
                </div>
            </div>

            {messages.map(msg => (
                <div key={msg.id} className={`chat-widget__message ${msg.role}`}>
                    {msg.role === 'assistant' && <SupportAvatarSmallSvg />}
                    <div className="chat-widget__bubble">
                        {msg.role === 'assistant'
                            ? <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                            : <p>{msg.content}</p>
                        }
                        <span className="chat-widget__time">{msg.timestamp}</span>
                    </div>
                </div>
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
                <div className="chat-widget__error">{error}</div>
            )}

            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessages;
