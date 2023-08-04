let currMedia = "YouTube";

// forms
const metaForm = document.querySelector(".meta-form");
const imageForm = document.querySelector(".image-form");

// output elements
const description = document.querySelector(".description p");
const tags = document.querySelector(".tags p");
const thumbnail = document.querySelector(".thumbnail img");

const element1 = document.getElementById("YouTube");
element1.addEventListener("click", function () {
	document.getElementById("title").innerHTML = "YouTube Video Data Generator";
	document.getElementById("form").style.background = "#cc0000";
	document.getElementById("form2").style.background = "#cc0000";
	currMedia = "YouTube";
});

const element2 = document.getElementById("TikTok");
element2.addEventListener("click", function () {
	document.getElementById("title").innerHTML = "TikTok Video Data Generator";
	document.getElementById("form").style.background = "#222";
	document.getElementById("form2").style.background = "#222";
	currMedia = "TikTok";
});

const element3 = document.getElementById("instagram");
element3.addEventListener("click", function () {
	document.getElementById("title").innerHTML =
		"instagram Video Data Generator";
	document.getElementById("form").style.background = "#8a3ab9";
	document.getElementById("form2").style.background = "#8a3ab9";
	currMedia = "instagram";
});

// description and tags
metaForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const res = await fetch("/openai/meta", {
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title: metaForm.title.value }),
		method: "POST",
	});
	const data = await res.json();

	console.log(data);

	description.textContent = data.description.content;
	tags.textContent = data.tags.content;
});

// image/thumbnail
imageForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const res = await fetch("/openai/image", {
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prompt: imageForm.prompt.value }),
		method: "POST",
	});
	const data = await res.json();

	thumbnail.setAttribute("src", data.url);
});
