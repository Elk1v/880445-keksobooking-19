'use strict';

(function () {
  var main = document.querySelector('main');
  var map = main.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters');
  var advertForm = main.querySelector('.ad-form');
  var formFields = advertForm.querySelectorAll('fieldset');
  var priceField = advertForm.querySelector('#price');
  var addressField = advertForm.querySelector('#address');
  var checkinField = advertForm.querySelector('#timein');
  var checkoutField = advertForm.querySelector('#timeout');
  var roomsField = advertForm.querySelector('#room_number');
  var capacityField = advertForm.querySelector('#capacity');
  var capacities = capacityField.querySelectorAll('option');
  var typeField = advertForm.querySelector('#type');
  var notice = main.querySelector('.notice');
  var resetFormBtn = advertForm.querySelector('.ad-form__reset');
  var avatarChooser = advertForm.querySelector('.ad-form-header__input');
  var avatar = advertForm.querySelector('.ad-form-header__preview img');
  var houseImageChooser = advertForm.querySelector('.ad-form__input');
  var houseImageContainer = advertForm.querySelector('.ad-form__photo');

  var updatePriceField = function () {
    priceField.setAttribute('min', window.data.MinPrice[typeField.value.toUpperCase()]);
    priceField.setAttribute('placeholder', window.data.MinPrice[typeField.value.toUpperCase()]);
  };

  var onTypeInputChange = function () {
    updatePriceField();
  };

  var makeFieldsDisabled = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  var updateCapacities = function (selectedRooms) {
    var suitableCapacities = window.data.Room[selectedRooms];
    capacities.forEach(function (capacity) {
      capacity.disabled = !suitableCapacities.includes(parseInt(capacity.value, 10));
    });
  };

  var syncRoomsAndCapacities = function () {
    updateCapacities(roomsField.value);
    capacityField.value = window.data.Room[roomsField.value][0];
  };

  var onRoomFieldChange = function () {
    syncRoomsAndCapacities();
  };

  var setAddressFieldValue = function () {
    addressField.value = (mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetTop + mainPin.offsetHeight + window.data.PIN_ELEMENT_HEIGHT - window.data.PIN_OFFSET_Y);
  };

  var onResetFormBtnClick = function (evt) {
    evt.preventDefault();

    window.page.reset();
    updatePriceField();
    resetFormBtn.removeEventListener('click', onResetFormBtnClick);
    setAddressFieldValue();
  };

  var onAvatarChooserChange = function () {
    window.images.load(avatarChooser, avatar);
  };

  var onHouseImageChooserChange = function () {
    var housePreview = window.images.createPreview();
    houseImageContainer.appendChild(housePreview);

    window.images.load(houseImageChooser, housePreview);
  };

  var activate = function () {
    advertForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    priceField.setAttribute('placeholder', window.data.MinPrice[typeField.value.toUpperCase()]);
    setAddressFieldValue();

    syncRoomsAndCapacities();

    resetFormBtn.addEventListener('click', onResetFormBtnClick);
    avatarChooser.addEventListener('change', onAvatarChooserChange);
    houseImageChooser.addEventListener('change', onHouseImageChooserChange);
  };

  var onSuccessLoad = function () {
    window.page.reset();
    updatePriceField();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    main.insertBefore(successMessage, notice);

    var onEmptyAriaClick = function () {
      successMessage.remove();
      document.removeEventListener('click', onEmptyAriaClick);
      document.removeEventListener('keydown', onEscapeKeyPress);
    };

    var onEscapeKeyPress = function (evt) {
      if (evt.key === window.data.Key.ESC) {
        successMessage.remove();
        document.removeEventListener('keydown', onEscapeKeyPress);
        document.removeEventListener('click', onEmptyAriaClick);
      }
    };

    document.addEventListener('click', onEmptyAriaClick);
    document.addEventListener('keydown', onEscapeKeyPress);
  };

  makeFieldsDisabled(formFields);
  updatePriceField();
  setAddressFieldValue();

  mapFilter.style.display = 'none';

  typeField.addEventListener('change', onTypeInputChange);
  roomsField.addEventListener('change', onRoomFieldChange);
  checkinField.addEventListener('change', function () {
    checkoutField.value = checkinField.value;
  });
  checkoutField.addEventListener('change', function () {
    checkinField.value = checkoutField.value;
  });
  advertForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(advertForm), onSuccessLoad, window.backend.onErrorUpload);
  });

  window.form = {
    activate: activate,
    setAddressFieldValue: setAddressFieldValue,
    makeFieldsDisabled: makeFieldsDisabled
  };
})();
