


import React, {useEffect, useRef, useState} from "react";

const AnimatedMetric: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateValue();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasAnimated, value]);

    const animateValue = () => {
        const duration = 1200;
        const steps = 40;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * value));

            if (current >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, stepDuration);
    };

    return (
        <div className="hero-metric" ref={ref}>
            <div className="hero-metric-value">
                <span className="hero-metric-number">{displayValue}</span>
                <span className="hero-metric-suffix">{suffix}</span>
            </div>
            <span className="hero-metric-label">{label}</span>
        </div>
    );
};

export default AnimatedMetric;