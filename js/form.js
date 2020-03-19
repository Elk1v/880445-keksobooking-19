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

  var onTypeInputChange = function (evt) {
    priceField.setAttribute('min', window.data.MinPrice[evt.target.value]);
    priceField.setAttribute('placeholder', window.data.MinPrice[evt.target.value]);
  };

  var makeFieldsDisabled = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  var checkRooms = function (options, roomIndex) {
    if (roomIndex === 0) {
      options[3].disabled = false;
    } else {
      for (var i = roomIndex; i > 0; i--) {
        options.forEach(function (capacity) {
          capacity.disabled = parseInt(capacity.value, 10) !== i;
        });
      }
    }
  };

  var onRoomFieldChange = function (evt) {
    makeFieldsDisabled(capacities);

    checkRooms(capacities, window.data.Room[evt.target.value]);

    capacityField.value = window.data.Room[evt.target.value];
  };

  var changeAddressField = function () {
    addressField.value = (mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2)) + ', ' + (mainPin.offsetTop + mainPin.offsetHeight + window.data.PIN_ELEMENT_HEIGHT - window.data.PIN_OFFSET_Y);
  };

  var onResetFormBtnClick = function () {
    window.page.reset();
    resetFormBtn.removeEventListener('click', onResetFormBtnClick);
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

    capacityField.value = roomsField.value;
    makeFieldsDisabled(capacities);
    checkRooms(capacities, parseInt(roomsField.value, 10));

    priceField.setAttribute('placeholder', window.data.MinPrice[typeField.value]);
    changeAddressField();

    resetFormBtn.addEventListener('click', onResetFormBtnClick);
    avatarChooser.addEventListener('change', onAvatarChooserChange);
    houseImageChooser.addEventListener('change', onHouseImageChooserChange);
  };

  typeField.addEventListener('change', onTypeInputChange);

  makeFieldsDisabled(formFields);

  mapFilter.style.display = 'none';

  roomsField.addEventListener('change', onRoomFieldChange);

  checkinField.addEventListener('change', function () {
    checkoutField.value = checkinField.value;
  });

  checkoutField.addEventListener('change', function () {
    checkinField.value = checkoutField.value;
  });

  var onSuccessLoad = function () {
    window.page.reset();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    main.insertBefore(successMessage, notice);

    var onEmptyAriaClick = function () {
      successMessage.remove();
      document.removeEventListener('click', onEmptyAriaClick);
      document.removeEventListener('keydown', onEscapeKeyPress);
    };

    var onEscapeKeyPress = function (evt) {
      if (evt.key === window.data.Keys.ESC) {
        successMessage.remove();
        document.removeEventListener('keydown', onEscapeKeyPress);
        document.removeEventListener('click', onEmptyAriaClick);
      }
    };
    document.addEventListener('click', onEmptyAriaClick);
    document.addEventListener('keydown', onEscapeKeyPress);
  };

  advertForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(advertForm), onSuccessLoad, window.backend.onErrorUpload);
    evt.preventDefault();
  });

  window.form = {
    activate: activate,
    changeAddressField: changeAddressField,
    makeFieldsDisabled: makeFieldsDisabled
  };
})();
