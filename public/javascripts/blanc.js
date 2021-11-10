
var element = document.getElementById('getElementsResult');

async function getElements () 
  {
    let response = await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } });
    if (response.ok) {
      let responseText =  await response.json();
      responseText = JSON.stringify(responseText);
      console.log (responseText);
      return responseText;
    }
    else {
      return "Ошибка HTTP: " + response.status;
    }
  }
  
  /*
  (async () => {
    let response = await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } });
    //let status = await response.status;
    let responseText = await response.text();
    return responseText;
  })
      console.log (responseText);
      return responseText;
    }
    else 
    {
      return "Ошибка HTTP: " + response.status;
    }
  }


/* let response = async  () => {
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
*/

element.textContent = getElements();


