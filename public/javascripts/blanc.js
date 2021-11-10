
var element = document.getElementById('getElementsResult');

async function getElements ()
{
let response = await fetch('/api/elements');
if (response.ok) { 
    let responseText = await response.text();
    console.log (responseText);
    return responseText;
  } else {
    alert("Ошибка HTTP: " + response.status);
    return response.status;
  }
};
      
element = getElements();


