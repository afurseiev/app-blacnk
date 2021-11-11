
var element = document.getElementById('getElementsResult');


/** 
 *  @param {array} dataArray .
*/
function tableCreate(dataArray) {
  var body = document.getElementsByTagName('body')[0]; //get the first body-type object available on web page
  
  let tableRowCount = dataArray.length; //calculate row number of the future table
  
  var elementTable = document.createElement('table'); //create table
  elementTable.style.width = '60%';                    //define it's style
  elementTable.setAttribute('border', '1');

  //create table header
  let tableHeader = document.createElement('thead');
  let headerRow   = document.createElement('tr');
  let headNumber  = document.createElement('th');
  let headType    = document.createElement('th');
  let headName    = document.createElement('th');

  headNumber.appendChild (document.createTextNode("Number"));
  headType.appendChild (document.createTextNode("Type"));
  headName.appendChild (document.createTextNode("Name"));

  headerRow.appendChild (headNumber);
  headerRow.appendChild (headType);
  headerRow.appendChild (headName);

  tableHeader.appendChild(headerRow);

  elementTable.appendChild(tableHeader);


  //create table body
  let tableBody = document.createElement('tbody');

  for (var i = 0; i < tableRowCount; i++) 
  {
    let tableRow = document.createElement('tr');
    for (let J = 0; J < 3; J++) 
    {
      let rowCell = document.createElement('td');
      let content = undefined;
      switch (J)
      {
        case 0:
          content = i+1;
          break;
        case 1:
          content = dataArray[i].type;
          break;
        case 2:
          content = dataArray[i].name; 
          break;   
      }  
      rowCell.appendChild (document.createTextNode(content));
      tableRow.appendChild(rowCell);
    }
    tableBody.appendChild(tableRow);
  }
  elementTable.appendChild(tableBody);
  body.appendChild(elementTable);
}


async function getElements () 
  {
    let response = await fetch(`/api/elements${window.location.search}`, { headers: { 'Accept': 'application/json' } });
    if (response.ok) {
      let responseJson =  await response.json();
      responseJson = JSON.stringify(responseJson)
      const myArray = JSON.parse(responseJson);
      tableCreate(myArray);
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



