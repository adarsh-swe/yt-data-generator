const express = require("express");
const {
	generateMeta,
	generateImage,
} = require("./controllers/openaiController");

// app setup
const app = express();
const PORT = process.env.PORT || 8000; //PORT will be defined in process.env on heroku when deployed
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// middleware
app.use(express.json());

app.use(express.static("client"));

// routes
app.post("/openai/meta", generateMeta);
app.post("/openai/image", generateImage);
