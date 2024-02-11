$(document).ready(() => {
  const host = 'http://' + window.location.hostname;
  
  $.get(host + ':5001/api/v1/status/', function (response) {
    // console.log(response);
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  let states = {};
  $('div.popover > ul > li > h2 > input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete states[$(this).attr('data-id')];
    }
    const locations = Object.assign({}, states, cities);
    if (Object.values(locations).length === 0) {
      $('div.locations h4').html('&nbsp;');
    } else {
      $('div.locations h4').text(Object.values(locations).join(', '));
    }
  });
  
  let cities = {};
  $('div.popover > ul > li > ul > li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cities[$(this).attr('data-id')];
    }
    const locations = Object.assign({}, states, cities);
    if (Object.values(locations).length === 0) {
      $('div.locations h4').html('&nbsp;');
    } else {
      $('div.locations h4').text(Object.values(locations).join(', '));
    }
  });
  
  let amenities = {};
  $('div.amenities input[type="checkbox"]').change(function () {
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

  const append_json_data = (data) => {
    $('section.places').empty();
    $('section.places').append(data.map(place => {
      return `<article>
                <div class="title_box">
		  <h2>${ place.name }</h2>
		  <div class="price_by_night"> $${ place.price_by_night }</div>
		</div>
		<div class="information">
		  <div class="max_guest"> ${ place.max_guest > 1 ? `${place.max_guest} Guests` : `${place.max_guest} Guest`} </div>
		  <div class="number_rooms"> ${ place.number_rooms > 1 ? `${place.number_rooms} Bedrooms` : `${place.number_rooms} Bedroom` } </div>
		  <div class="number_bathrooms"> ${ place.number_bathrooms > 1 ? `${place.number_bathrooms} Bathrooms` : `${place.number_bathrooms} Bathroom` } </div>
		</div>
		<div class="description">
		  ${ place.description }
		</div>
	      </article>`;
    }));
  }


  $.ajax({
    url: host + ':5001/api/v1/places_search/',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}',
    success: append_json_data,
    error: function(xhr, status, error) {
      console.error(xhr, status, error);
    }
  });
    
  $('button').click(function () {
    /* console.log(JSON.stringify({
        'states': Object.keys(states),
        'cities': Object.keys(cities),
        'amenities': Object.keys(amenities)
      })); */
    $.ajax({
      url: host + ':5001/api/v1/places_search/',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        'states': Object.keys(states),
        'cities': Object.keys(cities),
        'amenities': Object.keys(amenities)
      }),
      success: append_json_data,
      error: function(xhr, status, error) {
        console.error(xhr, status, error);
      }
    });
  });

});
