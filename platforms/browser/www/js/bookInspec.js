$$(document).on('page:init', function (e) {

    $$("#createInspection").click(function() {
console.log("info");
var inspectionTime = $$('#inspectionTime').val();


var inspectionForm = {
  userID: JSON.parse(window.sessionStorage.user).id,
  inspectionTime, inspectionForm
};




      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      console.log(db);
      db.transaction(function(db) {
        insertInspec(db, inspectionForm);
      }, insertinspecError, function() {
        insertinspecSuccess(inspectionForm);
      });

  });



  function insertInspec(db, inspectionForm) {
    // var appId = parseInt(mainView.router.currentRoute.params.applicationID);
    var currentID = JSON.parse(window.sessionStorage.user).id;

    var inspecDate = inspectionForm.inspectionTime;
    console.log(inspecDate);
    console.log(currentID);
    var query = "UPDATE APPLICATION SET inspectionTime = '" + inspecDate + "' WHERE applicationID = '" + currentID + "'";
    var results = ('SELECT * FROM APPLICATION');
    db.executeSql(query);
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
function querySuccess(tx, results) {
    var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " +      results.rows.item(i).data);
//the data from here to the html page.
    }
}


});
