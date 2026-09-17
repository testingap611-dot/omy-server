const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AQ.Ab8RN6Lge8mWKBYRouDhgjgGdYnG5AvDoRLAjY6sGcoIqCJEDw";
const MODEL = "gemini-2.5-flash";

app.post('/api/chat', async (req, res) => {
    try {
        const { text } = req.body;
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({ model: MODEL, input: text || "Salut!" })
            }
        );
        const data = await response.json();
        const answer = data?.output?.[0]?.text || "Nu am primit un răspuns.";
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
