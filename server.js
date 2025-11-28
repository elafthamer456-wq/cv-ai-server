import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// عرض ملفات HTML و JS و CSS من مجلد public
app.use(express.static("public"));

// استخدام API Key من Environment Variable
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// استخدام PORT من Environment Variable أو 3000 كافتراضي
const PORT = process.env.PORT || 3000;

app.post("/ai", async (req, res) => {
    const { prompt } = req.body;
    try {
        console.log("Received prompt:", prompt);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        console.log("API response:", data);

        if (data.choices && data.choices.length > 0) {
            res.json({ answer: data.choices[0].message.content });
        } else if (data.error) {
            res.json({ answer: "API Error: " + data.error.message });
        } else {
            res.json({ answer: "No answer from API" });
        }

    } catch (err) {
        console.error("Error calling Groq API:", err);
        res.status(500).json({ answer: "Server error: " + err.message });
    }
});

app.listen(PORT, () => console.log(`Groq AI Server running on port ${PORT}`));
