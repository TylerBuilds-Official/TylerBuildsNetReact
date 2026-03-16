import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../../context/ChatContext';
import SendButtonSvg from '../../assets/svg/DemoAI/SendButtonSvg';

const ChatInput: React.FC = () => {
    const { sendMessage, isLoading } = useChat();
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!isLoading) textareaRef.current?.focus();
    }, [isLoading]);

    const resetHeight = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        const scrollH = el.scrollHeight;
        el.style.height = `${scrollH}px`;
        el.classList.toggle('is-scrollable', scrollH > 120);
    }, []);

    useEffect(() => {
        resetHeight();
    }, [value, resetHeight]);

    const submit = () => {
        if (!value.trim() || isLoading) return;
        sendMessage(value);
        setValue('');

        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.classList.remove('is-scrollable');
            }
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    return (
        <form className="chat-widget__input-area" onSubmit={handleSubmit}>
            <textarea
                ref={textareaRef}
                className="chat-widget__input"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
                rows={1}
            />
            <button
                type="submit"
                className="btn primary chat-widget__send"
                disabled={!value.trim() || isLoading}
            >
                <SendButtonSvg />
            </button>
        </form>
    );
};

export default ChatInput;
