
var element = document.getElementById('getElementsResult');

function getElements ()
{
 let response = async  () => {
     await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } })
  };
  if (response.ok) { 
    let responseText = response.text;
    responseText = JSON.stringify(responseText);
    console.log (responseText);
    return responseText;
  } else {
    return "Ошибка HTTP: " + response.status;
  }

};


element.textContent = getElements();


