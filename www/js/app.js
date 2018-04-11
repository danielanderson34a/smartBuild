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
      plans text,
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
    firstName varchar(255),
    lastName varchar(255),
    userName varchar(255),
    email varchar(255),
    password varchar(25),
    gender varchar(255),
    dob,
    job varchar(255)
  )`);
}

function initTables(tx) {
	initAppTable(tx);
	initUserTable(tx);
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

// creating Application table


// create form




$$(document).on('pageInit', function(e) {
    // Get page data from event data
    $.getScript("js/register.js");
    $.getScript("js/login.js");

  })
  // $$(document).on('pageInit', '.page[data-page="form"]', function (e) {
  //     // Following code will be executed for page with data-page attribute equal to "about"
  //     app.alert('Here comes About page');
  // })
