const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AQ.Ab8RN6Lge8mWKBYRouDhgjgGdYnG5AvDoRLAjY6sGcoIqCJEDw";
const MODEL = "gemini-2.5-flash"; // Sau poți folosi gemini-1.5-flash

app.post('/api/chat', async (req, res) => {
    try {
        const { text } = req.body;
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: text || "Salut!" }]
                    }]
                })
            }
        );

        const data = await response.json();
        
        // Extragem răspunsul corect din structura Gemini
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Nu am primit un răspuns valid de la Gemini.";
        res.json({ answer });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
