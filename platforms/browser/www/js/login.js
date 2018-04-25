$$(document).on('page:init', function(e) {
  //gets field inputs on click
  $$("#login").click(function() {
    var userName = $$("#loginUser").val();
    var password = $$("#loginPassword").val();

    var loginForm = {
      userName: userName,
      password: password

    };
    // Checking for blank fields.
    if (userName == '') {
      app.dialog.alert("Please Fill In Username!");
    } else if (password == '') {
      app.dialog.alert("Please Fill In Password!");

    } else {
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      db.transaction(function(db) {
        checkCredentials(db, loginForm);
      }, loginSuccess);
    }
  });
//checing Credentials
  function checkCredentials(db, loginForm) {
    var query = 'SELECT * FROM USER WHERE userName = "' + loginForm.userName + '" AND password = "' + loginForm.password + '"';
    db.executeSql(query, [], doesUserExist);
  }

  function doesUserExist(tx, results) {

//if zero user doesnt exist
    if (results.rows.length === 0) {
      app.dialog.alert('Invalid User');
    } else {
      test = true;
      window.sessionStorage.user = JSON.stringify(results.rows.item(0));

      app.router.navigate('/home/');


    }
  }

  function loginSuccess(db, results) {
  }



});
