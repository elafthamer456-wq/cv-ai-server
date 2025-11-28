async function sendToAI() {
    const text = document.getElementById("userInput").value;
    const responseBox = document.getElementById("responseBox");
    responseBox.innerText = "جاري التفكير...";
    try {
        const response = await fetch("/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text })
        });
        const data = await response.json();
        responseBox.innerText = data.answer;
    } catch (err) {
        responseBox.innerText = "حدث خطأ، حاول مرة أخرى.";
        console.error(err);
    }
}
