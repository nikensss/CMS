function getEspecialitats() {


	console.log("Getting especialitats");
	const collapseEspecialitats = document.getElementById("collapseEspecialitats");
	const bodyEspecialitats = document.getElementById("bodyEspecialitats");
	const isLoaded = $("#bodyEspecialitats").data('is-loaded');
	console.log(`Is loaded? ${isLoaded}`);

	if (!collapseEspecialitats.classList.contains("show") && !isLoaded) {
		console.log("Querying data...");
		$("#bodyEspecialitats").html("Carregant");
		getResponseJSON("#bodyEspecialitats");
	}

}

async function getResponseJSON(htmlElement) {
	var interval = setInterval(loadingData.bind(null, $(htmlElement)), 125);
	const response = await $.getJSON(wordnikApiRequest())
		.complete(function (data) {
			console.log("Complete!");
			clearInterval(interval);
			addFormattedData(htmlElement, data.responseJSON);
			$(htmlElement).data('is-loaded', true);
		});
}

function loadingData(htmlElement) {
	var htmlString = $(htmlElement).html();
	var dots = htmlString.replace("Carregant", "");
	if (dots.length >= 3) {
		htmlString = "Carregant";
	} else {
		htmlString += ".";
	}
	$(htmlElement).html(htmlString);
}

function addFormattedData(targetElement, data) {
	var s = "";
	for (let i = 0; i < data.length; i++) {
		for (let j in data[i]) {
			s += `<h5 class="specialty-name">${j}</h5>`;
			if (Array.isArray(data[i][j])) {
				s += "<ul>";
				for (let k = 0; k < data[i][j].length; k++) {
					s += `<li class="specialty-doctor">${data[i][j][k]}</li>`;
				}
				s += "</ul>";
			} else {
				s += `<p class="specialty-doctor">${data[i][j]}</p>`;
			}
		}
		s += "<hr>";
	}
	$(targetElement).html(s);
}

function wordnikApiRequest() {
	var url = "https://api.wordnik.com/v4/word.json/"
	var mode = "relatedWords";
	var apiKey = "c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e";
	var data = "useCanonical=false&limitPerRelationshipType=10&api_key=" + apiKey;

	return `${url}happy/${mode}?${data}`;
}