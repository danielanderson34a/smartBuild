// function initDb1(db) {
//   db.executeSql('CREATE TABLE IF NOT EXISTS APPLICATION (applicationID integer primary key autoincrement, userID, foreName, surname, address, townland, town, postcode, tel, appEmail, description, floorArea, water, amount, disability, plans, signature, date, app-status, inspectionTime, inspection-status)');
// console.log("app table created");
// }

function createApplication() {

  var foreName = $$('#foreName').text(),
    surname = $$('#surname').text(),
    address = $$('#address').text(),
    townland = $$('#townland').text(),
    town = $$('#town').text(),
    postcode = $$('#postcode').text(),
    tel = $$('#tel').text(),
    appEmail = $$('#appEmail').text(),
    description = $$('#description').text(),
    floorArea = $$('#floorArea').text(),
    water = $$('#water').text(),
    amount = $$('#amount').text(),
    disability = $$('#disability').text(),
    plans = $$('#plans').text(),
    signature = $$('#signature').text(),
    date = $$('#date').text();

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
    plans: plans,
    signature: signature,
    date: date
  };

  var errors = validateAppForm(applicationForm);

  if (errors.length === 0) {
    // no errors
    var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
    db.transaction(function(db) {
      insertApplication(db, applicationForm);
    }, insertApplicationError, insertApplicationSuccess);
  } else {
    // show errors to user
  }
}
