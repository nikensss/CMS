// function getEspecialitats() {
// 	console.log("Getting especialitats");
// 	const collapseEspecialitats = document.getElementById("collapseEspecialitats");
// 	const bodyEspecialitats = document.getElementById("bodyEspecialitats");
// 	const isLoaded = $("#bodyEspecialitats").data('is-loaded');
// 	console.log(`Is loaded? ${isLoaded}`);

// 	if (!collapseEspecialitats.classList.contains("show") && !isLoaded) {
// 		console.log("Querying data...");
// 		$("#bodyEspecialitats").html("Carregant");
// 		getResponseJSON("#bodyEspecialitats");
// 	}
// }

async function getResponseJSON(htmlElement) {
	var interval = setInterval(loadingData.bind(null, $(htmlElement)), 125);
	const response = await $.getJSON(apiRequest())
		.complete(function (data) {
			console.log("Complete!");
			clearInterval(interval);
			addFormattedData(htmlElement, data.responseJSON);
			// $(htmlElement).data('is-loaded', true);
		})
		.error(function (e) {
			console.error(e);
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
				s += arrayAsUnorderedList(data[i][j]);
			} else {
				s += `<p class="specialty-doctor">${data[i][j]}</p>`;
			}
		}
		s += "<hr>";
	}
	$(targetElement).html(s);
}

function arrayAsUnorderedList(array) {
	let s = "";
	s += "<ul>";
	for (let k = 0; k < array.length; k++) {
		s += `<li class="specialty-doctor">${array[k]}</li>`;
	}
	s += "</ul>";

	return s;
}

function apiRequest() {
	var url = "https://api.wordnik.com/v4/word.json/"
	var mode = "relatedWords";
	var apiKey = "c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e";
	var data = "useCanonical=false&limitPerRelationshipType=10&api_key=" + apiKey;

	return `${url}happy/${mode}?${data}`;
}

function requestEspecialitats() {
	const collapseEspecialitats = document.getElementById("collapseEspecialitats");
	const bodyEspecialitats = document.getElementById("bodyEspecialitats");

	if (!collapseEspecialitats.classList.contains("show")) {
		console.log("Mostrant especialitats!");
		removeChildren(bodyEspecialitats);
		const i = document.createElement("iframe");
		i.setAttribute('id', 'response');
		i.setAttribute('name', 'response');
		i.setAttribute('style', 'display:block;');
		i.setAttribute('src', 'https://centremedicsabadell.com');
		bodyEspecialitats.appendChild(i);
	}
}

function removeChildren(htmlElement) {
	while (htmlElement.firstChild) {
		htmlElement.removeChild(htmlElement.firstChild);
	}
}

function submitOnDummyForm(r, urn) {
	const {
		f,
		i
	} = createDummyForm();
	f.xmlInput.value = r;
	f.actionInput.value = urn;
	document.body.appendChild(f);
	document.getElementById("bodyEspecialitats").appendChild(i);

	f.submit();
	i.setAttribute("style", "display: block;");
}

function createDummyForm() {
	const i = document.createElement("iframe");
	i.setAttribute('id', 'response');
	i.setAttribute('name', 'response');
	i.setAttribute('style', 'display:none;');

	const f = document.createElement("form");
	// f.setAttribute('action', "http://192.168.1.131/WEBSERVICE_21_WEB/awws/Webservice_21.awws");
	f.setAttribute('action', "http://www.centremedicsabadell.net/WEBSERVICE_20_WEB/awws/Webservice_20.awws");
	f.setAttribute('method', "post");
	f.setAttribute('name', "xmlform");
	f.setAttribute('id', "xmlform");
	f.setAttribute('target', "response");

	var xmlInput = document.createElement("input"); //input element, text
	xmlInput.setAttribute('type', "hidden");
	xmlInput.setAttribute('name', "xml");
	xmlInput.setAttribute('id', "xml");

	var actionInput = document.createElement("input"); //input element, text
	actionInput.setAttribute('type', "hidden");
	actionInput.setAttribute('name', "action");
	actionInput.setAttribute('id', "action");

	f.appendChild(xmlInput);
	f.appendChild(actionInput);

	f.xmlInput = xmlInput;
	f.actionInput = actionInput;

	return {
		f: f,
		i: i
	};
}