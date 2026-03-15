import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, _context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { subject, body, reply_to } = JSON.parse(event.body || "{}");

        const endpoint  = process.env.ENDPOINT;
        const recipient = process.env.RECIPIENT;
        const apiKey    = process.env.TB_API_KEY;

        if (!endpoint || !recipient || !apiKey) {
            throw new Error("Missing configuration");
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
            },
            body: JSON.stringify({
                recipient,
                subject,
                body,
                source: "contact_form",
                reply_to: reply_to || null,
            }),
        });

        if (!response.ok) {
            throw new Error(`External service responded with ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send email" }),
        };
    }
};

