$$(document).on('page:init', function (e) {
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

    }
     else {
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
      app.dialog.alert('Invalid User');
    } else {
      console.log('success');
      test = true;
      console.log('new test' + test);
      window.sessionStorage.user = JSON.stringify(results.rows.item(0));

       app.router.navigate('/home/');


    }
  }

  function loginSuccess(db, results) {
    console.log('query executed');
  }



});
