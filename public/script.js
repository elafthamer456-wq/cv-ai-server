async function sendToAI() {
    const text = document.getElementById("userInput").value;
    const responseBox = document.getElementById("responseBox");
    responseBox.innerText = "جاري التفكير...";

    try {
        const response = await fetch("https://ai-server-ny57.onrender.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text })
        });

        const data = await response.json();
        responseBox.innerText = data.answer || "لم يتم تلقي رد من السيرفر";

    } catch (err) {
        responseBox.innerText = "حدث خطأ أثناء الاتصال بالسيرفر: " + err.message;
        console.error(err);
    }
}
