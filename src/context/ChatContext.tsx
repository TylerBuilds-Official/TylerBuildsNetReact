import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
};

type ChatContextValue = {
    messages: Message[];
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;
    sessionId: string | null;
    open: () => void;
    close: () => void;
    toggle: () => void;
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export const useChat = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChat must be used within ChatProvider');
    return ctx;
};

const SESSION_KEY  = 'tb-chat-session';
const MESSAGES_KEY = 'tb-chat-messages';

const API_BASE = import.meta.env.PROD
    ? 'https://api.tylerbuilds.net'
    : 'http://localhost:8000';

function getTimestamp(): string {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function uid(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadStoredMessages(): Message[] {
    try {
        const raw = localStorage.getItem(MESSAGES_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export const ChatProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [messages, setMessages]   = useState<Message[]>(loadStoredMessages);
    const [isOpen, setIsOpen]       = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState<string | null>(null);
    const sessionRef                = useRef<string | null>(localStorage.getItem(SESSION_KEY));

    const open   = useCallback(() => setIsOpen(true), []);
    const close  = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    // Persist messages to localStorage on every change
    useEffect(() => {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }, [messages]);

    const clearChat = useCallback(() => {
        setMessages([]);
        sessionRef.current = null;
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(MESSAGES_KEY);
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        const trimmed = content.trim();
        if (!trimmed || isLoading) return;

        const userMsg: Message = {
            id: uid(),
            role: 'user',
            content: trimmed,
            timestamp: getTimestamp(),
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE}/api/ai/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    session_id: sessionRef.current,
                }),
            });

            if (!response.ok) throw new Error(`Server responded with ${response.status}`);

            const data = await response.json();

            sessionRef.current = data.session_id;
            localStorage.setItem(SESSION_KEY, data.session_id);

            const assistantMsg: Message = {
                id: uid(),
                role: 'assistant',
                content: data.message,
                timestamp: getTimestamp(),
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (err) {
            console.error('Chat error:', err);
            setError('Unable to connect. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <ChatContext.Provider value={{
            messages, isOpen, isLoading, error,
            sessionId: sessionRef.current,
            open, close, toggle, sendMessage, clearChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
