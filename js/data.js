'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;

  var PIN_HEIGHT = 78;
  var PIN_ELEMENT_HEIGHT = 13;
  var PIN_OFFSET_Y = 60;

  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var Key = {
    ENTER: 'Enter',
    ESC: 'Escape'
  };

  var PinPositionY = {
    MIN: 130,
    MAX: 630
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var HouseType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var Room = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var MainPinDefaultPosition = {
    TOP: '375px',
    LEFT: '570px'
  };

  var HousePreviewElement = {
    HOUSE_ELEMENT_TYPE: 'img',
    HOUSE_ELEMENT_ALT: 'Изображение жилья',
    HOUSE_ELEMENT_WIDTH: '70px',
    HOUSE_ELEMENT_HEIGHT: '70px'
  };

  window.data = {
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_ELEMENT_HEIGHT: PIN_ELEMENT_HEIGHT,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    FILE_TYPES: FILE_TYPES,
    DEFAULT_AVATAR_IMG: DEFAULT_AVATAR_IMG,
    Key: Key,
    PinPositionY: PinPositionY,
    MinPrice: MinPrice,
    HouseType: HouseType,
    Room: Room,
    MainPinDefaultPosition: MainPinDefaultPosition,
    HousePreviewElement: HousePreviewElement
  };
})();
