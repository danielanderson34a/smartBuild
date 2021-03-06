function querySelectDB(tx) {

  var currentID = JSON.parse(window.sessionStorage.user).id;


  tx.executeSql("SELECT * FROM APPLICATION WHERE userID = '" + currentID + "'", [], querySelectSuccess, go);


}
// display all appliations for one user
function querySelectSuccess(db, results) {
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

    str += "<tr>";
    // str += "<tr >";
    if (currentApp.appStatus === 'Approved') {
      str += `<td clear="left" class='label-cell'><a style='float:right;' onclick='bookInspection(${appId})' class='button color-green link'>Book Inspection </a></td>`;
      // str += "</tr>";
    }
    str += "</tr>";
    str += "</tr>";
  }

  if (document.getElementById("tblGridBody") != null) {
    document.getElementById("tblGridBody").innerHTML = str;
  }
}
// display dynamic popup for booking inspections
function bookInspection(appId) {

  var dynamicPopup = app.popup.create({
    content: `
    <div class="popup popup-about">
      <div class="block">

        <p><a class="link popup-close" href="#"><i class="f7-icons popup-close">close_round</i></a></p>
        <div class="block-title">Book Inspection</div>
        <p>Only book an inspection when you have completed construction work!</p>
        <div class="list inset">
          <ul>

            <li class="item-content item-input">
              <div class="item-media">
                <i class="f7-icons">calendar</i>
              </div>
              <div class="item-inner">
                <div class="item-title item-label">Inspection Date</div>
                <div class="item-input-wrap">
                  <input type="date" placeholder="Please choose..." id="inspectionTime">
                </div>
              </div>
            </li>
            <li>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Select time</div>
                  <div class="item-input-wrap">
                    <select id="inspecDate">
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>

            <a onclick="submitInspectionBooking(${appId})" href="#" class="col button button-big button-fill button-raised color-green">Book Inspection</a>
          </ul>
        </div>
      </div>
    </div>
    `
  });

  dynamicPopup.open();
}

function go() {
  fetch = true;
}

function submitInspectionBooking(appId) {
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(function(tx) {
    submitedInspection(tx, appId);
  });

  // update set inspection time = ? where id = appId;
}
// on success insert into database fields
function submitedInspection(tx, appId) {
  var inspecDate = $$("#inspectionTime").val();
  var inspecTime = $$("#inspecDate").val();
  var submit = "UPDATE APPLICATION SET inspectionTime = '" + inspecDate + "' WHERE applicationID = '" + appId + "'";
  var submit1 = "UPDATE APPLICATION SET inspecDate = '" + inspecTime + "' WHERE applicationID = '" + appId + "'";

  tx.executeSql(submit);
  tx.executeSql(submit1);

  app.dialog.alert("Booking submited for: " + inspecDate + " At: " + inspecTime);

}
