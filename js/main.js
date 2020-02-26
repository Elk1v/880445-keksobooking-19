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

var map = document.querySelector('.map');

var mapPinsArea = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomArr = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
      type: OFFER_TYPE[getRandomArr(OFFER_TYPE)],
      rooms: guestsNumber === 0 ? 100 : Math.floor(Math.random() * 3) + guestsNumber,
      guests: guestsNumber,
      checkin: OFFER_CHECKS[getRandomArr(OFFER_CHECKS)],
      checkout: OFFER_CHECKS[getRandomArr(OFFER_CHECKS)],
      eatures: OFFER_FEATURES[indexOffer],
      description: OFFER_DESCRIPTION[indexOffer],
      photos: OFFER_PHOTOS[Math.floor(Math.random() * OFFER_PHOTOS.length)]

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
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsInfo.length; i++) {
    fragment.appendChild(renderPin(pinsInfo[i]));
  }

  return fragment;
};

var offersArr = createOffers(TOTAL_OFFERS);

map.classList.remove('map--faded'); // временное решение.

mapPinsArea.appendChild(renderPins(offersArr));

