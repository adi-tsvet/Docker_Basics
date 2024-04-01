const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    return res.json ({
        message : "Hey! This is the basic Node App inside a Container"
    });
});

app.listen (PORT, () => console.log (`Server started on the PORT : ${PORT}`))