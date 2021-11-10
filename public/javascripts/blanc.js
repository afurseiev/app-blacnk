
var element = document.getElementById('getElementsResult');

async function getElements ()
{
// let response = await fetch('/api/elements');
let response = await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } })
if (response.ok) { 
    let responseText = await response.text();
    responseText = JSON.stringify(responseText);
    console.log (responseText);
    return responseText;
  } else {
    return "Ошибка HTTP: " + response.status;
  }
};
      
element.textContent = getElements();


