import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import SupportAvatarSmallSvg from '../../assets/svg/DemoAI/SupportAvatarSmallSvg';
import { formatMarkdown } from './formatMarkdown';

const WELCOME_MESSAGE = "Hey there! I'm the TylerBuilds assistant. Ask me anything about our services, past work, or how we can help your business.";

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

            {isLoading && (
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
            )}

            {error && (
                <div className="chat-widget__error">{error}</div>
            )}

            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessages;
