function getEspecialitats() {
	console.log("Getting especialitats");
	var collapseEspecialitats = document.getElementById("collapseEspecialitats");
	var bodyEspecialitats = document.getElementById("bodyEspecialitats");

	if(!collapseEspecialitats.classList.contains("show")){
		console.log("Querying data...");
		bodyEspecialitats.innerHTML = "Get Element By Id";
	}

}
