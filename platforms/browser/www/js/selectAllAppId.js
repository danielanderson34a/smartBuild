function querySelectDB(tx) {

  var currentID = JSON.parse(window.sessionStorage.user).id;


  tx.executeSql("SELECT * FROM APPLICATION WHERE userID = '" + currentID + "'", [], querySelectSuccess, go);


}
// display all appliations for one user
function querySelectSuccess(db, results) {
console.log('hvuvycttyctrtycrt');
  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    var currentApp = results.rows.item(i);
    var appId = currentApp.applicationID;

    str += "<tr>";

    str += `<td class='label-cell'><a class='button' onclick='go()' id='openApp' href='/applications/${appId}'>FP-${appId}</a></td>`;

    str += "<td class='text-success'>" + currentApp.foreName + "</td>";

    str += "<td class='text-success'>" + currentApp.appStatus + "</td>";

    str += "</tr>";
    if (document.getElementById("tblGrid") != null) {
      document.getElementById("tblGrid").innerHTML += str;
    }
    str = '';



  }
}
function go() {
  console.log('go function');
 fetch = true;
 console.log(fetch);
}
