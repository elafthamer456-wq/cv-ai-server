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
        const response = await fetch("https://ai-server-ny57.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userText })
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        const data = await response.json();
        responseBox.innerText = data.answer || "No response received from the server";

    } catch (err) {
        responseBox.innerText = "An error occurred while connecting to the server: " + err.message;
        console.error(err);
    } finally {
        inputField.value = ""; // Clear the input after sending
    }
}
