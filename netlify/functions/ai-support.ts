import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing request body" }),
            };
        }

        const body = JSON.parse(event.body);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.error("AI Support Function Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" }),
        };
    }
};
