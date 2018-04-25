$$(document).on('page:init', function(e) {
  if (test == true) {
    var user = JSON.parse(window.sessionStorage.user);
    if (user.job === 'Construction') {
      $$('.bc1').hide();
      $$('.con1').show();
    } else {
      $$('.bc1').show();
      $$('.con1').hide();
    }
  }



  // opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(initApplication);
  // db.transaction(initApplication);

});
// select all application on appID
function application(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("SELECT * FROM APPLICATION WHERE applicationID = '" + appId + "'", [], queryApplicationSuccess);

}
// displaying application full view on a seperate page
function queryApplicationSuccess(db, results) {
  if (fetch == true) {
    var currentApp = results.rows.item(0);

    $$('#app-ID').text("Application ID: " + currentApp.applicationID);

    $$('#app-title').text(currentApp.foreName + " " + currentApp.surname);
    $$('#app-forename').text(currentApp.foreName);
    $$('#app-surname').text(currentApp.surname);
    $$('#app-address').text(currentApp.address);
    $$('#app-townland').text(currentApp.townland);
    $$('#app-town').text(currentApp.town);
    $$('#app-postcode').text(currentApp.postcode);
    $$('#app-tel').text(currentApp.tel);
    $$('#app-email').text(currentApp.appEmail);
    $$('#app-description').text(currentApp.description);
    $$('#app-floorarea').text(currentApp.floorArea);
    $$('#app-water').text(currentApp.water);
    $$('#app-amount').text(currentApp.amount);
    $$('#app-disability').text(currentApp.disability);
    $$('#app-signature').text(currentApp.signature);
    $$('#app-date').text(currentApp.date);
    $$('#app-status').text(currentApp.appStatus);

    fetch = false;
  }

}
if (application.appStatus) {

}

function updateStatus() {
  // opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(queryUpdateSuccess);
}
// function for approving application
function queryUpdateSuccess(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("UPDATE APPLICATION SET appStatus='Approved' WHERE applicationID = '" + appId + "'");
  app.dialog.alert("Application Approved!");
  appStatus = true;
  var routeToNavigateTo = '/home/';


  app.router.navigate(routeToNavigateTo);
}

function updateReject() {
  // opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(queryRejectSuccess);
}
//rejection application
function queryRejectSuccess(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("UPDATE APPLICATION SET appStatus='Rejected' WHERE applicationID = '" + appId + "'");
  app.dialog.alert("Application Rejected!");

  var routeToNavigateTo = '/home/';


  app.router.navigate(routeToNavigateTo);
}

function updateInspec() {
  // opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(queryUpdateInspec);
}
//changing inspection status to approved
function queryUpdateInspec(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("UPDATE APPLICATION SET inspectionStatus='Approved' WHERE applicationID = '" + appId + "'");
  app.dialog.alert("Inspection Approved!");
  appStatus = true;
  var routeToNavigateTo = '/home/';

  app.router.navigate(routeToNavigateTo);
}

// changing inspection status
function updateRejectInspec() {
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(queryRejectInspec);
}

function queryRejectInspec(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);

  tx.executeSql("UPDATE APPLICATION SET inspectionStatus='Rejected' WHERE applicationID = '" + appId + "'");
  app.dialog.alert("Inspection Rejected!");
  appStatus = true;
  var routeToNavigateTo = '/home/';


  app.router.navigate(routeToNavigateTo);
}
// deleting application form
function deleteApp() {
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(queryDeleteApp);

}

function queryDeleteApp(tx) {

  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("DELETE FROM APPLICATION Where applicationID = '" + appId + "'");
  app.dialog.alert("Application Deleted!");
  var routeToNavigateTo = '/home/';



  app.router.navigate(routeToNavigateTo);


}

function initApplication(tx) {
  application(tx);

}
