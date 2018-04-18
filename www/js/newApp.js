$$(document).on('page:init', function (e) {

    $$("#createApp").click(function() {
console.log("info");
var foreName = $$('#foreName').val();
var  surname = $$('#surname').val();
var  address = $$('#address').val();
var  townland = $$('#townland').val();
var  town = $$('#town').val();
var  postcode = $$('#postcode').val();
var  tel = $$('#tel').val();
var  appEmail = $$('#appEmail').val();
var  description = $$('#description').val();
var  floorArea = $$('#floorArea').val();
var  water = $$('#water').val();
var  amount = $$('#amount').val();
var  disability = $$('#disability').val();
  // plans = $$('#plans').text(),
var  signature = $$('#signature').val();
var  date = $$('#date').val();

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

    console.log(applicationForm);
    console.log(applicationForm.foreName + 'dzgdf');

    if (foreName == '' || surname == '' || address == '' || townland == '' || town == '' || postcode == '' || tel == '' || appEmail == '' || description == '' || floorArea == '' || amount == '' || signature == '') {
      app.dialog.alert("Please Fill In All Fields!");
      console.log(applicationForm.foreName);
    } else {
      console.log('passed error');
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      console.log(db);
      db.transaction(function(db) {
        insertApplication(db, applicationForm);
      }, insertApplicationError, function() {
        insertApplicationSuccess(applicationForm);
      });
    }
    console.log(applicationForm.foreName + 'dzgdf');
  });



  function insertApplication(db, applicationForm) {
console.log('insertApplication');
    var query = 'INSERT INTO APPLICATION ( userID, foreName, surname, address, townland, town, postcode, tel, appEmail, description, floorArea, water, amount, disability, signature, date, appStatus) VALUES ("' + applicationForm.userID + '", "' + applicationForm.foreName + '", "' + applicationForm.surname + '", "' + applicationForm.address + '", "' + applicationForm.townland + '", "' + applicationForm.town + '", "' + applicationForm.postcode + '", "' + applicationForm.tel + '", "' + applicationForm.appEmail + '", "' + applicationForm.description + '", "' + applicationForm.floorArea + '", "' + applicationForm.water + '", "' + applicationForm.amount + '", "' + applicationForm.disability + '", "' + applicationForm.signature + '", "' + applicationForm.date + '", "' + "Pending" + '")';
    var results = ('SELECT * FROM APPLICATION');
    db.executeSql(query);
    db.executeSql(results);
    console.log(results + 'checked');

  }

  // function getuserid(tx, results) {
  //   console.log('insert');
  //   console.log(results.insertId);
  // }

  function insertApplicationError(error) {
console.log(error);
    window.alert(error);
  }

  function insertApplicationSuccess(applicationForm) {
    console.log('sucess');
    app.dialog.alert("Application Form Submitted");
    var routeToNavigateTo = '/home/';

    app.router.navigate(routeToNavigateTo);

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
