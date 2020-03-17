'use strict';

(function () {


  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinAddress = adForm.querySelector('#address');
  var mapFiltersContainer = map.querySelector('map__filters-container');
  var mapPinsArea = map.querySelector('.map__pins');


  var onMapRenderCard = function (offerIndex) {

    map.insertBefore(window.renderCard(window.offersArr[offerIndex]), mapFiltersContainer);

    map.querySelector('.popup__close').addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscapeClose);

  };

  var compareOfferAlt = function (target) {
    var offerTitles = window.OFFER_TITLE;

    for (var i = 0; i < offerTitles.length; i++) {

      if (target === offerTitles[i]) {
        onMapRenderCard(i);
      }
    }
  };

  var onPopupClose = function () {
    var currentPopup = map.querySelector('.map__card');

    if (currentPopup) {
      currentPopup.querySelector('.popup__close').removeEventListener('click', onPopupClose);
      window.removeEventListener('keydown', onPopupEscapeClose);
      currentPopup.remove();
    }
  };

  var onPopupEscapeClose = function (evt) {
    window.util.isEscEvent(evt, onPopupClose);
  };

  window.util.setFormEnabled(false);
  window.pins.getPinAddress(true);
  pinAddress.readOnly = true;

  window.map = {
    onMapRenderCards: function (evt) {

      if (evt.target && evt.target.parentNode.matches('.map__pin:not(.map__pin--main')) {
        onPopupClose();
        compareOfferAlt(evt.target.alt);
      }

    },

    onPinActivateMode: function () {

      map.classList.remove('map--faded');
      mapPinsArea.appendChild(window.renderedPins);
      window.pins.getPinAddress(false);
      window.util.setFormEnabled(true);

    }

  };

})();
