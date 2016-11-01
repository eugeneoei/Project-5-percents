$("document").ready(function(){
  console.log("loaded");

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');
  $('#createPoll').hide();
  $('#createOption').hide();

  // var pollForm = $('createPoll')
  // pollForm.remove()
  // pollForm.attr('value', jsonFromServer)

  // create poll form
  $('form#createPollForm').submit(function(event) {
    event.preventDefault();

    var data = {pollCategory: $("#pollCategory").val()};
    // send an ajax POST request
    $.ajax({
      // url: "http://localhost:3000/polls?token=" + token,
      url: "http://localhost:3000/polls?token=",
      method: "POST",
      data: data,
      headers: {authorization: 'Bearer ' + token},
    }).done(function(jsonFromServer){
      $('#createPoll').hide();
      $('#createOption').show();
      $('#pollId').attr('value', jsonFromServer.data.id)

    }).fail(function() {
      window.location = '/';
    });
  });

  // create option form
  // $(document).on('submit', 'form#createOptionForm', function(event) {

  $('form#createOptionForm').submit(function(event) {
    event.preventDefault();

    console.log("create option form submitted");

    var data = {pollId: $("#pollId").val(),
                imageUrl: $("#imageUrl").val(),
                pdttDescription: $("#pdtDescription").val(),
                pdtRetailPrice: $("#pdtRetailPrice").val(),
                pdtCode: $("#pdtCode").val()};
    // send an ajax POST request
    $.ajax({
      url: "http://localhost:3000/options",
      method: "POST",
      headers: {authorization: 'Bearer ' + token},
      data: data
    }).done(function(jsonFromServer){
      if (jsonFromServer.status) {
        window.location = '/user?token=' + token;
      }
    }).fail(function() {
      window.location = '/';
    });
  });



});
