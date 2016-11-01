$("document").ready(function(){
  console.log("loaded");

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');

  // var pollForm = $('createPoll')
  // pollForm.remove()
  // pollForm.attr('value', jsonFromServer)
  // create poll form
  $('form#createPollForm').submit(function(event) {
    event.preventDefault();

    console.log("create poll form submitted");

    var data = {pollCategory: $("#pollCategory").val()};
    // send an ajax POST request
    $.ajax({
      // url: "http://localhost:3000/polls?token=" + token,
      url: "http://localhost:3000/polls?token=",
      method: "POST",
      data: data,
      headers: {authorization: 'Bearer ' + token},
    }).done(function(jsonFromServer){
      console.log(jsonFromServer);
      $('#createPoll').remove()
      $('body').append(
        '<div id="createOption">' +
          '<form id="createOptionForm">' +
            '<input id="pollId" type="hidden" name="pollId" value="' + jsonFromServer.data.id + '">' +
            '<input id="imageUrl" type="text" name="imageUrl" placeholder="Share an Image">' +
            '<textarea id="pdtDescription" name="pdttDescription" placeholder="Tell us more about this product!"></textarea>' +
            '<input id="pdtRetailPrice" type="text" name="pdtRetailPrice" placeholder="Product\'s current retail price">' +
            '<input id="pdtCode" type="text" name="pdtCode" placeholder="Product code">' +
            '<button type="submit">Create!</button>' +
          '</form>' +
        '</div>'
      )
      console.log('poll created successfully');

    }).fail(function() {
      console.log("failed to create poll");
      window.location = '/';
    });
  });

  // create option form
  $(document).on('submit', 'form#createOptionForm', function(event) {

  // $('form#createOptionForm').submit(function(event) {
    event.preventDefault();

    console.log("create option form submitted");

    var data = {pollId: $("#pollId").val(),
                imageUrl: $("#imageUrl").val(),
                pdttDescription: $("#pdtDescription").val(),
                pdtRetailPrice: $("#pdtRetailPrice").val(),
                pdtCode: $("#pdtCode").val()};
    // send an ajax POST request
    // var headerToken = 'Bearer ' + token
    $.ajax({
      // url: "http://localhost:3000/options?token=" + token,
      url: "http://localhost:3000/options",
      method: "POST",
      headers: {authorization: 'Bearer ' + token},
      data: data
    }).done(function(jsonFromServer){
      console.log(jsonFromServer);
      if (jsonFromServer.status) {
        window.location = '/user?token=' + token;
      }
      console.log('option created successfully');
    }).fail(function() {
      console.log("failed to create poll");
      window.location = '/';
    });
  });



});
