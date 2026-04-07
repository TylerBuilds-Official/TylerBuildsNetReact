import React, { useEffect, useState, type JSX } from 'react';
import { useChat } from '../../context/ChatContext';
import CloseSvg from '../../assets/svg/common/CloseSvg';

const DISMISS_KEY        = 'tb-chat-reminder-dismissed';
const ENTRY_DELAY_MS     = 1500;
const AUTO_HIDE_MS       = 6000;
const EXIT_ANIMATION_MS  = 250;

type Phase = 'pending' | 'visible' | 'exiting' | 'gone';

const Phrases: Array<string> = [
    'Need help? Ask TylerBuilds!',
    'Have a question? Ask TylerBuilds!',
    'Have a project in mind? Ask TylerBuilds!',
    'Need advice? Ask TylerBuilds!',
    'Excited about something? Ask TylerBuilds!',
    'Exciting project idea? Ask TylerBuilds!',
    'I can help! Ask TylerBuilds!',
    'Want to connect with Tyler? Ask TylerBuilds!',
]

const STYLE_TUNING_MODE = false;

const ChatReminder = (): JSX.Element | null => {
    const [phase, setPhase] = useState<Phase>(() => {
        if (STYLE_TUNING_MODE) return 'visible';
        return sessionStorage.getItem(DISMISS_KEY) ? 'gone' : 'pending';
    });
    const [phrase] = useState<string>(
        () => Phrases[Math.floor(Math.random() * Phrases.length)]
    );
    const { open } = useChat();

    // pending -> visible (after entry delay), and mark as seen so it never re-shows this session
    useEffect(() => {
        if (STYLE_TUNING_MODE) return;
        if (phase !== 'pending') return;

        const enterTimer = setTimeout(() => {
            setPhase('visible');
            sessionStorage.setItem(DISMISS_KEY, '1');
        }, ENTRY_DELAY_MS);

        return () => clearTimeout(enterTimer);
    }, [phase]);

    // visible -> exiting (auto-hide)
    useEffect(() => {
        if (STYLE_TUNING_MODE) return;
        if (phase !== 'visible') return;

        const hideTimer = setTimeout(() => setPhase('exiting'), AUTO_HIDE_MS);

        return () => clearTimeout(hideTimer);
    }, [phase]);

    // exiting -> gone (after fade-out animation completes)
    useEffect(() => {
        if (phase !== 'exiting') return;

        const removeTimer = setTimeout(() => setPhase('gone'), EXIT_ANIMATION_MS);

        return () => clearTimeout(removeTimer);
    }, [phase]);

    if (phase === 'gone') return null;

    const handleOpen = () => {
        setPhase('exiting');
        open();
    };

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPhase('exiting');
    };

    return (
        <div className={`chat-widget__reminder-label ${phase}`}>
            <button
                type="button"
                className="chat-widget__reminder-text"
                onClick={handleOpen}
                aria-label="Open AI chat: Need help? Ask TylerBuilds!"
            >
              {phrase}
            </button>
            <button
                type="button"
                className="chat-widget__reminder-dismiss"
                onClick={handleDismiss}
                aria-label="Dismiss reminder"
            >
                <CloseSvg size={10} />
            </button>
        </div>
    );
};

export default ChatReminder;