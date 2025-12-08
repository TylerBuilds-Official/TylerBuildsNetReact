import React, { useState } from "react";

type HeroVisualInteractiveProps = {
    logoUrl: string;
    altText?: string;
    animate?: boolean;
    className?: string;
};

const HeroVisualInteractive: React.FC<HeroVisualInteractiveProps> = ({
    logoUrl,
    altText="",
    animate=false,
    className="",
}) => {
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        if (isShaking) return; // Prevent re-triggering mid-animation
        setIsShaking(true);
        // Remove class after animation completes
        setTimeout(() => setIsShaking(false), 500);
    };

    return (
        <div className={`hero-visual ${className}`} aria-hidden="true">
            <div 
                className={`logo-frame ${animate ? "float" : ""} ${isShaking ? "shake" : ""}`}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            >
                <img src={logoUrl} alt={altText}/>
            </div>
        </div>
    );
};

export default HeroVisualInteractive;
