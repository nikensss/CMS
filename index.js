function soap(username, password) {
  username = username || '';
  password = password || '';
  var xmlhttp = new XMLHttpRequest();

  //replace second argument with the path to your Secret Server webservices
  xmlhttp.open(
    'POST',
    'http://centremedicsabadell.net/WEBSERVICE_20_WEB/awws/Webservice_20.awws',
    true
  );

  //create the SOAP request
  //replace username, password (and org + domain, if necessary) with the appropriate info
  var strRequest =
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance" xmlns:xsd="http://www.w3.org/1999/XMLSchema"><soap:Body></soap:Body></soap:Envelope>';

  //specify request headers
  xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
  xmlhttp.setRequestHeader('SOAPAction', '"urn:Webservice_20/GetProfessionalsEspecialitas"');

  //FOR TESTING: display results in an alert box once the response is received
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      alert(xmlhttp.responseText);
    }
  };

  xmlhttp.onload = function() {
    var responseText = xmlhttp.responseText;
    console.log(responseText);
    // process the response.
  };

  xmlhttp.onerror = function() {
    console.log('There was an error!');
  };

  //send the SOAP request
  xmlhttp.send(strRequest);
}

function requestEspecialitats() {
  console.log('Requesting soap...');
  soap('','');
  // const collapseEspecialitats = document.getElementById('especialitats');

  // if (!collapseEspecialitats.classList.contains('show')) {
  //   console.log('Mostrant especialitats!');
  //   removeChildren(collapseEspecialitats);
  //   const i = document.createElement('iframe');
  //   i.setAttribute('id', 'response');
  //   i.setAttribute('name', 'response');
  //   i.setAttribute('src', 'http://servamed1.com/pcsc_web/L45/page_frontal_demanavisita.awp');
  //   i.classList.add('w-100');
  //   collapseEspecialitats.appendChild(i);
  // }
}

function removeChildren(htmlElement) {
  while (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.firstChild);
  }
}
