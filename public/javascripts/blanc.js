
var element = document.getElementById('getElementsResult');

async function getElements ()
{
let response = await fetch('/api/elements');
if (response.ok) { 
    let responseText = await response.text();
    console.log (responseText);
    return responseText;
  } else {
    
    return "Ошибка HTTP: " + response.status;
  }
};
      
element = getElements();


