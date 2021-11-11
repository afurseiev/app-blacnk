
var element = document.getElementById('getElementsResult');


/** 
 *  @param {array} dataArray .
*/
function tableCreate(dataArray) {
  var body = document.getElementsByTagName('body')[0]; //get the first body-type object available on web page
  
  //let tableRowCount = dataArray.length + 1; //calculate row number of the future table
  
  var tbl = document.createElement('table'); //create table
  tbl.style.width = '60%';                    //define it's style
  tbl.setAttribute('border', '1');

  //create table header
  let tableHeader = document.createElement('thead');

  let headerRow = document.createElement('tr');

  let headNumber = document.createElement('th');
  let headType = document.createElement('th');
  let headName = document.createElement('th');

 // headNumber.appendChild (document.createTextNode("Number"));
  headType.appendChild (document.createTextNode("Type"));
  headName.appendChild (document.createTextNode("Name"));

  //headerRow.appendChild (headNumber);
  headerRow.appendChild (document.createElement('th').appendChild(document.createTextNode("Number")));
  headerRow.appendChild (headType);
  headerRow.appendChild (headName);

  


  tableHeader.appendChild(headerRow);



  //var tbdy = document.createElement('tbody');
  /*for (var i = 0; i < tableRowCount; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 3; j++) {
      if (i == 0) {

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
  */
  tbl.appendChild(tableHeader);
  body.appendChild(tbl)
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



