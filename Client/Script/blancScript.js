
const fetch = require('node-fetch');

function getDocumentElements()
{
    let response = await fetch('/api/elements');
    if (response.ok) { 
        getElementById(getElementsResult).text = await response.text();
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
}

