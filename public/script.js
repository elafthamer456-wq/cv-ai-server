const API_URL = "https://cv-ai-server-ny57.onrender.com/api/chat";

function addMessage(text, sender) {
    const msgBox = document.getElementById("messages");
    const div = document.createElement("div");
    div.classList.add("msg", sender);
    div.innerText = text;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("input");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // typing indicator
    addMessage("AI is typing...", "ai");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    // remove typing indicator
    const msgs = document.querySelectorAll(".ai");
    msgs[msgs.length - 1].remove();

    addMessage(data.reply, "ai");
}

document.getElementById("sendBtn").onclick = sendMessage;

document.getElementById("input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});