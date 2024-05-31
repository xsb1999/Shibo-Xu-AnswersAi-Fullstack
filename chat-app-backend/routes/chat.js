const express = require('express');
const OpenAI = require("openai");

const OPENAI_APIKEY='my-openai-api-key';
const openai = new OpenAI({ apiKey: OPENAI_APIKEY });

const router = express.Router();

router.post('/getChatFromOpenAI', async (req, res) => {
    const { messages } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages
        });
        res.json({ completion });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
