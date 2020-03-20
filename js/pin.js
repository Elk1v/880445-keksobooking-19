'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var create = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    pin.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';

    var avatar = pin.querySelector('img');
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;

    return pin;
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_BUTTON) {
      window.page.activate();
      window.backend.load(window.map.renderPins, window.backend.onErrorLoad);
    }
  };

  var onMainPinMove = function (evt) {
    var pinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: pinCoords.x - moveEvt.clientX,
        y: pinCoords.y - moveEvt.clientY
      };

      pinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (pinPosition.y < window.data.PinPositionY.MIN - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y) {
        pinPosition.y = window.data.PinPositionY.MIN - (window.data.PIN_HEIGHT - window.data.PIN_OFFSET_Y);
      } else if (pinPosition.y > window.data.PinPositionY.MAX - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y) {
        pinPosition.y = window.data.PinPositionY.MAX - window.data.PIN_HEIGHT + window.data.PIN_OFFSET_Y;
      } else if (pinPosition.x < -mainPin.offsetWidth / 2) {
        pinPosition.x = -mainPin.offsetWidth / 2;
      } else if (pinPosition.x > map.offsetWidth - mainPin.offsetWidth / 2) {
        pinPosition.x = map.offsetWidth - mainPin.offsetWidth / 2;
      }

      mainPin.style.top = pinPosition.y + 'px';
      mainPin.style.left = pinPosition.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddressFieldValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === window.data.Key.ENTER) {
      window.page.activate();
      window.backend.load(window.map.renderPins, window.backend.onErrorLoad);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('mousedown', onMainPinMove);
  mainPin.addEventListener('keydown', onMainPinEnterPress);

  window.pin = {
    create: create,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinClick: onMainPinClick
  };
})();
