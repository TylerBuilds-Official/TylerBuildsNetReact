import React from "react";


const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onToggle: () => void }> = ({
                                                                                                            question,
                                                                                                            answer,
                                                                                                            isOpen,
                                                                                                            onToggle,
                                                                                                        }) => {
    return (
        <div className={`faq-item ${isOpen ? "open" : ""}`}>
            <button className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
                <span>{question}</span>
                <svg
                    className="faq-chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div className="faq-content">
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FAQItem;