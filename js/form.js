'use strict';

(function () {
  var MIN_LENGTH = 'тридцати (30)';
  var MAX_LENGTH = 'сотни (100)';
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 0;

  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormType = adForm.querySelector('#type');
  var adFormTimein = adForm.querySelector('#timein');
  var adFormTimeout = adForm.querySelector('#timeout');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  window.form = {
    onTitleValidation: function () {

      if (adFormTitle.validity.tooLong) {

        adFormTitle.setCustomValidity('Заголовок не должен быть длиннее ' + MAX_LENGTH + ' символов');

      } else if (adFormTitle.validity.tooShort) {

        adFormTitle.setCustomValidity('Заголовок не должен быть короче ' + MIN_LENGTH + ' символов');

      } else if (adFormTitle.validity.valueMissing) {

        adFormTitle.setCustomValidity('Введите пожалуйста заголовок вашего объявления');

      } else {

        adFormTitle.setCustomValidity('');

      }

    },

    onPriceValidation: function () {

      if (adFormPrice.validity.rangeOverflow) {

        adFormPrice.setCustomValidity('Максимально допустимая цена за ночь это ' + MAX_PRICE + ' рублей');

      } else if (adFormPrice.validity.rangeUnderflow) {

        adFormPrice.setCustomValidity('Минимально допустимая цена за ночь это ' + MIN_PRICE + ' рублей');

      } else if (adFormPrice.validity.valueMissing) {

        adFormPrice.setCustomValidity('Введите пожалуйста цену за ночь');

      } else if (adFormPrice.validity.badInput) {

        adFormPrice.setCustomValidity('Укажите пожалуйста цену в цифрах');

      } else {

        adFormPrice.setCustomValidity('');

      }

    },

    onCapacityValidation: function () {

      if (adFormRoomNumber.value === '1' && adFormCapacity.value !== '1') {

        adFormCapacity.setCustomValidity('Одна комната отлично подойдёт для одного гостя');

      } else if (adFormRoomNumber.value === '2' && (adFormCapacity.value !== '1' && adFormCapacity.value !== '2')) {

        adFormCapacity.setCustomValidity('Две комнаты подойдут для двоих или одного гостей ');

      } else if (adFormRoomNumber.value === '3' && adFormCapacity.value === '0') {

        adFormCapacity.setCustomValidity('Три комнаты подойдут  для троих гостей, двух или для одного гостей');

      } else if (adFormRoomNumber.value === '100' && adFormCapacity.value !== '0') {

        adFormCapacity.setCustomValidity('Сотня комнат — не для гостей');

      } else {

        adFormCapacity.setCustomValidity('');

      }

    },

    onAdFormTypeChange: function () {

      switch (adFormType.value) {

        case 'bungalo':
          adFormPrice.min = 0;
          adFormPrice.placeholder = 'Мин. 0руб.';
          break;

        case 'flat':
          adFormPrice.min = 1000;
          adFormPrice.placeholder = 'Мин. 1000руб.';
          break;

        case 'house':
          adFormPrice.min = 5000;
          adFormPrice.placeholder = 'Мин. 5000руб.';
          break;

        case 'palace':
          adFormPrice.min = 10000;
          adFormPrice.placeholder = 'Мин. 10000руб.';
          break;
      }

    }
  };


  window.adFormTitle = adFormTitle;
  window.adFormPrice = adFormPrice;
  window.adFormRoomNumber = adFormRoomNumber;
  window.adFormCapacity = adFormCapacity;
  window.adFormType = adFormType;
  window.adFormTimein = adFormTimein;
  window.adFormTimeout = adFormTimeout;
  window.adFormSubmit = adFormSubmit;
})();
