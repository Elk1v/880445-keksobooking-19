'use strict';

(function () {
  var map = document.querySelector('.map');
  var pin = map.querySelector('.map__pin--main');
  var mapPinsArea = map.querySelector('.map__pins');

  pin.addEventListener('mousedown', function (evt) {
    window.util.isLeftClickEvent(evt, window.map.onPinActivateMode);
    console.log(evt.target);
  });

  pin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.onPinActivateMode);
  });

  map.addEventListener('click', function (evt) {
    window.map.onMapRenderCards(evt);
  });

  window.adFormSubmit.addEventListener('click', function () {
    window.form.onTitleValidation();
    window.form.onPriceValidation();
  });

  mapPinsArea.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.onMapRenderCards);
  });

  window.adFormRoomNumber.addEventListener('change', function () {
    window.form.onCapacityValidation();
  });

  window.adFormCapacity.addEventListener('change', function () {
    window.form.onCapacityValidation();
  });

  window.adFormTitle.addEventListener('invalid', function () {
    window.form.onTitleValidation();
  });

  window.adFormPrice.addEventListener('invalid', function () {
    window.form.onPriceValidation();
  });

  window.adFormType.addEventListener('change', function () {
    window.form.onAdFormTypeChange();
  });

  window.adFormTimein.addEventListener('change', function () {
    window.adFormTimeout.value = window.adFormTimein.value;
  });

  window.adFormTimeout.addEventListener('change', function () {
    window.adFormTimein.value = window.adFormTimeout.value;
  });

})();
