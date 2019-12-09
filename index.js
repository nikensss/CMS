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
		i.setAttribute('src', 'http://servamed1.com/pcsc_web/L45/page_frontal_demanavisita.awp');
		bodyEspecialitats.appendChild(i);
	}
}

function removeChildren(htmlElement) {
	while (htmlElement.firstChild) {
		htmlElement.removeChild(htmlElement.firstChild);
	}
}