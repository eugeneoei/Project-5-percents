$("document").ready(function(){
  console.log("loaded");

  $('#signup').hide();
  $('#login').hide();


  $('#log-in-div').on('click', function() {
    $('#login').show();
    $('.authButtons').hide();
  })

  $('#sign-up-div').on('click', function() {
    $('#signup').show();
    $('.authButtons').hide();
  })

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
        console.log('did you appear?');
        window.localStorage.setItem('jwt', jsonFromServer.token);
        window.location = '/home?token=' + jsonFromServer.token;
        // window.location = '/home?token=';
        // $.ajax({
        //   url: "http://localhost:3000/home",
        //   method: "POST",
        //   headers: {authorization: 'Bearer ' + jsonFromServer.token},
        // })

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
      console.log(jsonFromServer.token);
      if (jsonFromServer.status) {
        console.log('did you appear?');
        window.localStorage.setItem('jwt', jsonFromServer.token);
        window.location = '/home?token=' + jsonFromServer.token;
        console.log('did you appear again?');
        // window.location = '/home?token=';
        // $.ajax({
        //   url: "http://localhost:3000/home",
        //   method: "POST",
        //   headers: {authorization: 'Bearer ' + jsonFromServer.token}
        // })
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
