//select all from application on null
function querySelectInspec(tx) {



  tx.executeSql("SELECT * FROM APPLICATION WHERE inspectionTime IS NOT NULL", [], querInspecSuccess);


}
// display all inspection for Building control
function querInspecSuccess(db, results) {
  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    var currentApp = results.rows.item(i);
    var appId = currentApp.applicationID;

    str += "<tr>";

    str += `<td clear="left" class='label-cell'><a class='button' onclick='go()' id='openApp' href='/inspection/${appId}'>FP-${appId}</a></td>`

    str += "<td class='text-success'>" + currentApp.address + "</td>";

    str += "<td class='text-success'>" + currentApp.inspectionTime + " " + currentApp.inspecDate + "</td>";

    str += "<td class='text-success'>" + currentApp.inspectionStatus + "</td>";


    str += "</tr>";






  }
  if (document.getElementById("tblInspec") != null) {
    document.getElementById("tblInspec").innerHTML = str;
  }
}

function go() {
  fetch = true;
}
