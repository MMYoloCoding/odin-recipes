fetch('agv_data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('table-body');
    let html = '';

    data.forEach(item => {
      html += `
        <tr>
          <td>${item.AGV}</td>
          <td id="tu${item.id}"></td>
          <td id="tuOut${item.id}"></td>
          <th>
            <input type="words", id="tupleInput${item.id}">
            <button onclick="displayTuple('tupleInput${item.id}','tuOut${item.id}','tu${item.id}')">Submit tuple</button>
          </th>
        </tr>
      `;
    });

    tableBody.innerHTML = html;
  });

let mapArray = [];
fetch('map_data.json')
  .then(response => response.json())
  .then(data => {
    

    // Iterate over each property in the data object
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key];
        const item = {
          key: key,
          value: value
        };
        mapArray.push(item);
      }
    }

    // Iterate over the array of items
    mapArray.forEach(item => {
      console.log(item.key);   // Property key, e.g., "A", "B", "C"
      console.log(item.value); // Property value, e.g., [[0, 0], [30, 75]], [[30, 0], [100, 25]], etc.

      // You can perform further operations with each item here
    });
    // console.log(mapArray[0].value[0])
  })
  .catch(error => {
    console.error('Error:', error);
  });


function displayTuple(inputId, tuOutId, tuId) {
	const input = document.getElementById(inputId);
	const tuOut = document.getElementById(tuOutId);
	const tu = document.getElementById(tuId);
  
	const tupleStr = input.value;
	tu.innerHTML = tupleStr;
  
	const tuple = JSON.parse(tupleStr);

    if (tuple[0] > mapArray[0].value[0] || tuple[0]<0 || tuple[1] > mapArray[0].value[1] || tuple[1]<0) {
        tuOut.innerHTML = "AGV out of bound";
        return;
      }

    for(var i = 1; i< mapArray.length; i++){
        if (tuple[0]>=mapArray[i].value[0][0] && tuple[0]<=mapArray[i].value[1][0] && tuple[1]>=mapArray[i].value[0][1] && tuple[1]<=mapArray[i].value[1][1]){
            tuOut.innerHTML = mapArray[i].key;
            return;
        }
    }
  }