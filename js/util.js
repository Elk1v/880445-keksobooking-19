'use strict';

(function () {
  var ENTER_KEY = 13;
  var LEFT_BUTTON = 0;
  var ESC_KEY = 27;
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');

  window.util = {
    getRandomArr: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomBetween: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keycode === ESC_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keycode === ENTER_KEY) {
        action();
      }
    },

    isLeftClickEvent: function (evt, action) {
      if (evt.keycode === LEFT_BUTTON) {
        action();
      }
    },

    setFormEnabled: function (enabled) {
      if (!enabled) {
        adForm.classList.add('ad-form--disabled');
      } else {
        adForm.classList.remove('ad-form--disabled');
      }

      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = !enabled;
      }

    }

  };

})();
