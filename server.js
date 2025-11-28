import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    try {
        const response = await fetch("https://api.groq.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        res.json({ answer: data.choices?.[0]?.message?.content || "No response from AI" });

    } catch (err) {
        res.status(500).json({ error: "Error connecting to AI API" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
