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
	const response = await $.getJSON(apiRequest())
		.complete(function (data) {
			console.log("Complete!");
			clearInterval(interval);
			addFormattedData(htmlElement, data.responseJSON);
			// $(htmlElement).data('is-loaded', true);
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

function webServiceCall() {
	// 1. Create a new XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// 2. Configure it: GET-request for the URL /article/.../load
	xhr.open('POST', "urn:Webservice_CMS");

	// 3. Send the request over the network
	var r = "<soap:Envelope " +
		"xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope/\" " +
		"xmlns:xsi=\"http://www.w3.org/1999/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">" +
		"<soap:Body>";
	r += '<m:Addition xmlns:m="urn:Webservice_CMS/Addition">';
	r += "<nNombre1 xsd:type=\"xsd:int\" xmlns=\"urn:Webservice_CMS\">3</nNombre1>";
	r += "<nNombre2 xsd:type=\"xsd:int\" xmlns=\"urn:Webservice_CMS\">4</nNombre2>";
	r += '</m:Addition>';

	r += "</soap:Body></soap:Envelope>";
	xhr.send(r);

	// 4. This will be called after the response is received
	xhr.onload = function () {
		if (xhr.status != 200) { // analyze HTTP status of the response
			alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		} else { // show the result
			alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
		}
	};

	xhr.onprogress = function (event) {
		if (event.lengthComputable) {
			alert(`Received ${event.loaded} of ${event.total} bytes`);
		} else {
			alert(`Received ${event.loaded} bytes`); // no Content-Length
		}

	};

	xhr.onerror = function () {
		alert("Request failed");
	};
}

function construitxml(nNombre1, nNombre2) {
	const f = createDummyForm();

	var requete;
	requete = "<soap:Envelope " +
		"xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope/\" " +
		"xmlns:xsi=\"http://www.w3.org/1999/XMLSchema-instance\" " +
		"xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">" +
		"<soap:Body>";

	requete += "<nNombre1 xsd:type=\"xsd:int\" xmlns=\"urn:Webservice_CMS\">";
	requete += nNombre1;
	requete += "</nNombre1>";

	requete += "<nNombre2 xsd:type=\"xsd:int\" xmlns=\"urn:Webservice_CMS\">";
	requete += nNombre2;
	requete += "</nNombre2>";

	requete += "</soap:Body></soap:Envelope>";
	f.xmlInput.value = requete;
	f.actionInput.value = "urn:Webservice_CMS/Addition";
	document.body.appendChild(f);

	f.submit();
}

function createDummyForm() {
	const f = document.createElement("form");
	f.setAttribute('action', "http://dell2900/CENTREMEDIC_WSTEST_WEB/awws/Webservice_CMS.awws");
	f.setAttribute('method', "post");
	f.setAttribute('name', "xmlform");
	f.setAttribute('id', "xmlform");
	f.setAttribute('target', "_self");

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

	return f;
}