import React from "react";
import ChevronDownSvg from "../assets/svg/common/ChevronDownSvg";

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
                <ChevronDownSvg className="faq-chevron" />
            </button>
            <div className="faq-content">
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FAQItem;
