import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const API_KEY = process.env.GROQ_API_KEY;

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // موديل شغال 100%
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("AI API response:", data);

    const answer = data.choices?.[0]?.message?.content || "No response from AI";
    res.json({ reply: answer });

  } catch (err) {
    console.error("Error connecting to AI API:", err);
    res.status(500).json({ error: "Failed to connect to AI API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
