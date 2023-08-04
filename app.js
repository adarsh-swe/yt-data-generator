const readline = require("readline");
const {
	generateMeta,
	generateImage,
} = require("./controllers/openaiController");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// rl.question("youtube vid title: \n", generateMeta);
rl.question("describe your youtube thumbnail: \n", generateImage);
