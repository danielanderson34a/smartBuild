$$(document).on('page:init', function(e) {

  $$("#register").click(function() {
    console.log("info");
    var firstName = $$('#firstName').val();
    var lastName = $$('#lastName').val();
    var userName = $$('#userName').val();
    var email = $$('#email').val();
    var password = $$('#password').val();
    var cpassword = $$('#cpassword').val();
    var gender = $$('#gender').val();
    var job = $$('#job').val();

    var userForm = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      gender: gender,
      job: job
    };

    console.log(userForm);

     if (firstName == '') {
      app.dialog.alert("Please Fill In First Name Field!");

    } else if (lastName == '') {
      app.dialog.alert("Please Fill In Last Name Field!");

    } else if (userName == '') {
      app.dialog.alert("Please Fill In Username Field!");

    }else if ( email == '') {
      app.dialog.alert("Please Fill In Email Field!");

    } else if (password == '') {
      app.dialog.alert("Please Fill In Password Field!");

    } else if (cpassword == '') {
      app.dialog.alert("Please Fill In Confirm Password Field!");

    } else if ((password.length) < 6) {
      app.dialog.alert("Password should be at least 6 characters!");
    } else if (!(password == cpassword)) {
      app.dialog.alert("Your passwords don't match. Try again?")
    } else {
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      console.log(db);
      db.transaction(function(db) {
        insertUser(db, userForm);
      }, insertUserError, function() {
        insertUserSuccess(userForm);
      });
    }
  });

  function insertUser(db, userForm) {
    console.log('insertUser');
    var query = 'INSERT INTO USER ( firstName, lastName, userName, email, password, gender, job) VALUES ("' + userForm.firstName + '", "' + userForm.lastName + '", "' + userForm.userName + '", "' + userForm.email + '", "' + userForm.password + '", "' + userForm.gender + '",  "' + userForm.job + '")';
    db.executeSql(query, [], getuserid);
  }

  function getuserid(tx, results) {
    console.log('insert');
    console.log(results.insertId);
  }

  function insertUserError(error) {
    console.log(error);
    window.alert(error);
  }

  function insertUserSuccess(userForm) {
    console.log('sucess');
    app.dialog.alert("user Registered");

    var routeToNavigateTo = '/login/';

    app.router.navigate(routeToNavigateTo);

  }
});
