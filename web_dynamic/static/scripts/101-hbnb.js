$(document).ready(function () {
  const amenityArr = {};
  const stateArr = {};
  const cityArr = {};
  $('input:checkbox').click(function () {
    if ($(this).hasClass('am_')) {
      if ($(this).is(':checked')) {
        amenityArr[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenityArr[$(this).attr('data-id')];
      }
      $('.amenities h4').text(Object.values(amenityArr).join(', '));
    } else if ($(this).hasClass('st_')) {
      if ($(this).is(':checked')) {
        stateArr[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete stateArr[$(this).attr('data-id')];
      }
      $('.locations h4').text(Object.values(stateArr).join(', '));
    } else if ($(this).hasClass('city_')) {
      if ($(this).is(':checked')) {
        cityArr[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete cityArr[$(this).attr('data-id')];
      }
      $('.locations h4').text(Object.values(cityArr).join(', '));
    }
  });
  $.get('http://localhost:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
$('button').click(function () {
  const queryOfObjects = { 
    amenities: Object.keys(amenityArr),
    states: Object.keys(stateArr),
    cities: Object.keys(cityArr)
  };
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    method: 'POST',
    data: JSON.stringify(queryOfObjects),
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
