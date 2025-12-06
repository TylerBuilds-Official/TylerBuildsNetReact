import React from "react";
import { useEffect } from "react";

type CalendlyProps = {
    url: string;
    height?: string | number;
};

const CalendarEmbed: React.FC<CalendlyProps> = ({ url, height = 700 }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url={url}
            style={{ minWidth: "320px", height }}
        />
    );
};

export default CalendarEmbed;
