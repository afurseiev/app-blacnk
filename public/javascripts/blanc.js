
var element = document.getElementById('getElementsResult');

async function getElements () 
  {
    let response = await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } });
    if (response.ok) {
      let responseJson =  await response.json();
      responseJson = JSON.stringify(responseJson)
      const myArray = JSON.parse(responseJson);
      let responseText = myArray[0].lengthUnits;
      console.log (responseText);
      element.textContent = responseText
    }
    else {
       if (response.status == 401)
          {
            let autorizationRedirect = await response.text(); 
            window.location.href = autorizationRedirect; 
          }
          else {
            document.write("Server response" + response.statusText +"(" + response.status +")" );
            console.log(response.statusText);
            console.log("Not 200");
          }
    }
  }
  

getElements();


function tableCreate() {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '60%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < 3; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 2; j++) {
      if (i == 2 && j == 1) {
        break
      } else {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('\u0020'))
        i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
        tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
tableCreate();