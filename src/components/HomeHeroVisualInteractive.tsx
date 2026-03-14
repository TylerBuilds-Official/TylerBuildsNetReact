import React, { useState, useCallback } from "react";

type HeroVisualInteractiveProps = {
    logoUrl: string;
    altText?: string;
    animate?: boolean;
    className?: string;
};

type FallingLogo = {
    id: number;
    x: number;
    rotation: number;
    delay: number;
    duration: number;
    size: number;
};

const HeroVisualInteractive: React.FC<HeroVisualInteractiveProps> = ({
    logoUrl,
    altText="",
    animate=false,
    className="",
}) => {
    const [isShaking, setIsShaking] = useState(false);
    const [fallingLogos, setFallingLogos] = useState<FallingLogo[]>([]);

    const spawnFallingLogos = useCallback(() => {
        const newLogos: FallingLogo[] = [];
        const count = Math.floor(Math.random() * 2) + 2; // 2-3 logos

        for (let i = 0; i < count; i++) {
            newLogos.push({
                id:         Date.now() + i,
                x:          Math.random() * 80 + 20,        // 20-80% from left
                rotation:   Math.random() * 720 - 360,      // -360 to 360 degrees
                delay:      i * 100,                        // Stagger the drops
                duration:   Math.random() * 1000 + 2000,    // 2-3 seconds
                size:       Math.random() * 30 + 40,        // 40-70px
            });
        }

        setFallingLogos((prev) => [...prev, ...newLogos]);

        setTimeout(() => {
            setFallingLogos((prev) => prev.filter((logo) => !newLogos.find((nl) => nl.id === logo.id)));
        }, 4000);
    }, []);

    const handleClick = () => {
        if (isShaking) return;
        setIsShaking(true);
        spawnFallingLogos();
        setTimeout(() => setIsShaking(false), 500);
    };

    return (
        <>
            <div className={`hero-visual ${className}`} aria-hidden="true">
                <div 
                    className={`logo-frame ${animate ? "float" : ""} ${isShaking ? "shake" : ""}`}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                >
                    <img src={logoUrl} alt={altText}/>
                </div>
            </div>

            <div className="falling-logos-container" aria-hidden="true">
                {fallingLogos.map((logo) => (
                    <img
                        key={logo.id}
                        src={logoUrl}
                        alt=""
                        className="falling-logo"
                        style={{
                            left: `${logo.x}%`,
                            width: `${logo.size}px`,
                            height: `${logo.size}px`,
                            animationDuration: `${logo.duration}ms`,
                            animationDelay: `${logo.delay}ms`,
                            // @ts-ignore - CSS custom property
                            '--rotation': `${logo.rotation}deg`,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default HeroVisualInteractive;
