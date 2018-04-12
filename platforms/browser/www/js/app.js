// Dom7
var $$ = Dom7;

function determineView() {
  var user = JSON.parse(window.sessionStorage.user);

  if (user.job === 'Construction') {
    console.log('con worker');
    $$('.bc').hide();
    $$('.con').show();
  } else {
    $$('.bc').show();
    $$('.con').hide();
  }
}

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'SmartBuild', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function() {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function() {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: [
    // Load via Ajax
    {
      path: '/index/',
      url: 'index.html',
    }, {
      path: '/login/',
      url: './pages/login.html',
    }, {
      path: '/about/',
      url: './pages/about.html',
    }, {
      path: '/form/',
      url: './pages/form.html',
    },
    {
      path: '/newApp/',
      url: './pages/newApp.html',
    },
    {
      path: '/myApplications/',
      url: './pages/myApplications.html',
    },
     {
      path: '/home/',
      url: './pages/home.html',
      on: {
        pageBeforeIn: determineView
      }
    },
  ],
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

// var router = app.view.create;
// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

function runExample() {
  console.log("Run");
  var routeToNavigateTo = '/myApplications/';
  app.router.navigate(routeToNavigateTo);
      // createDbAndTables();
      // getAllTablesFromDB(getResultSetFromTable);
    }





$$(document).on('page:init', function(e) {


  console.log("Device is ready!");
// opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
  db.transaction(initTables);

  console.log("Database opened");

});

// create user table
function initAppTable(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS APPLICATION (
      applicationID integer primary key,
      userID text,
      foreName text,
      surname text,
      address text,
      townland text,
      town text,
      postcode text,
      tel text,
      appEmail text,
      description text,
      floorArea text,
      water text,
      amount text,
      disability text,
      plans blob,
      signature text,
      date text,
      appStatus text,
      inspectionTime text,
      inspectionStatus text
    )`);
}


function initUserTable(tx) {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS USER (
    id integer primary key autoincrement,
    firstName text,
    lastName text,
    userName text,
    email text,
    password text,
    gender text,
    dob text,
    job text
  )`);

}




function initTables(tx) {
	initAppTable(tx);
	initUserTable(tx);
  // queryDB(tx);
  querySelectDB(tx);
}

function querySelectDB(tx) {
  var currentID = JSON.parse(window.sessionStorage.user).id;
  console.log(currentID);

  tx.executeSql("SELECT * FROM APPLICATION WHERE userID = '" + currentID +"'", [], querySelectSuccess);


}
// display all appliations for one user
function querySelectSuccess(tx, results)
  {

             var len = results.rows.length, i;

             var str = '';

             for (i = 0; i < len; i++) {

                 str += "<tr>";

                 str += "<td class='label-cell'>" + "<button class='button'>FP-" + results.rows.item(i).applicationID + "</button>" + "</td>";
                  console.log(this.applicationID);
                 str += "<td class='text-success'>" + results.rows.item(i).foreName + "</td>";

                 str += "<td class='text-success'>" + results.rows.item(i).appStatus + "</td>";

                 str += "</tr>";
                  if(document.getElementById("tblGrid") != null){
                        document.getElementById("tblGrid").innerHTML += str;
                    }
                 str = '';
                 onclick = (function(i) {return function() {
    console.log(results.rows.item(i).applicationID);
};})(i);
        }
             }
//select * appliations statement
// function queryDB(tx) {
//  tx.executeSql("SELECT * FROM APPLICATION", [], querySuccess);
//  console.log('select all');
// }

// display all appliations - used for building control
// function querySuccess(tx, results)
//   {
//
//              var len = results.rows.length, i;
//
//              var str = '';
//
//              for (i = 0; i < len; i++) {
//
//                  str += "<tr>";
//
//                  str += "<td class='label-cell'>" + "<button class='button'>FP-" + results.rows.item(i).applicationID + "</button>" + "</td>";
//                   console.log(this.applicationID);
//                  str += "<td class='text-success'>" + results.rows.item(i).foreName + "</td>";
//
//                  str += "<td class='text-success'>" + results.rows.item(i).appStatus + "</td>";
//
//                  str += "</tr>";
//                   if(document.getElementById("tblGrid") != null){
//                         document.getElementById("tblGrid").innerHTML += str;
//                     }
//                  str = '';
//                  onclick = (function(i) {return function() {
//     console.log(results.rows.item(i).applicationID);
// };})(i);
//         }
//              }


function loadButtonApp(len){
  console.log(len);
}
//create account form
function createAccount() {
  // This gets called whenever user submits the create account form
  // validate form first
  // if validation passes, save to db

  var firstName = $$('#firstName').text(),
    lastName = $$('#lastName').text(),
  userName = $$('#userName').text(),
    email = $$('#email').text(),
    password = $$('#password').text(),
    gender = $$('#gender').text(),
    dob = $$('#dob').text(),
    job = $$('#job').text();


  var userForm = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
    gender: gender,
    dob: dob,
    job: job
  };

  var errors = validateForm(userForm);

  if (errors.lebgth === 0) {
    // no errors
    var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
    db.transaction(function(db) {
      insertUser(db, userForm);
    }, insertUserError, insertUserSuccess);
  } else {
    // show errors to user
  }
}



function validateForm(userForm) {
  var errors = [];

  if (userForm.firstName === '') {
    // add first name error (must be supplied)
    errors.add('first name must be supplied')
  }

  if (userForm.lastName === '') {
    // add last name error (must be supplied)
    // $('#lastName').addClass('error');
    errors.add('last name must be supplied');
  }

  return errors;
}
