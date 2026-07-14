// =========================================
// JARVIS Gemini AI
// =========================================

async function askGemini(question) {

    try {

        statusText.textContent = "Thinking...";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
`You are JARVIS, an intelligent AI assistant.

Answer naturally, politely and briefly.

User: ${question}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        const data = await response.json();

        let reply = "Sorry, I couldn't get a response.";

        if (
            data.candidates &&
            data.candidates.length &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length
        ) {
            reply = data.candidates[0].content.parts[0].text;
        }

        responseBox.textContent = reply;

        speak(reply);

        statusText.textContent = "Ready";

    } catch (err) {

        console.error(err);

        responseBox.textContent =
            "Connection to Gemini failed.";

        speak("Sorry. I cannot connect to Gemini.");

        statusText.textContent = "Error";

    }

}
