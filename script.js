// =========================================
// JARVIS Main Controller
// =========================================

const micButton = document.getElementById("micButton");
const statusText = document.getElementById("status");
const responseBox = document.getElementById("response");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    statusText.textContent = "Speech Recognition is not supported.";

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", () => {

        statusText.textContent = "Listening...";
        recognition.start();

    });

    recognition.onresult = async (event) => {

        const command = event.results[0][0].transcript.trim().toLowerCase();

        responseBox.textContent = "You: " + command;

        if (command.includes("time")) {

            const time = new Date().toLocaleTimeString();

            responseBox.textContent = time;

            speak("The time is " + time);

            statusText.textContent = "Ready";
            return;
        }

        if (command.includes("date")) {

            const date = new Date().toDateString();

            responseBox.textContent = date;

            speak("Today is " + date);

            statusText.textContent = "Ready";
            return;
        }

        if (command.includes("open google")) {

            window.open("https://www.google.com", "_blank");

            speak("Opening Google");

            statusText.textContent = "Ready";
            return;
        }

        await askGemini(command);

    };

    recognition.onerror = () => {

        statusText.textContent = "Microphone Error";

    };

    recognition.onend = () => {

        if (statusText.textContent !== "Thinking...") {
            statusText.textContent = "Ready";
        }

    };

}
