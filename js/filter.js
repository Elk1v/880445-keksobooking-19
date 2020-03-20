'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var houseTypeField = mapFilter.querySelector('#housing-type');
  var housePriceField = mapFilter.querySelector('#housing-price');
  var houseRoomsField = mapFilter.querySelector('#housing-rooms');
  var houseGuestsField = mapFilter.querySelector('#housing-guests');
  var houseFeatures = mapFilter.querySelectorAll('.map__checkbox');

  var filterByType = function (advert) {
    return houseTypeField.value === 'any' ? true : houseTypeField.value === advert.offer.type;
  };

  var filterByPrice = function (advert) {
    var housePrice = housePriceField.value;

    if (housePrice === 'any') {
      return true;
    } else if (housePrice === 'middle') {
      return advert.offer.price < 50000 && advert.offer.price >= 10000;
    } else if (housePrice === 'low') {
      return advert.offer.price < 10000;
    } else if (housePrice === 'high') {
      return advert.offer.price > 50000;
    }
    return false;
  };

  var filterByRooms = function (advert) {
    return houseRoomsField.value === 'any' ? true : parseInt(houseRoomsField.value, 10) === advert.offer.rooms;
  };

  var filterByGuests = function (advert) {
    return houseGuestsField.value === 'any' ? true : parseInt(houseGuestsField.value, 10) === advert.offer.guests;
  };

  var getSelectedFeatures = function () {
    return Array.from(mapFilter.querySelectorAll('.map__checkbox:checked')).map(function (it) {
      return it.value;
    });
  };

  var filterByFeatures = function (advert) {
    return getSelectedFeatures().every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };

  var filterAdverts = function (adverts) {
    var filtered = [];

    for (var i = 0; i < adverts.length && filtered.length < window.map.ADVERTS_NUM; i++) {
      var advert = adverts[i];

      if (filterByType(advert)
          && filterByPrice(advert)
          && filterByRooms(advert)
          && filterByGuests(advert)
          && filterByFeatures(advert)) {
        filtered.push(advert);
      }
    }

    window.map.renderPins(filtered);
  };

  var onFiltersChange = function () {
    window.debounce(function () {
      window.map.removeCards();
      window.backend.load(filterAdverts, window.backend.onErrorLoad);
      window.map.removePins();
    });
  };

  houseTypeField.addEventListener('change', onFiltersChange);
  housePriceField.addEventListener('change', onFiltersChange);
  houseRoomsField.addEventListener('change', onFiltersChange);
  houseGuestsField.addEventListener('change', onFiltersChange);
  houseFeatures.forEach(function (item) {
    item.addEventListener('change', onFiltersChange);
  });
})();
