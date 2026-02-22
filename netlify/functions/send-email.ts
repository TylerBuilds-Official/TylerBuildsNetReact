import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, _context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { subject, body } = JSON.parse(event.body || "{}");

        const endpoint = process.env.ENDPOINT;
        const recipient = process.env.RECIPIENT;

        if (!endpoint || !recipient) {
            throw new Error("Missing configuration");
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject,
                body,
                recipient,
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

