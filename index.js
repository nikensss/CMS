function requestEspecialitats() {
  const collapseEspecialitats = document.getElementById("especialitats");

  if (!collapseEspecialitats.classList.contains("show")) {
    console.log("Mostrant especialitats!");
    removeChildren(collapseEspecialitats);
    const i = document.createElement("iframe");
    i.setAttribute('id', 'response');
    i.setAttribute('name', 'response');
    i.setAttribute('src', 'http://servamed1.com/pcsc_web/L45/page_frontal_demanavisita.awp');
    i.classList.add("w-100");
    collapseEspecialitats.appendChild(i);
  }
}

function removeChildren(htmlElement) {
  while (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.firstChild);
  }
}
