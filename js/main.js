'use strict';

var TOTAL_OFFERS = 8;

var OFFER_TITLE = [
  'Кондоминиум',
  'Квартира целиком',
  'Койка в хостеле',
  'Лофт',
  'Номер в отеле',
  'Отедльная комната',
  'Капсульная комната',
  'Бунгало'
];

var OFFER_PRICE = [
  700,
  1200,
  400,
  1100,
  900,
  500,
  450,
  950
];

var OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFER_CHECKS = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_DESCRIPTION = [
  'An excelent decision to make',
  'Enjoy your trip with us',
  'Our appartment waits for you',
  'We hope to see you',
  'You will make an optimum decision',
  'Free hugs and cookies!',
  'Extremely rear',
  'Should be the best offer!'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OFFER_LOCATION = {
  X: {
    MIN: 70,
    MAX: 1070,
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};

var PIN_SIZE = {
  width: 40,
  height: 40
};

var VERTICAL_SHARP_END = 30;

var HORIZONTAL_SHARP_END = 25;

var ENTER_KEY = 'Enter';

var LEFT_BUTTON = 0;

var ESC_KEY = 'Escape';

var MIN_LENGTH = 'тридцати (30)';

var MAX_LENGTH = 'сотни (100)';

var MAX_PRICE = 1000000;

var MIN_PRICE = 0;

var map = document.querySelector('.map');

var pin = map.querySelector('.map__pin--main');

var mapFiltersContainer = map.querySelector('map__filters-container');

var mapPinsArea = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var cardPhotoTemplate = cardTemplate.querySelector('.popup__photo');

var adForm = document.querySelector('.ad-form');

var fieldsets = adForm.querySelectorAll('fieldset');

var pinAddress = adForm.querySelector('#address');

var adFormAvatar = adForm.querySelector('#avatar');

var adFormTitle = adForm.querySelector('#title');

var adFormPrice = adForm.querySelector('#price');

var adFormRoomNumber = adForm.querySelector('#room_number');

var adFormCapacity = adForm.querySelector('#capacity');

var adFormType = adForm.querySelector('#type');

var adFormTimein = adForm.querySelector('#timein');

var adFormTimeout = adForm.querySelector('#timeout');

var adFormSubmit = adForm.querySelector('.ad-form__submit');

var getRandomArr = function (array) {

  return array[Math.floor(Math.random() * array.length)];

};

var getRandomBetween = function (min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

function shuffleArray(array) {

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

}

var createOffer = function (indexOffer) {

  var guestsNumber = Math.floor(Math.random() * 3);

  var address = {
    x: getRandomBetween(OFFER_LOCATION.X.MIN, OFFER_LOCATION.X.MAX),
    y: getRandomBetween(OFFER_LOCATION.Y.MIN, OFFER_LOCATION.Y.MAX)
  };

  return {

    author: {
      avatar: 'img/avatars/user0' + (indexOffer === 0 ? 1 : indexOffer + 1) + '.png'
    },

    offer: {
      title: OFFER_TITLE[indexOffer],
      address: address.x + ', ' + address.y,
      price: OFFER_PRICE[indexOffer],
      type: getRandomArr(OFFER_TYPE),
      rooms: guestsNumber === 0 ? 100 : Math.floor(Math.random() * 3) + guestsNumber,
      guests: guestsNumber,
      checkin: getRandomArr(OFFER_CHECKS),
      checkout: getRandomArr(OFFER_CHECKS),
      features: OFFER_FEATURES.sort(() => Math.random() - 0.5),
      description: OFFER_DESCRIPTION[indexOffer],
      photos: OFFER_PHOTOS.sort(() => Math.random() - 0.5)

    },

    location: {
      x: address.x - PIN_SIZE.width / 2,
      y: address.y - PIN_SIZE.height
    }
  };

};

var createOffers = function (totalOffers) {

  var sortedArr = [];

  for (var i = 0; i < totalOffers; i++) {
    sortedArr[i] = createOffer(i);
  }

  return sortedArr;

};

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
    pinsFragment .appendChild(renderPin(pinsInfo[i]));
  }

  return pinsFragment;

};

var renderPhoto = function (photoSrc) {

  var photoElement = cardPhotoTemplate.cloneNode(true);

  photoElement.src = photoSrc;

  return photoElement;

};

var renderPhotos = function (photosInfo) {

  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < photosInfo.offer.photos.length; i++) {
    photosFragment.appendChild(renderPhoto(photosInfo.offer.photos[i]));
  }

  return photosFragment;

};

var renderFeature = function (offerFeature) {

  var createdFeature = document.createElement('li');

  createdFeature.className = 'popup__feature popup__feature--' + offerFeature;

  return createdFeature;

};

var renderFeatures = function (featuresInfo) {

  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < featuresInfo.offer.features.length; i++) {
    featuresFragment.appendChild(renderFeature(featuresInfo.offer.features[i]));
  }

  return featuresFragment;

};

var renderCard = function (cardInfo) {

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = cardInfo.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardInfo.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardInfo.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = cardInfo.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(cardInfo));
  cardElement.querySelector('.popup__description').textContent = cardInfo.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(renderPhotos(cardInfo));
  cardElement.querySelector('.popup__avatar').src = cardInfo.author.avatar;

  return cardElement;

};
 
var setFormEnabled = function (enabled) {

  if (!enabled) {

    adForm.classList.add('ad-form--disabled');

  } else {

    adForm.classList.remove('ad-form--disabled');

  }

  for (var i = 0; i < fieldsets.length; i++) {

    fieldsets[i].disabled = !enabled;

  }

};

var offersArr = createOffers(TOTAL_OFFERS);

var getPinAddress = function (pinDisabled) {

  var pinElement = pin.cloneNode(true);
  var pinAddressXCoordinate;
  var pinAddressYCoordinate;

  if (pinDisabled) {

    pinAddressXCoordinate = parseInt(pinElement.style.left);
    pinAddressYCoordinate = parseInt(pinElement.style.top)

  } else {

    pinAddressXCoordinate = HORIZONTAL_SHARP_END + parseInt(pinElement.style.left, 10);
    pinAddressYCoordinate = VERTICAL_SHARP_END + parseInt(pinElement.style.top, 10);

  }

  return pinAddress.value =  pinAddressXCoordinate + ', ' + pinAddressYCoordinate;

};

var onPinActivateMode = function () {
  
  map.classList.remove('map--faded');
  mapPinsArea.appendChild(renderPins(offersArr));
  getPinAddress(false);
  setFormEnabled(true);

};

var onPopupClose = function () {
  var currentPopup = map.querySelector('.map__card');

  if (currentPopup) {
    currentPopup.querySelector('.popup__close').removeEventListener('click', onPopupClose);
    window.removeEventListener('keydown', onPopupEscapeClose);
    currentPopup.remove();
  }
};

var onPopupEscapeClose = function(evt) {

  if (evt.key === ESC_KEY) {
    onPopupClose();
  }

}

var onMapRenderCard = function (offerIndex) {

  map.insertBefore(renderCard(offersArr[offerIndex]), mapFiltersContainer);

  map.querySelector('.popup__close').addEventListener('click', onPopupClose);

  document.addEventListener('keydown', onPopupEscapeClose);

};

var compareOfferAlt = function(target) {

  for(var i = 0; i < OFFER_TITLE.length; i++) {

    if(target === OFFER_TITLE[i]) {

      onMapRenderCard(i);
      
    }
  
  }

};

var onMapRenderCards = function(evt) {

  if (evt.target && evt.target.parentNode.matches('.map__pin:not(.map__pin--main')) {

    onPopupClose();
    compareOfferAlt(evt.target.alt);
    console.log(evt.target)
    
  }

};

var onTitleValidation = function () {

  if (adFormTitle.validity.tooLong) {

    adFormTitle.setCustomValidity('Заголовок не должен быть длиннее ' + MAX_LENGTH + ' символов');

  }

  else if (adFormTitle.validity.tooShort) {

    adFormTitle.setCustomValidity('Заголовок не должен быть короче ' + MIN_LENGTH + ' символов');

  }

  else if (adFormTitle.validity.valueMissing) {

    adFormTitle.setCustomValidity('Введите пожалуйста заголовок вашего объявления');

  } else {

    adFormTitle.setCustomValidity('');

  }

};

var onPriceValidation = function () {

  if (adFormPrice.validity.rangeOverflow) {

    adFormPrice.setCustomValidity('Максимально допустимая цена за ночь это ' + MAX_PRICE + ' рублей');

  }

  else if (adFormPrice.validity.rangeUnderflow) {

    adFormPrice.setCustomValidity('Минимально допустимая цена за ночь это ' + MIN_PRICE + ' рублей');

  }

  else if (adFormPrice.validity.valueMissing) {

    adFormPrice.setCustomValidity('Введите пожалуйста цену за ночь');

  }

  else if (adFormPrice.validity.badInput) {

    adFormPrice.setCustomValidity('Укажите пожалуйста цену в цифрах');

  } else {

    adFormPrice.setCustomValidity('');

  }

};

var onCapacityValidation =  function () {

  if (adFormRoomNumber.value === '1' && adFormCapacity.value !== '1') {

    adFormCapacity.setCustomValidity('Одна комната отлично подойдёт для одного гостя');

  }
  
  else if (adFormRoomNumber.value === '2' && (adFormCapacity.value !== '1' && adFormCapacity.value !== '2')) {

    adFormCapacity.setCustomValidity('Две комнаты подойдут для двоих или одного гостей ');

  }
  
  else if (adFormRoomNumber.value === '3' && adFormCapacity.value === '0') {

    adFormCapacity.setCustomValidity('Три комнаты подойдут  для троих гостей, двух или для одного гостей');

  } 
    
  else if (adFormRoomNumber.value === '100' && adFormCapacity.value !== '0') {

    adFormCapacity.setCustomValidity('Сотня комнат — не для гостей');

  } else {

    adFormCapacity.setCustomValidity('');

  }

};

var onAdFormTypeChange = function () {

  switch(adFormType.value) {

    case 'bungalo':
      adFormPrice.min = 0;
      adFormPrice.placeholder = 'Мин. 0руб.'
      break;

    case 'flat':
      adFormPrice.min = 1000;
      adFormPrice.placeholder = 'Мин. 1000руб.'
      break;
    
    case 'house':
      adFormPrice.min = 5000;
      adFormPrice.placeholder = 'Мин. 5000руб.'
      break;

    case 'palace':
      adFormPrice.min = 10000;
      adFormPrice.placeholder = 'Мин. 10000руб.'
      break;
  }

};

setFormEnabled(false);
getPinAddress(true);

pinAddress.readOnly = true;

pin.addEventListener('mousedown', function (evt) {

  if (evt.button === LEFT_BUTTON) {
    onPinActivateMode();
    console.log(evt.target);
  }
  
});

pin.addEventListener('keydown', function (evt) {

  if (evt.key === ENTER_KEY) {
    onPinActivateMode();
  }

});

map.addEventListener('click', function (evt) {
  onMapRenderCards(evt);
});

adFormSubmit.addEventListener('click', function () {
  onTitleValidation();
  onPriceValidation();
});

mapPinsArea.addEventListener('keydown', function (evt) {

  if (evt.key === ENTER_KEY) {
    onMapRenderCards(evt);
  }

});

adFormRoomNumber.addEventListener('change', function () {
  onCapacityValidation();
});

adFormCapacity.addEventListener('change', function() {
  onCapacityValidation();
});

adFormTitle.addEventListener('invalid', function () {
  onTitleValidation();
});

adFormPrice.addEventListener('invalid', function () { 
  onPriceValidation();
});

adFormType.addEventListener('change', function () {
  onAdFormTypeChange();
});

adFormTimein.addEventListener('change', function () {
  adFormTimeout.value = adFormTimein.value;
});

adFormTimeout.addEventListener('change', function () {
  adFormTimein.value = adFormTimeout.value;
});