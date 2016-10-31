$("document").ready(function(){
  console.log("loaded");

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');

  // signup form
  $('form#signup').submit(function(event) {
    event.preventDefault();


    console.log("signup form submitted");

    var data = {firstName: $("#signupFirstName").val(),
                lasttName: $("#signupLastName").val(),
                email: $("#signupEmail").val(),
                password: $("#signupPassword").val()};
    // send an ajax POST request
    $.ajax({
      url: "http://localhost:3000/signup",
      method: "POST",
      data: data
    }).done(function(jsonFromServer){
      console.log('signup successfully');
      console.log(jsonFromServer);
      if (jsonFromServer.status) {
        window.localStorage.setItem('jwt', jsonFromServer.token);
        window.location = '/user?token=' + jsonFromServer.token;
        // window.location = '/user?token=';
      }
      else {
        window.location = '/';
      }
    }).fail(function() {
      console.log("failed to signup");
      window.location = '/';
    });
  });

  // login form
  $('form#login').submit(function(event) {
    event.preventDefault();


    console.log("log in form submitted");

    var data = {email: $("#loginEmail").val(),
                password: $("#loginPassword").val()};
    // send an ajax POST request
    $.ajax({
      url: "http://localhost:3000/login",
      method: "POST",
      data: data
    }).done(function(jsonFromServer){
      console.log('login successfully');
      console.log(jsonFromServer);
      if (jsonFromServer.status) {
        window.localStorage.setItem('jwt', jsonFromServer.token);
        window.location = '/user?token=' + jsonFromServer.token;
        // window.location = '/user?token=';
      }
      else {
        window.location = '/';
      }
    }).fail(function() {
      console.log("failed to login");
      window.location = '/';
    });
  });




});
