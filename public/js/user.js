$("document").ready(function(){
  console.log("loaded");

  // console.log(result);

  // stores token if exist in local storage
  var token = window.localStorage.getItem('jwt');
  // $('#createPoll').hide();
  // $('#createOption').hide();
  $('#myModal').hide();
  $('#createOption').hide();

  // $('#addOption').hide();
  $('#thumbnail').on('click', '.viewDropButton', getDropInfo);
  $('#thumbnail').on('click', '.editDropButton', showEditDrop);
  $('.viewPollButton').on('click', getOnePoll);
  $('#signOut').on('click', logOut);
  $('#anchorDropTab').on('click', function() {
    $('#thumbnail').show();
    $('#oneNail').empty();
    $('#polls').hide();
    $('#createOptionForm').hide();
  });
  $('#anchorPollTab').on('click', function() {
    $('#polls').show();
    $('#oneNail').empty()
    $('#createOptionForm').hide();
  });
  $('#anchorCreateTab').on('click', function() {
    $('#polls').hide();
    // $('#createOption').hide();
    // $('#createPoll').show()
  });

  $(document).on('click', '.joinDropButton', submitUserDrop);
  $(document).on('click', '.updateDropButton', updateDrop);
  $(document).on('click', '.voteButton', voteCount);




  $('#pollButton').on('click', getAllPolls);
  $('#dropButton').on('click', getAllDrops);

  // var pollForm = $('createPoll')
  // pollForm.remove()
  // pollForm.attr('value', jsonFromServer)

  // create poll form
  $('form#createPollForm').submit(function(event) {
    event.preventDefault();
    $('#createPoll').hide();
    $('#createOption').show();
    console.log('create option should show');

    var data = {pollCategory: $("#pollCategory").val()};
    // send an ajax POST request
    $.ajax({
      // url: "/polls?token=" + token,
      url: "/polls",
      method: "POST",
      data: data,
      headers: {authorization: 'Bearer ' + token},
    }).done(function(jsonFromServer){
      $('#pollId').attr('value', jsonFromServer.data.id)

    }).fail(function() {
      window.location = '/';
    });
  });

  // create option form
  $('form#createOptionForm').submit(function(event) {
    event.preventDefault();
    $('#createOption').hide();

    console.log("create option form submitted");

    var data = {pollId: $("#pollId").val(),
                imageUrl: $("#imageUrl").val(),
                pdtTitle: $("#pdtTitle").val(),
                pdtDescription: $("#pdtDescription").val(),
                pdtRetailPrice: $("#pdtRetailPrice").val(),
                pdtCode: $("#pdtCode").val()};
    // send an ajax POST request
    $.ajax({
      url: "/options",
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

  // create drop form
  $('form#createDropForm').submit(function(event) {
    event.preventDefault();

    console.log("drop form submitted");

    var data = {dropImageUrl: $("#dropImageUrl").val(),
                dropPdtCode: $("#dropPdtCode").val(),
                dropPdtDescription: $("#dropPdtDescription").val(),
                dropDiscPrice: $("#dropDiscPrice").val(),
                dropPdtCategory: $("#dropPdtCategory").val()};
    // send an ajax POST request
    $.ajax({
      url: "/drops",
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
      url: "/drops/" + dropID,
      method: "GET",
      headers: {authorization: 'Bearer ' + token},
    }).done(function(dataFromServer) {
      // console.log(dataFromServer);
      $('#oneNail').append(
        '<div class="card col-sm-4 offset-sm-4 col-md-4 offset-md-4">' +
          '<img class="card-img-top image" src="' + dataFromServer.drop.image_url + '">' +
          '<div class="card-block">' +
            '<h4 class="card-title font">' + dataFromServer.drop.product_category + '</h4>' +
            '<p class="card-text font">' + dataFromServer.drop.product_description + '</p>' +
            '<div class="col-md-4 offset-md-3">' +
              '<button type="button" class="btn btn-default joinDropButton font card-button" value="' + dataFromServer.drop.id + '" data-toggle="modal" data-target="#checkout">Join Drop</button>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<p style="text-align:center;">7days left!</p>' +
            '</div>' +
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
      url: "/joinDrop/" + dropID,
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
      url: "/polls",
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
      url: "/drops",
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
    $('#addOption').show();

    $.ajax({
      url: "/polls/" + pollID,
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

      // for (var i = 0; i < dataFromServer.length; i++) {
      //   $('#oneNail').append(
      //     '<div class="card card-outline-primary text-xs-center col-sm-4 col-md-4">' +
      //     '<img class="card-img-top image" src="' + dataFromServer[i].image_url + '" alt="Card image cap">' +
      //     '<div class="card-block">' +
      //     '<h4 class="card-title">' + dataFromServer[i].title + '</h4>' +
      //     '<button id="voteButton' + dataFromServer[i].id + '" type="button" class="btn btn-secondary voteButton" value="' + dataFromServer[i].id + '">Vote</button>' +
      //     '<input id="hiddenVote' + dataFromServer[i].id + '" type="hidden" value="' + dataFromServer[i].votes + '">' +
      //     '</div>' +
      //     '</div>'
      //   )
      // }

      $('#oneNail').append(
        '<div class="card col-sm-4 col-md-4 option-button">' +
          '<button type="button" class="btn btn-default card-button font" data-toggle="modal" data-target="#addOption' + dataFromServer[0].pollId + '" >ADD AN OPTION</button>' +
          // '<button id="addOptionButton" type="button" class="btn btn-secondary data-toggle="modal" data-target="#addOption">Add Option</button>' +
        '</div>'
      )



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
      url: "/options/" + optionID,
      method: "PUT",
      data: data,
      headers: {authorization: 'Bearer ' + token}
    }).done(function(dataFromServer) {
      console.log(dataFromServer);
      var updatedProgressValue = parseInt($('#'+progressOptionId).val()) + 1
      $('#'+progressOptionId).attr('value', updatedProgressValue)

      var updatedSpanValue = parseInt(document.getElementById(spanOptionId).textContent) + 1
      document.getElementById(spanOptionId).textContent = updatedSpanValue
    })
  }

  // get drop to edit
  function showEditDrop(event) {
    var dropID = event.currentTarget.value;
    $('#thumbnail').hide(); // hides all drops
    $('#oneNail').show()

    $.ajax({
      url: "/drops/" + dropID,
      method: "GET",
      headers: {authorization: 'Bearer ' + token},
    }).done(function(dataFromServer) {
      // console.log(dataFromServer);
      // dataFromServer.drop.product_discount_price
      $('#oneNail').append (
        '<div class="container">' +
          '<div class="col-md-4"></div>' +
          '<div class="col-md-4">' +
            '<div class="col-md-12">' +
              '<span class="tag tag-default">Image Url</span>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<input id="editImageUrl' + dataFromServer.drop.id + '" type="text" value="' + dataFromServer.drop.image_url + '">' +
            '</div>' +
            '<div class="col-md-12">' +
              '<span class="tag tag-default">Product Category</span>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<input id="editPdtCat' + dataFromServer.drop.id + '" type="text" value="' + dataFromServer.drop.product_category + '">' +
            '</div>' +
            '<div class="col-md-12">' +
              '<span class="tag tag-default">Product Code</span>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<input id="editPdtCode' + dataFromServer.drop.id + '" type="text" value="' + dataFromServer.drop.product_code + '">' +
            '</div>' +
            '<div class="col-md-12">' +
              '<span class="tag tag-default">Product Desription</span>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<textarea id="editPdtDescription' + dataFromServer.drop.id + '">' + dataFromServer.drop.product_description + '</textarea>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<span class="tag tag-default">Product Discount Price</span>' +
            '</div>' +
            '<div class="col-md-12">' +
              '<input id="editPdtDiscPrice' + dataFromServer.drop.id + '" type="text" value="' + dataFromServer.drop.product_discount_price + '">' +
            '</div>' +
            '<div class="col-md-12">' +
              '<button type="button" class="btn btn-secondary updateDropButton" value="' + dataFromServer.drop.id + '">Update</button>' +
            '</div>' +
          '</div>' +
          '<div class="col-md-4"></div>' +
        '</div>'
      )
    }).fail(function() {
      // console.log("failed to get drop from server");
    })
  }

  // update drop
  function updateDrop(event) {
    var dropID = event.currentTarget.value;
    var data = {editImageUrl: $('#editImageUrl' + dropID).val(),
                editPdtCat: $('#editPdtCat' + dropID).val(),
                editPdtCode: $('#editPdtCode' + dropID).val(),
                editPdtDescription: $('#editPdtDescription' + dropID).val(),
                editPdtDiscPrice: $('#editPdtDiscPrice' + dropID).val()
                }
    $.ajax({
      url: "/drops/" + dropID,
      method: "PUT",
      data: data,
      headers: {authorization: 'Bearer ' + token},
    }).done(function(jsonFromServer) {
      if (jsonFromServer.status) {
        window.location = '/home?token=' + token;
      }
    })
  }

  // sign out button
  function logOut() {
    window.localStorage.removeItem('jwt');
    // window.location = '/'
    console.log('did you go back to /?');
  }


  // stripe js components
  Stripe.setPublishableKey(process.env.PUBLIC_KEY);

  var $btn = $('#submit');
  $btn.on('click', function() {
      $btn.prop('disabled', true);
      $btn.button('progress');

      var cardNum = $('#card-num').val();
      var cardExp = $('#card-exp').val().split('/');
      var cardCVC = $('#card-cvc').val();

      // First submit the card information to Stripe to get back a token
      Stripe.card.createToken({
          number: cardNum,
          exp_month: cardExp[0],
          exp_year: cardExp[1],
          cvc: cardCVC
      }, function(status, response) {
          var $form = $('#form');
          var token = response.id;

          // Save the token into a hidden input field
          $form.append($('<input id="stripeToken" type="hidden" name="stripeToken" />').val(token));
          var data = $('#stripeToken').val()
          // Now submit the form to our server so it can make the charge against the token
          $form.get(0).submit(function() {
            $.ajax({
              url: "/charge",
              method: "POST",
              data: data,
              headers: {authorization: 'Bearer ' + token}
            }).done(function(jsonFromServer) {
              if (jsonFromServer.status) {
                console.log('hello stripe');
                window.location = '/home?token=' + token;
              }
            })
          });

          // All done!
          $btn.addClass('btn-success').removeClass('btn-primary');
          $btn.button('success');
          setTimeout(function() {
              $('#checkout').modal('hide');
          }, 250);
      });

      return false;
  });

}); // end of content loaded
