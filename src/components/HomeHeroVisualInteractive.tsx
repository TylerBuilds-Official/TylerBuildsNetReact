import React from "react";


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
    return (
        <div className={`hero-visual ${className}`} aria-hidden="true">
            <div className={`logo-frame ${animate ? "float" : ""}`}>
                <img src={logoUrl} alt={altText}/>
            </div>
        </div>
    );
};

export default HeroVisualInteractive;

function PositionHero(current_position: number) {
    return


}