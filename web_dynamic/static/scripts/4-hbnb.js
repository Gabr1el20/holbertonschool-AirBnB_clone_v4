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
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    method: 'POST',
    data: '{}',
    contentType: 'application/json',
    success: (data) => {
      $('section.places').append(data.map(place => {
        return `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest}</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
                </div>
        </article>`;
      })
      );
    }
  });
  $('button').click(function () {
    const amenities = { amenities: Object.keys(amenityArr) };
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      method: 'POST',
      data: JSON.stringify(amenities),
      contentType: 'application/json',
      success: (data) => {
        $('section.places').empty();
        $('section.places').append(data.map(place => {
          return `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest}</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
                  </div>
          </article>`;
        })
        );
      }
    });
  });
});
