import React from 'react';
import { useChat } from '../../context/ChatContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatBubbleSvg from '../../assets/svg/common/ChatBubbleSvg';
import SupportAvatarSvg from '../../assets/svg/DemoAI/SupportAvatarSvg';
import CloseSvg from '../../assets/svg/common/CloseSvg';
import ChatReminder from "./ChatReminderLabel.tsx";

const SUGGESTED_QUESTIONS = [
    'What services does TylerBuilds offer?',
    'Tell me about past projects',
    'How do I get started?',
];

const ChatWidget: React.FC = () => {
    const { isOpen, toggle, close, messages, sendMessage, clearChat } = useChat();
    const hasMessages = messages.length > 0;

    return (
        <>
            {/* Floating trigger button */}
            {!isOpen && (
                <div className="chat-widget">
                    <ChatReminder />
                    <div className="chat-widget__trigger_button">
                        <button
                            className="chat-widget__trigger"
                            onClick={toggle}
                            aria-label="Open chat"
                        >
                            <ChatBubbleSvg size={26} />
                        </button>
                    </div>

                </div>

            )}

            {/* Chat panel */}
            {isOpen && (
                <div className="chat-widget__panel">
                    <div className="chat-widget__header">
                        <div className="chat-widget__header-info">
                            <div className="chat-widget__avatar">
                                <SupportAvatarSvg />
                            </div>
                            <div>
                                <h3>TylerBuilds</h3>
                                <span className="chat-widget__status">
                                    <span className="chat-widget__status-dot" />
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className="chat-widget__header-actions">
                            {hasMessages && (
                                <button
                                    className="btn chat-widget__new-chat"
                                    onClick={clearChat}
                                    aria-label="New conversation"
                                    title="New conversation"
                                >
                                    New Chat
                                </button>
                            )}
                            <button
                                className="btn chat-widget__close"
                                onClick={close}
                                aria-label="Close chat"
                            >
                                <CloseSvg size={18} />
                            </button>
                        </div>
                    </div>

                    <ChatMessages />

                    {!hasMessages && (
                        <div className="chat-widget__suggestions">
                            {SUGGESTED_QUESTIONS.map(q => (
                                <button
                                    key={q}
                                    className="chat-widget__suggestion"
                                    onClick={() => sendMessage(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    <ChatInput />
                </div>
            )}
        </>
    );
};

export default ChatWidget;
