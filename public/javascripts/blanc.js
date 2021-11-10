
//const fetch = require('node-fetch');


var element = document.getElementById('getElementsResult');
element.textContent = "Hello";


function getDocumentElements()
{
  return "hello";  
  /*let response = await fetch('/api/elements');
    if (response.ok) { 
        let responseText = await response.text();
        console.log (responseText);
        return responseText;
      } else {
        alert("Ошибка HTTP: " + response.status);
        return response.status;
      }
      */
}

