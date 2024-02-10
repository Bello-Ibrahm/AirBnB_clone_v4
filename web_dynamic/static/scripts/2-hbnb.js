$(document).ready(() => {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  
  $.get(url, function (response) {
    console.log(response);
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  let amenities = {};
  $('div.popover ul li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenities).join(', '));
    }
  });
});

/*
$.ajax({
    url: url,
    method: 'GET',
    dataType, 'json',
    success: function(res) {
      if (res.status == 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
      
      let amenities = {};
      $('div.popover ul li input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
          amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
          delete amenities[$(this).attr('data-id')];
        }
        if (Object.values(amenities).length === 0) {
          $('div.amenities h4').html('&nbsp;');
        } else {
          $('div.amenities h4').text(Object.values(amenities).join(', '));
        }
      });  
    },
    error: function(xhr, status, error) {
      console.error(xhr, status, error);
    }
  });
*/
