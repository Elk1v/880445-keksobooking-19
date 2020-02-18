'use strict';

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
var OFFER_ADDRESS = [
  '600, 450',
  '200, 140',
  '90, 230',
  '560, 220',
  '800, 600',
  '560, 100',
  '230, 700',
  '310 920'
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

var OFFER_FEATURES = ['wifi',
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
  'Should be the bes offer!'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var ROOMS_NUMBER = [
  3,
  5,
  1,
  8,
  2,
  1,
  1,
  4
];
var GUESTS_NUMBER = [
  2,
  5,
  1,
  7,
  1,
  1,
  1,
  3
];


var TOTAL_OFFERS = 8;

var MAX_X = document.querySelector('.map').offsetWidth;
var MIN_X = 70;

var map = document.querySelector('.map');
var mapPinsArea = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createOffer = function (indexOffer) {
  var createdOffer = {

    author: {
      avatar: 'img/avatars/user0' + indexOffer + '.png'
    },

    offer: {
      title: OFFER_TITLE[indexOffer],
      address: OFFER_ADDRESS[indexOffer],
      price: OFFER_PRICE[indexOffer],
      type: OFFER_TYPE[getRandomArr(OFFER_TYPE)],
      rooms: ROOMS_NUMBER[indexOffer],
      guests: GUESTS_NUMBER[indexOffer],
      checkin: OFFER_CHECKS[getRandomArr(OFFER_CHECKS)],
      checkout: OFFER_CHECKS[getRandomArr(OFFER_CHECKS)],
      eatures: OFFER_FEATURES[indexOffer],
      description: OFFER_DESCRIPTION[indexOffer],
      photos: OFFER_PHOTOS[Math.floor(Math.random() * OFFER_PHOTOS.length)]

    },

    location: {
      x: getRandomBetween(MIN_X, MAX_X),
      y: getRandomBetween(130, 630)
    }
  };

  return createdOffer;
};

createOffer(1);

var getRandomArr = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createOffers = function (totalOffers) {
  var sortedArr = [];

  for (var i = 0; i < totalOffers; i++) {
    sortedArr [i] = createOffer(i);
  }
};


map.classList.remove('map--faded');

var renderPin = function (pinInfo) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pinInfo.location.x + 'px';
  pinElement.style.top = pinInfo.location.y + 'px';
  pinElement.querySelector('img').src = pinInfo.author.avatar;
  pinElement.querySelector('img').alt = pinInfo.offer.title;

  return pinElement;
};

var renderPins = function (pinsInfo) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < TOTAL_OFFERS; i++) {
    fragment.appendChild(renderPin(pinsInfo[i]));
  }

  return fragment;
};

var offersArr = createOffers(TOTAL_OFFERS);
mapPinsArea.appendChild(renderPins(offersArr));
