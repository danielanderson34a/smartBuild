function querySelectDB(tx) {

  var currentID = JSON.parse(window.sessionStorage.user).id;


  tx.executeSql("SELECT * FROM APPLICATION WHERE userID = '" + currentID + "'", [], querySelectSuccess);


}
// display all appliations for one user
function querySelectSuccess(db, results) {

  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    str += "<tr>";

    str += "<td class='label-cell'>" + "<button class='button' value=''>FP-" + results.rows.item(i).applicationID + "</button>" + "</td>";

    str += "<td class='text-success'>" + results.rows.item(i).foreName + "</td>";

    str += "<td class='text-success'>" + results.rows.item(i).appStatus + "</td>";

    str += "</tr>";
    if (document.getElementById("tblGrid") != null) {
      document.getElementById("tblGrid").innerHTML += str;
    }
    str = '';


    onclick = (function(i) {
      return function() {

      };
    })(i);
  }
}
