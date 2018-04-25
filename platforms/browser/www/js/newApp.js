$$(document).on('page:init', function(e) {
// gets field intputs on click
  $$("#createApp").click(function() {
    var foreName = $$('#foreName').val();
    var surname = $$('#surname').val();
    var address = $$('#address').val();
    var townland = $$('#townland').val();
    var town = $$('#town').val();
    var postcode = $$('#postcode').val();
    var tel = $$('#tel').val();
    var appEmail = $$('#appEmail').val();
    var description = $$('#description').val();
    var floorArea = $$('#floorArea').val();
    var water = $$('#water').val();
    var amount = $$('#amount').val();
    var disability = $$('#disability').val();
    // plans = $$('#plans').text(),
    var signature = $$('#signature').val();
    var date = $$('#date').val();

    var applicationForm = {
      userID: JSON.parse(window.sessionStorage.user).id,
      foreName: foreName,
      surname: surname,
      address: address,
      townland: townland,
      town: town,
      postcode: postcode,
      tel: tel,
      appEmail: appEmail,
      description: description,
      floorArea: floorArea,
      water: water,
      amount: amount,
      disability: disability,

      // plans: plans,
      signature: signature,
      date: date
    };

// check for blank fields
    if (foreName == '' || surname == '' || address == '' || townland == '' || town == '' || postcode == '' || tel == '' || appEmail == '' || description == '' || floorArea == '' || amount == '' || signature == '') {
      app.dialog.alert("Please Fill In All Fields!");
    } else {
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      db.transaction(function(db) {
        insertApplication(db, applicationForm);
      }, insertApplicationError, function() {
        insertApplicationSuccess(applicationForm);
      });
    }
  });


// inserting user into database
  function insertApplication(db, applicationForm) {
    var query = 'INSERT INTO APPLICATION ( userID, foreName, surname, address, townland, town, postcode, tel, appEmail, description, floorArea, water, amount, disability, signature, date, appStatus, inspectionStatus) VALUES ("' + applicationForm.userID + '", "' + applicationForm.foreName + '", "' + applicationForm.surname + '", "' + applicationForm.address + '", "' + applicationForm.townland + '", "' + applicationForm.town + '", "' + applicationForm.postcode + '", "' + applicationForm.tel + '", "' + applicationForm.appEmail + '", "' + applicationForm.description + '", "' + applicationForm.floorArea + '", "' + applicationForm.water + '", "' + applicationForm.amount + '", "' + applicationForm.disability + '", "' + applicationForm.signature + '", "' + applicationForm.date + '", "' + "Pending" + '", "' + "Pending" + '")';
    var results = ('SELECT * FROM APPLICATION');
    db.executeSql(query);
    db.executeSql(results);

  }

  function insertApplicationError(error) {
    window.alert(error);
  }
// on success redirect
  function insertApplicationSuccess(applicationForm) {
    app.dialog.alert("Application Form Submitted");
    var routeToNavigateTo = '/home/';

    app.router.navigate(routeToNavigateTo);


  }


  function querySuccess(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
      //the data from here to the html page.
    }
  }


});
