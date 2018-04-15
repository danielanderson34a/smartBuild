$$(document).on('page:init', function(e) {
  var appId = parseInt(mainView.router.currentRoute.params.applicationID);
  console.log('APPLICATION: ' + appId);

  // select * from applications where id = appId;
  // this will bring back a single row
  // store the row in var currentApp;
  // i.e. var currentApp = results.rows.item(0);(after DB query)

  // this is temp, remove when query plugged in
  var currentApp = {
    foreName: 'Dan'
  };

  // insert text into html elements using HTML ids and jQuery
  $$('#app-forename').text(currentApp.foreName);

});
