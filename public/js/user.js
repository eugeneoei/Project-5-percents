$("document").ready(function(){
  console.log("loaded");

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');
  $('#createPoll').hide();
  $('#createOption').hide();
  $('#myModal').hide();
  $('#thumbnail').on('click', '.viewDropButton', getDropInfo);
  $('#pollButton').on('click', getAllPolls);
  $('#dropButton').on('click', getAllDrops)
  $(document).on('click', '.joinDropButton', submitUserDrop);



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
      url: "http://localhost:3000/polls",
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

    // console.log("create option form submitted");

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
      // console.log(dataFromServer);
      $('#oneNail').append(
        '<div class="card col-sm-4 offset-sm-4 col-md-4 offset-md-4">' +
          '<img class="card-img-top image" src="' + dataFromServer.drop.image_url + '">' +
          '<div class="card-block">' +
            '<h4 class="card-title">' + dataFromServer.drop.product_category + '</h4>' +
            '<p class="card-text">' + dataFromServer.drop.product_description + '</p>' +
            '<button type="button" class="btn btn-default joinDropButton" value="' + dataFromServer.drop.id + '" data-toggle="modal" data-target="#myModal">Join Drop</button>' +
            '<p>7days left!</p>' +
          '</div>' +
        '</div>'
      )
    }).fail(function() {
      // console.log("failed to get drop from server");
    })
  }

  // event handler for submiting drop
  function submitUserDrop(event) {
    $('#myModal').show();
    // console.log('join drop button clicked');
    var dropID = event.currentTarget.value;
    $.ajax({
      url: "http://localhost:3000/joinDrop/" + dropID,
      method: "POST",
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      // console.log('join returned from server');
      // console.log(dataFromServer);
      $('#oneNail').hide()
      // THIS IS NOT DONE BY THE WAY!!!!!!
      // show form for payment
      // show modal
    }).fail(function() {
      // console.log('join drop failed');
    });
  }

  // event handler for getting all polls
  function getAllPolls(event) {
    console.log('poll button clicked');

    $.ajax({
      url: "http://localhost:3000/polls",
      method: "GET",
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      console.log('all polls including options returned from server');
      console.log(dataFromServer);
      // $('#oneNail').hide()
      $('#allPolls').append(

      )

      // <div class="row">
      //   <div class="col-md-4">
      //     <div class="col-md-12">
      //       <div class="col-md-6">
      //         here is where the name of the category of product is and where
      //       </div>
      //       <label for="">posted by which user</label>
      //     </div>
      //     <div class="col-md-12">
      //       this is where image of most voted product should appear
      //     </div>
      //   </div>
      //   <div class="col-md-8">
      //     <div class="col-md-12">
      //       top voted option here
      //     </div>
      //     <div class="col-md-12">
      //       second voted option here
      //     </div>
      //     <div class="col-md-12">
      //       third voted option here
      //     </div>
      //   </div>
      // </div>

    }).fail(function() {
      console.log('failed to get poll');
    });
  }

  // event handler for all drops
  function getAllDrops(event) {
    console.log('drop button clicked');
    $.ajax({
      url: "http://localhost:3000/drops",
      method: "GET",
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      console.log('returned all drop from server');
      console.log(dataFromServer);

    }).fail(function() {
      console.log('failed to get all drops');
    });
  }

}); // end of content loaded
