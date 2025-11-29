import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your real Groq API key
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Serve frontend files
app.use(express.static("public"));

// Chat endpoint
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices?.[0]?.message?.content || "No response" });

    } catch (err) {
        res.status(500).json({ reply: "Server error: " + err.message });
    }
});

// Render will set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
