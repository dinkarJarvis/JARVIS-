// =========================================
// JARVIS Voice System
// =========================================

let jarvisVoice = null;

function loadVoices() {

    const voices = speechSynthesis.getVoices();

    jarvisVoice =
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en")) ||
        voices[0];

}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speak(text) {

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = jarvisVoice;
    utterance.lang = "en-US";

    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);

}

window.addEventListener("load", () => {

    setTimeout(() => {

        speak("Hello Dinkar. JARVIS is online.");

    }, 1000);

});
