// select * appliations statement
function queryDB(tx) {
  tx.executeSql("SELECT * FROM APPLICATION", [], querySuccess, go);
}

// display all appliations - used for building control
function querySuccess(tx, results) {

  var len = results.rows.length,
    i;

  var str = '';



  for (i = 0; i < len; i++) {

    var currentApp = results.rows.item(i);
    var appId = currentApp.applicationID;

    str += "<tr>";

    str += `<td clear="left" class='label-cell'><a class='button' onclick='go()' id='openApp' href='/applications/${appId}'>FP-${appId}</a></td>`;

    str += "<td class='text-success'>" + currentApp.foreName + "</td>";

    str += "<td class='text-success'>" + currentApp.appStatus + "</td>";

    str += "<td class='text-success'>" + currentApp.inspectionStatus + "</td>";

    str += "</tr>";


  }
  if (document.getElementById("tblBc") != null) {
    document.getElementById("tblBc").innerHTML = str;
  }
}

function go() {
  fetch = true;
}
