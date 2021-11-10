

const fetch = require('node-fetch');
//const fetch = require('node-fetch');
//import fetch from 'node-fetch';

var element = document.getElementById('getElementsResult');
//element.textContent = getDocumentElements();

 
let response = await fetch('/api/elements');
if (response.ok) { 
    let responseText = await response.text();
    console.log (responseText);
    element.textContent = responseText;
  } else {
    alert("Ошибка HTTP: " + response.status);
    element.textContent = response.status;
  }
      



