const express = require('express');
const app = express();

const API_KEY = "148f3832eadb4c4049cadfd9";

app.get('/videos', async (req, res) => {
    const response = await fetch("https://api.seekstreaming.com/videos", {
        headers: {
            "Authorization": "Bearer " + API_KEY
        }
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log("Server running"));