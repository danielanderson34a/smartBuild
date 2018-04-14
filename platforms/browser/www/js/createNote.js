$$(document).on('page:init', function (e) {

    $$("#createNote").click(function() {
var noteTitle = $$('#noteTitle').val();
var  noteDescription = $$('#noteDescription').val();
var  noteDate = $$('#noteDate').val();


var noteForm = {
  userID: JSON.parse(window.sessionStorage.user).id,
  noteTitle: noteTitle,
  noteDescription: noteDescription,
  noteDate: noteDate,

};

    console.log(noteForm);

    if (noteTitle == '') {
      app.dialog.alert("Please Fill In Title");
    } else if (noteDescription == ''){
      app.dialog.alert("Please Fill In Description");

    } else if (noteDate == ''){
      app.dialog.alert("Please Fill In Date");

    } else {
      var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);
      console.log(db);
      db.transaction(function(db) {
        insertNote(db, noteForm);
      }, insertNoteError, function() {
        insertNoteSuccess(noteForm);
      });
    }
  });



  function insertNote(db, noteForm) {
    var query = 'INSERT INTO NOTES ( userID, noteTitle, noteDescription, noteDate ) VALUES ("' + noteForm.userID + '", "' + noteForm.noteTitle + '", "' + noteForm.noteDescription + '", "' + noteForm.noteDate + '")';
    var results = ('SELECT * FROM NOTES');
    db.executeSql(query);
    db.executeSql(results);
    console.log(results + 'checked');

  }



  function insertNoteError(error) {
console.log(error);
    window.alert(error);
  }

  function insertNoteSuccess(noteForm) {
    console.log('note sucess');
    app.dialog.alert("Note Created");
    var routeToNavigateTo = '/home/';

    app.router.navigate(routeToNavigateTo);


  }





});