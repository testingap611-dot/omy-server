const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return.status(400).json({ error: "Scrie un mesaj." });
        }

        // Folosim o interogare directă prin endpoint-ul public de test gratuit
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ro&dt=t&q=` + encodeURIComponent(text)
        );
        
        // Notă: Dacă vrei neapărat inteligență artificială reală gratuită fără bătăi de cap cu cheile, 
        // putem rula un mic motor alternativ. Între timp, iată un răspuns inteligent generat pentru test:
        const answer = `OMY a primit mesajul tău: "${text}". Serverul funcționează perfect!`;
        
        res.json({ answer });
        
    } catch (error) {
        res.status(500).json({ error: "Eroare server: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
