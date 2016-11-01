$("document").ready(function(){
  console.log("loaded");

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');
  $('#createPoll').hide();
  $('#createOption').hide();
  $('#thumbnail').on('click', '.viewDropButton', getDropInfo);
  $(document).on('click', '.joinDropButton', submitUserDrop)
  // $('#oneNail').hide();


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

  // event handler for view drop button
  function getDropInfo(event) {
    var dropID = event.currentTarget.value;
    $('#thumbnail').hide(); // hides all drops

    $.ajax({
      url: "http://localhost:3000/drops/" + dropID,
      method: "GET",
      headers: {authorization: 'Bearer ' + token},
    }).done(function(dataFromServer) {
      console.log(dataFromServer);
      $('#oneNail').append(
        '<div class="col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">' +
          '<div class="thumbnail">' +
            '<img src="' + dataFromServer.drop.image_url + '">' +
            '<div class="caption">' +
              '<h3>' + dataFromServer.drop.product_category + '</h3>' +
              '<p>' + dataFromServer.drop.product_description + '</p>' +
              '<p>' +
                '<button type="button" class="btn btn-default joinDropButton" value="' + dataFromServer.drop.id + '">Join Drop</button>' +
                '<p>7days left!</p>' +
              '</p>' +
            '</div>' +
          '</div>' +
        '</div>'
      )
    }).fail(function() {
      console.log("failed to get drop from server");
    })
  }

  // event handler for submiting drop
  function submitUserDrop(event) {
    var dropID = event.currentTarget.value;
    $.ajax({
      url: "http://localhost:3000/joinDrop/" + dropID,
      method: "POST",
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      // show modal
    }).fail(function() {
      console.log('join drop failed');
    });
  }
}); // end of content loaded
