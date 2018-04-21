
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

    str += `<td clear="left" class='label-cell'><a class='button' onclick='go()' id='openApp' href='/applications/${appId}'>FP-${appId}</a></td>`;

    str += "<td class='text-success'>" + currentApp.foreName + "</td>";

    str += "<td class='text-success'>" + currentApp.appStatus + "</td>";

    str += "<td class='text-success'>" + currentApp.inspectionStatus + "</td>";


    // str += "<tr >";
    if (currentApp.appStatus === 'Approved') {
      str += `<a onclick='bookInspection(${appId})' class='button color-green link'>Book Inspection </a>`;
    // str += "</tr>";
    }

    str += "</tr>";
  }

  if (document.getElementById("tblGridBody") != null) {
    document.getElementById("tblGridBody").innerHTML = str;
  }
}

function bookInspection(appId) {
  console.log('booking inspec for ' + appId);

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
  console.log('go function');
 fetch = true;
 console.log(fetch);
}

function submitInspectionBooking(appId) {
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(function(tx) {
    submitedInspection(tx, appId);
  });

  // update set inspection time = ? where id = appId;
}

function submitedInspection(tx, appId){
  var inspecDate = $$("#inspectionTime").val();
  console.log('submitting inspection booking ' + appId);
  var submit = "UPDATE APPLICATION SET inspectionTime = '" + inspecDate + "' WHERE applicationID = '" + appId + "'";
  tx.executeSql(submit);
  app.dialog.alert("Booking submited for: " + inspecDate + "At: ");



}
