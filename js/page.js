'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var formFields = advertForm.querySelectorAll('fieldset');
  var avatarChooser = advertForm.querySelector('.ad-form-header__input');
  var avatar = advertForm.querySelector('.ad-form-header__preview img');
  var houseImageChooser = advertForm.querySelector('.ad-form__input');
  var houseImgContainer = advertForm.querySelector('.ad-form__photo');

  var activate = function () {
    map.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    mainPin.removeEventListener('mousedown', window.pin.onMainPinClick);
    mainPin.removeEventListener('keydown', window.pin.onMainPinEnterPress);
    window.form.activate();
  };

  var reset = function () {
    mapFilter.reset();
    advertForm.reset();
    window.form.makeFieldsDisabled(formFields);
    advertForm.classList.add('ad-form--disabled');

    window.map.removePins();
    window.map.removeCards();
    map.classList.add('map--faded');
    mainPin.style.top = window.data.MainPinDefaultPosition.TOP;
    mainPin.style.left = window.data.MainPinDefaultPosition.LEFT;
    mainPin.addEventListener('mousedown', window.pin.onMainPinClick);
    mainPin.addEventListener('keydown', window.pin.onMainPinEnterPress);

    mapFilter.style.display = 'none';

    avatar.src = window.data.DEFAULT_AVATAR_IMG;

    if (houseImgContainer.childNodes.length) {
      houseImgContainer.querySelectorAll(window.data.HousePreviewElement.HOUSE_ELEMENT_TYPE).forEach(function (it) {
        houseImgContainer.removeChild(it);
      });
    }
    window.form.setAddressFieldValue();

    avatarChooser.removeEventListener('change', window.images.onAvatarChooserChange);

    houseImageChooser.removeEventListener('change', window.images.onHouseImageChooser);
  };

  window.page = {
    activate: activate,
    reset: reset
  };
})();
