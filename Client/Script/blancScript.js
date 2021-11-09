
const fetch = require('node-fetch');

function getDocumentElements()
{
    let response = await fetch('/api/elements');
    if (response.ok) { 
        let responseText = await response.text();
        console.log (responseText);
        getElementById(getElementsResult).textContent = responseText;
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
}

