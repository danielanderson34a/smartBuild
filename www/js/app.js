// Dom7
var $$ = Dom7;
var booked = false;

function determineView() {
  var user = JSON.parse(window.sessionStorage.user);


  if (user.job === 'Construction') {
    $$('.bc').hide();
    $$('.con').show();
  } else {
    $$('.bc').show();
    $$('.con').hide();
  }
}

function determineViews() {
  if (booked == true) {
    $$('.showTable').show();
  } else {
    $$('.showTable').hide();
  }
}

var test = false;
var fetch = false;
var appStatus = false;

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
      }
    };
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
    },
    {
      path: '/random/',
      url: './pages/random.html',
    },
    {
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
      path: '/applications/:applicationID',
      url: './pages/application.html',
    },
    {
      path: '/inspection/:applicationID',
      url: './pages/inspection.html',
    },
    {
      path: '/bcApplications/',
      url: './pages/bcApplications.html',
    },
    {
      path: '/viewInspec/',
      url: './pages/viewInspec.html',
    },
    {
      path: '/viewPdf/',
      url: './pages/viewPdf.html',
    },
    {
      path: '/viewNotes/',
      url: './pages/viewNotes.html',
    },
    {
      path: '/createNotes/',
      url: './pages/createNotes.html',
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

}



// on page load
$$(document).on('page:init', function(e) {


  // opening Database
  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
  db.transaction(initTables);
  // db.transaction(initApplication);



});

// create application table
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
      inspecDate text,
      inspectionStatus text
    )`);
}

// create note user table
function initUserTable(tx) {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS USER (
    id integer primary key autoincrement,
    firstName text,
    lastName text,
    userName text,
    email text,
    password text,
    gender text,
    job text
  )`);

}
// create note table
function initNoteTable(tx) {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS NOTES (
    noteID integer primary key,
    userID text,
    noteTitle text,
    noteDescription text,
    noteDate text

  )`);

}


// execute each function
function initTables(tx) {
  initAppTable(tx);
  initUserTable(tx);
  initNoteTable(tx);
  queryDB(tx);
  deleteNote(tx);
  if (test == true) {
    querySelectDB(tx);
    querySelectNotes(tx);
    querySelectInspec(tx);
  }


}
