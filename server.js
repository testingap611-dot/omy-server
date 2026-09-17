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
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: text || "Salut!" }]
                    }]
                })
            }
        );

        const data = await response.json();
        
        // Verificăm dacă structura conține răspunsul valid
        if (data && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            const answer = data.candidates[0].content.parts[0].text;
            res.json({ answer });
        } else if (data && data.error) {
            res.status(500).json({ error: data.error.message || "Eroare de la Google API" });
        } else {
            res.status(500).json({ error: "Răsim invalid primit de la model." });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
