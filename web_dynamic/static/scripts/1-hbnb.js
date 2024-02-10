$(document).ready(() => {
  let amenities = {};
  $('div.popover ul li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('div.amenities h4').text(Object.values(amenities).join(', '));
  });
});
