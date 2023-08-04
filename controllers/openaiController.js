const openai = require("../config/openaiConfig");

const generateMeta = async (title) => {
	const description = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `Come up with a description for a YouTube video called ${title}`,
			},
		],
		max_tokens: 100,
	});

	const tags = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `Come up with 10 keywords for a YouTube video called ${title}`,
			},
		],
		max_tokens: 100,
	});

	console.log(description.data.choices[0].message);
	console.log(tags.data.choices[0].message);
};

const generateImage = async (desc) => {
	const image = await openai.createImage({
		prompt: desc,
		n: 1,
		size: "512x512",
	});

	image_url = image.data.data[0].url;
	console.log(image_url);
};

module.exports = { generateMeta, generateImage };
