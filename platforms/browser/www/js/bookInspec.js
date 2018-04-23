$$(document).on('page:init', function (e) {

    $$("#createInspection").click(function() {
console.log("info");
var inspectionTime = $$('#inspectionTime').val();
var inspecDate = $$('#inspecDate').val();



var inspectionForm = {
  userID: JSON.parse(window.sessionStorage.user).id,
  inspectionTime, inspectionForm,
  inspecDate, inspecDate
};




      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      console.log(db);
      db.transaction(function(db) {
        insertInspec(db, inspectionForm);
      }, insertinspecError, function() {
        insertinspecSuccess(inspectionForm);
      });

  });



  function insertInspec(db, inspectionForm, results) {
    // var len = results.rows.length,
    //   i;
    var currentApp = results;
    // var appId = currentApp.applicationID;
    var currentID = JSON.parse(window.sessionStorage.user).id;

    var inspecDate = inspectionForm.inspectionTime;
    console.log(inspecDate);
    console.log(currentID);
    console.log(currentApp);
    var query = "UPDATE APPLICATION SET inspectionTime = '" + inspecDate + "' WHERE applicationID = '" + appID + "'";
    var query1 = "UPDATE APPLICATION SET inspecDate = '" + inspecTime + "' WHERE applicationID = '" + appID + "'";

    var results = ('SELECT * FROM APPLICATION');
    db.executeSql(query);
    db.executeSql(query1);
    db.executeSql(results);

  }

  // function getuserid(tx, results) {
  //   console.log('insert');
  //   console.log(results.insertId);
  // }

  function insertinspecError(error) {
console.log(error);
    window.alert(error);
  }

  function insertinspecSuccess(inspectionForm) {
    console.log('sucess');
    app.dialog.alert("Inspection submitted");

    // var routeToNavigateTo = '/login/';

    // if (userForm.job === 'buildingControl'){
    //   routeToNavigateTo = '/bc-home/';
    // }

    // app.router.navigate(routeToNavigateTo);

    // move to next page
    // alert('User Succesfully Registered');
    // window.location.href="/about/";
  }

//   function queryDB(tx) {
//     var results = ('SELECT * FROM APPLICATION');
//     console.log(results);
// }

// Query the success callback
//



});
