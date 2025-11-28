// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// مهم: المفتاح مخفي داخل Render Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content || "Error";

        res.json({ reply });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => console.log("Server running on port", PORT));
