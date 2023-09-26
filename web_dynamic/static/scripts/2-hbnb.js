$(document).ready(function () {
  const amenityArr = {};
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      console.log('Checkbox marcado!');
      amenityArr[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      console.log('Checkbox desmarcado');
      delete amenityArr[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityArr).join(', '));
  });
  $.get('http://localhost:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    }
    else {
      $('div#api_status').removeClass('available');
    }
  });
});