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

function querySelectNotes(tx) {

  var currentID = JSON.parse(window.sessionStorage.user).id;


  tx.executeSql("SELECT * FROM NOTES WHERE userID = '" + currentID + "'", [], querySelectNotesSuccess, deleteNote);


}
// display all notes for one user
function querySelectNotesSuccess(db, results) {

  var len = results.rows.length,
    i;

  var str = '';

  for (i = 0; i < len; i++) {

    str += "<ul>";

    str += "<li class='swipeout'>" + "<div class='item-content swipeout-content'>Title:" + "&nbsp;" + "&nbsp;"  + results.rows.item(i).noteTitle  + "</br>Description:" + "&nbsp;" + "&nbsp;" + results.rows.item(i).noteDescription + "</br>Date:"+ "&nbsp;" + "&nbsp;"  + results.rows.item(i).noteDate + "</div>" + "<div class='swipeout-actions-right'>"
        + "<a onclick='deleteNote(" + results.rows.item(i).noteID + ")' href='#' class='swipeout-delete'>Delete</a>" +
      "</div>" + "</li>" + "<hr>";

    str += "</ul>";
    if (document.getElementById("tblNotes") != null) {
      document.getElementById("tblNotes").innerHTML += str;
    }
    str = '';

  }
}

function deleteNote(noteID) {
  console.log('DELETE NOTE: ' + noteID);

  var db = window.openDatabase('SmartBuildDB', '1.0', 'Smart Build Database', 200000);

  db.transaction(function(tx) {
    removeNote(tx, noteID);
  });
   // tx.executeSql('DELETE FROM NOTES WHERE noteID = "' + noteID + '"' , [], queryDeleteNotesSuccess);

  // delete from notes where noteID = noteid;
}

function removeNote(tx, noteID) {
  console.log('removing note ' + noteID);
  tx.executeSql(`DELETE FROM NOTES WHERE noteID = ${noteID}`);
}

function queryDeleteNotesSuccess(){

}
