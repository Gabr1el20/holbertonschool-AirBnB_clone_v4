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

  const request = require('request');
  const url = 'http://0.0.0.0:5001/api/v1/status/';

  request.get(url, (data, textStatus) => {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
