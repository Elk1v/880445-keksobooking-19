'use strict';

(function () {

  var VERTICAL_SHARP_END = 30;
  var HORIZONTAL_SHARP_END = 25;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pin = map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinAddress = adForm.querySelector('#address');

  var renderPin = function (pinInfo) {

    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = pinInfo.location.x + 'px';
    pinElement.style.top = pinInfo.location.y + 'px';
    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;
    return pinElement;

  };

  var renderPins = function (pinsInfo) {

    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < pinsInfo.length; i++) {
      pinsFragment.appendChild(renderPin(pinsInfo[i]));
    }

    return pinsFragment;

  };

  window.pins = {

    getPinAddress: function (pinDisabled) {

      var pinElement = pin.cloneNode(true);
      var pinAddressXCoordinate;
      var pinAddressYCoordinate;

      if (pinDisabled) {
        pinAddressXCoordinate = parseInt(pinElement.style.left, 10);
        pinAddressYCoordinate = parseInt(pinElement.style.top, 10);
      } else {
        pinAddressXCoordinate = HORIZONTAL_SHARP_END + parseInt(pinElement.style.left, 10);
        pinAddressYCoordinate = VERTICAL_SHARP_END + parseInt(pinElement.style.top, 10);
      }

      pinAddress.value = pinAddressXCoordinate + ', ' + pinAddressYCoordinate;

      return pinAddress.value;

    },
  };

  window.renderedPins = renderPins(window.offersArr);

})();
