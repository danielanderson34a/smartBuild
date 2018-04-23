$$(document).on('page:init', function (e) {
  $$("#login").click(function() {
    var userName = $$("#loginUser").val();
    var password = $$("#loginPassword").val();

    var loginForm = {
      userName: userName,
      password: password

    };
    // Checking for blank fields.
    if (userName == '' || password == '') {
      app.dialog.alert("Please fill all fields!");
    } else {
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      db.transaction(function(db) {
        checkCredentials(db, loginForm);
      }, loginSuccess);
console.log('test1');
    }
  });
  function checkCredentials(db, loginForm) {
    console.log('didnt get');
    var query = 'SELECT * FROM USER WHERE userName = "' + loginForm.userName + '" AND password = "' + loginForm.password + '"';
    db.executeSql(query, [], doesUserExist);
    console.log('got user');
  }
  function doesUserExist(tx, results) {
    console.log(results);
    console.log(results.rows);


    if (results.rows.length === 0) {
      app.dialog.alert('Invalid credentials');
    } else {
      console.log('success');
      test = true;
      console.log('new test' + test);
      window.sessionStorage.user = JSON.stringify(results.rows.item(0));

       // window.location.href = 'home.html';
       // window.location.replace("home.html");
       // mainView.router.load(options.URL);
       // myApp.router.findElement('#home');
       app.router.navigate('/home/');
       // console.log(JSON.parse(window.sessionStorage.user).id + ' user obj');
       if (appStatus == true) {
         app.dialog.alert('Application Approved');
         appStatus = false;
       }
    }
  }
  function loginSuccess(db, results) {
    console.log('query executed');
    // console.log(db);
    // console.log(results);
    // console.log('hello');
    // if (results.rows.length === 0) {
    //   alert("credentials do not exist")
    //   // fail the login
    // } else {
    // window.location.href = 'home.html'
    //   // var currentUser = results.rows[0];
    // }
  }



});
