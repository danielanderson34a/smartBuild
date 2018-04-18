$$(document).on('page:init', function(e) {
  if (test == true) {
    var user = JSON.parse(window.sessionStorage.user);
      if (user.job === 'Construction') {
        console.log('con worker');
        $$('.bc1').hide();
        $$('.con1').show();
      } else {
        $$('.bc1').show();
        $$('.con1').hide();
      }
  }


  console.log("Device is ready!");
// opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(initApplication);
  // db.transaction(initApplication);

});

function application(tx) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  console.log(appId + 'dana dna');
  console.log('APPLICATION: ' + appId);
  tx.executeSql("SELECT * FROM APPLICATION WHERE applicationID = '" + appId + "'", [], queryApplicationSuccess);
  console.log('selected');

}

function queryApplicationSuccess(db, results) {
  if (fetch == true) {
    console.log('into queryApplicationSuccess');
    var currentApp = results.rows.item(0);

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
function updateStatus() {
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

db.transaction(queryUpdateSuccess);
console.log('in update success');
}
function queryUpdateSuccess(tx)
{
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  tx.executeSql("UPDATE APPLICATION SET appStatus='Approved' WHERE applicationID = '" + appId + "'");
console.log('in success');
}

function initApplication(tx) {
  application(tx);

}


// $$(document).on('page:init', function(e) {
//   var appId = parseInt(mainView.router.currentRoute.params.applicationID);
//   console.log('APPLICATION: ' + appId);
//
//   // select * from applications where id = appId;
//   // this will bring back a single row
//   // store the row in var currentApp;
//   // i.e. var currentApp = results.rows.item(0);(after DB query)
//
//   // this is temp, remove when query plugged in
//   var currentApp = {
//     foreName: 'Dan'
//   };
//
//   // insert text into html elements using HTML ids and jQuery
//   $$('#app-forename').text(currentApp.foreName);
//
// });
