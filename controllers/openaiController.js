const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
	const { title } = req.body;
	try {
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

		console.log(description.data.choices[0].message);

		const tags = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `come up with 10 keywords for a YouTube video called ${title}`,
				},
			],
			max_tokens: 100,
		});

		res.status(200).json({
			description: description.data.choices[0].message,
			tags: tags.data.choices[0].message,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		res.json({
			msg: error.response.data.error.message,
		});
	}
};

const generateImage = async (req, res) => {
	const img_prompt = req.body.prompt;
	try {
		const image = await openai.createImage({
			prompt: img_prompt,
			n: 1,
			size: "512x512",
		});

		res.json({
			url: image.data.data[0].url,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		res.json({
			msg: error.response.data.error.message,
		});
	}
};

module.exports = { generateMeta, generateImage };
