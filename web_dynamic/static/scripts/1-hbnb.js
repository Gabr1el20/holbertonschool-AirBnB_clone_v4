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
});
