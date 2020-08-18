'use strict';

(function () {
  var ADVERTS_NUM = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters');

  var removePins = function () {
    var shownPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    shownPins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  var removeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (card) {
      map.removeChild(card);
    });
  };

  var makeCard = function (pin, advert) {
    pin.addEventListener('click', function () {
      removeCards();
      window.card.render(advert);
    });
  };

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adverts.length && i < ADVERTS_NUM; i++) {
      var advert = adverts[i];

      var pin = window.pin.create(advert);
      makeCard(pin, advert);

      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);

    window.setTimeout(function () {
      mapFilter.style.display = 'flex';
    }, 200);
  };

  window.map = {
    ADVERTS_NUM: ADVERTS_NUM,
    renderPins: renderPins,
    removeCards: removeCards,
    removePins: removePins
  };
})();
