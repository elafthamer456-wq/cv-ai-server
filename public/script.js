async function sendToAI() {
    const inputField = document.getElementById("userInput");
    const responseBox = document.getElementById("responseBox");
    const userText = inputField.value.trim();
    if (!userText) { responseBox.innerText = "Please enter a message."; return; }
    responseBox.innerText = "Thinking...";
    try {
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userText })
        });
        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        const data = await response.json();
        responseBox.innerText = data.answer || "No response from the server";
    } catch (err) {
        responseBox.innerText = "Error connecting to server: " + err.message;
    } finally { inputField.value = ""; }
}

document.getElementById("sendBtn").addEventListener("click", sendToAI);
document.getElementById("userInput").addEventListener("keypress", e => { if (e.key === "Enter") sendToAI(); });
