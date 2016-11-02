$("document").ready(function(){
  console.log("loaded");

  // console.log(result);

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');
  // $('#createPoll').hide();
  $('#createOption').hide();
  $('#myModal').hide();
  $('#thumbnail').on('click', '.viewDropButton', getDropInfo);
  $('.viewPollButton').on('click', getOnePoll);
  $('#anchorDropTab').on('click', function() {
    $('#thumbnail').show();
    $('#oneNail').empty()
  });
  $('#anchorPollTab').on('click', function() {
    $('#polls').show();
    $('#oneNail').empty()
  });

  $(document).on('click', '.joinDropButton', submitUserDrop);
  $(document).on('click', '.voteButton', voteCount);




  $('#pollButton').on('click', getAllPolls);
  $('#dropButton').on('click', getAllDrops);

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
                pdtTitle: $("#pdtTitle").val(),
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
        window.location = '/home?token=' + token;
      }
    }).fail(function() {
      window.location = '/';
    });
  });

  // event handler for view drop button
  function getDropInfo(event) {
    var dropID = event.currentTarget.value;
    $('#thumbnail').hide(); // hides all drops
    $('#oneNail').show()


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
      // $('#oneNail').hide()
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
      // this route is working. just need to append it in

    }).fail(function() {
      console.log('failed to get all drops');
    });
  }

  // event handler for one poll
  function getOnePoll(event) {
    console.log('view all options button click');
    var pollID = event.currentTarget.value;
    $('#polls').hide();

    $.ajax({
      url: "http://localhost:3000/polls/" + pollID,
      method: "GET",
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      console.log(dataFromServer);


      for (var i = 0; i < dataFromServer.length; i++) {
        $('#oneNail').append(

          '<div class="card col-sm-4 col-md-4">' +
            '<img class="card-img-top image" src="' + dataFromServer[i].image_url + '" alt="Card image cap">' +
            '<div class="card-block">' +
              '<h4 class="card-title">' + dataFromServer[i].title + '</h4>' +
              '<button id="voteButton' + dataFromServer[i].id + '" type="button" class="btn btn-secondary voteButton" value="' + dataFromServer[i].id + '">Vote</button>' +
              '<input id="hiddenVote' + dataFromServer[i].id + '" type="hidden" value="' + dataFromServer[i].votes + '">' +
            '</div>' +
          '</div>'
        )
      }

    }).fail(function() {
      // console.log('join drop failed');
    });
  }

  // event handler for vote button
  function voteCount(event) {
    console.log('view all options button click');
    var hiddenVoteID = 'hiddenVote' + event.currentTarget.value
    var buttonID = 'voteButton' + event.currentTarget.value
    var optionID = event.currentTarget.value;
    var progressOptionId = 'progressOptionId' + event.currentTarget.value
    var spanOptionId = 'spanOptionId' + event.currentTarget.value
    var data = {votes: $("#" + hiddenVoteID).val()}
    document.getElementById(buttonID).textContent = 'Voted!'
    // send an ajax request and update vote count in database
    $.ajax({
      url: "http://localhost:3000/options/" + optionID,
      method: "PUT",
      data: data,
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      console.log(dataFromServer);
      var updatedProgressValue = parseInt($('#'+progressOptionId).val()) + 1
      $('#'+progressOptionId).attr('value', updatedProgressValue)

// document.getElementById(spanOptionId).textContent
      var updatedSpanValue = parseInt(document.getElementById(spanOptionId).textContent) + 1
      document.getElementById(spanOptionId).textContent = updatedSpanValue
    })
  }

}); // end of content loaded
