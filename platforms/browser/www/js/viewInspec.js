function querySelectInspec(tx) {

  // var currentID = JSON.parse(window.sessionStorage.user).id;


  tx.executeSql("SELECT * FROM APPLICATION WHERE inspectionTime IS NOT NULL", [], querInspecSuccess);


}
// display all appliations for one user
function querInspecSuccess(db, results) {
  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    var currentApp = results.rows.item(i);
    var appId = currentApp.applicationID;

    str += "<tr>";

    str += `<td class='label-cell'><a class='button' onclick='go()' id='openApp' href='/applications/${appId}'>FP-${appId}</a></td>`;

    str += "<td class='text-success'>" + currentApp.foreName + "</td>";

    str += "<td class='text-success'>" + currentApp.inspectionTime + "</td>";
str += "</tr>";

    if (document.getElementById("tblInspec") != null) {
      document.getElementById("tblInspec").innerHTML += str;
    }
    str = '';



  }
}
function go() {
  console.log('go function');
 fetch = true;
 console.log(fetch);
}
