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
		.complete(function(data) {
			console.log("Complete!");
			clearInterval(interval);
			addFormattedData(htmlElement, data.responseJSON);
			// $(htmlElement).data('is-loaded', true);
		})
		.error(function(e) {
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

	var r = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/1999/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\"><soap:Body></soap:Body></soap:Envelope>";
	var urn = "urn:Webservice_20/GetEspecialitats";

	let fd = new FormData();
	fd.append('xml', r);
	fd.append('action', urn);

	fetch('http://www.centremedicsabadell.net/WEBSERVICE_20_WEB/awws/Webservice_20.awws', {
			method: 'POST',
			body: fd
		})
		.then(r => r.text())
		.then(console.log);
}

function submitOnDummyForm(r, urn) {
	const {
		f,
		i
	} = createDummyForm();
	f.xmlInput.value = r;
	f.actionInput.value = urn;
	document.body.appendChild(f);
	document.body.appendChild(i);

	// $("#xmlform").submit(function(e) {
	// 	var postData = $(this).serializeArray();
	// 	console.log(`Seralized data: `);
	// 	console.log(postData);
	// 	var formURL = $(this).attr("action");
	// 	console.log(`URL: ${formURL}`);
	// 	$.ajax({
	// 		url: formURL,
	// 		type: "POST",
	// 		data: postData,
	// 		success: function(data) {
	// 			//data: return data from server
	// 			console.log("Success");
	// 		}
	//
	// 	});
	// 	e.preventDefault(); //STOP default action
	// });
	//
	// $("#xmlform").submit();
	// f.submit();

	var formData = document.getElementById("xmlform");
	var request = new XMLHttpRequest();
	request.open("POST", formData.getAttribute("action"));
	request.send(new FormData(formData));

	// document.body.removeChild(f);
	// document.body.removeChild(i);
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

function webServiceCallBuildingXmlHttpRequest() {
	// 1. Create a new XMLHttpRequest object
	let xhr = new XMLHttpRequest();

	// 2. Configure it: GET-request for the URL /article/.../load
	xhr.open('POST', "http://www.centremedicsabadell.net/WEBSERVICE_20_WEB/awws/Webservice_20.awws", true);

	// 3. Send the request over the network
	var urn = "urn:Webservice_20/GetEspecialitats";
	var r = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/1999/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\"><soap:Body><GetEspecialitats xmlns=\"" + urn + "\"/></soap:Body></soap:Envelope>";

	// 4. This will be called after the response is received
	xhr.onload = function() {
		if (xhr.status != 200) { // analyze HTTP status of the response
			alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		} else { // show the result
			alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
		}
	};

	xhr.onprogress = function(event) {
		if (event.lengthComputable) {
			alert(`Received ${event.loaded} of ${event.total} bytes`);
		} else {
			alert(`Received ${event.loaded} bytes`); // no Content-Length
		}

	};

	xhr.onerror = function() {
		alert("Request failed");
	};

	xhr.send(r);

}
