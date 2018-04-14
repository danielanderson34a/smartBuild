// select * appliations statement
function queryDB(tx) {
  tx.executeSql("SELECT * FROM APPLICATION", [], querySuccess);
  console.log('select all');
}

// display all appliations - used for building control
function querySuccess(tx, results) {

  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    str += "<tr>";

    str += "<td class='label-cell'>" + "<button class='button'>FP-" + results.rows.item(i).applicationID + "</button>" + "</td>";

    str += "<td class='text-success'>" + results.rows.item(i).foreName + "</td>";

    str += "<td class='text-success'>" + results.rows.item(i).appStatus + "</td>";

    str += "</tr>";
    if (document.getElementById("tblBc") != null) {
      document.getElementById("tblBc").innerHTML += str;
    }
    str = '';
    onclick = (function(i) {
      return function() {

      };
    })(i);
  }
}
