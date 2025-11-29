// ضع رابط Render الخاص بسيرفرك هنا
const SERVER_URL = "https://ai-server-ny57.onrender.com";

async function sendToAI() {
    const inputField = document.getElementById("userInput");
    const responseBox = document.getElementById("responseBox");
    const userText = inputField.value.trim();
    if (!userText) { 
        responseBox.innerText = "Please enter a message."; 
        return; 
    }
    responseBox.innerText = "Thinking...";

    try {
        const response = await fetch(`${SERVER_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userText })
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        const data = await response.json();
        responseBox.innerText = data.reply || "No response from AI";

    } catch (err) {
        responseBox.innerText = "Error connecting to server: " + err.message;
        console.error(err);
    } finally { 
        inputField.value = ""; 
    }
}

// أحداث إرسال الرسالة عند الضغط على زر أو Enter
document.getElementById("sendBtn").addEventListener("click", sendToAI);
document.getElementById("userInput").addEventListener("keypress", e => { 
    if (e.key === "Enter" && !e.shiftKey) { 
        e.preventDefault();
        sendToAI(); 
    }
});
