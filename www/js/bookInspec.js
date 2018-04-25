$$(document).on('page:init', function(e) {
// called on click 'create inspection'
  $$("#createInspection").click(function() {
    var inspectionTime = $$('#inspectionTime').val();
    var inspecDate = $$('#inspecDate').val();



    var inspectionForm = {
      userID: JSON.parse(window.sessionStorage.user).id,
      inspectionTime,
      inspectionForm,
      inspecDate,
      inspecDate
    };



    // opening Database
    var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
    db.transaction(function(db) {
      insertInspec(db, inspectionForm);
    }, insertinspecError, function() {
      insertinspecSuccess(inspectionForm);
    });

  });


// function for updating inspection times to database
  function insertInspec(db, inspectionForm, results) {

    var currentApp = results;
    // using session storage to get user id
    var currentID = JSON.parse(window.sessionStorage.user).id;

    var inspecDate = inspectionForm.inspectionTime;
    var query = "UPDATE APPLICATION SET inspectionTime = '" + inspecDate + "' WHERE applicationID = '" + appID + "'";
    var query1 = "UPDATE APPLICATION SET inspecDate = '" + inspecTime + "' WHERE applicationID = '" + appID + "'";

    var results = ('SELECT * FROM APPLICATION');
    //executing sql
    db.executeSql(query);
    db.executeSql(query1);
    db.executeSql(results);

  }



  function insertinspecError(error) {
    window.alert(error);
  }

  function insertinspecSuccess(inspectionForm) {
    app.dialog.alert("Inspection submitted");


  }




});
