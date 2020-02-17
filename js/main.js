'use strict';

var AUTHOR_AVATAR = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08'
];

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

var TOTAL_OFFERS = 8;

var POSITION_X = document.querySelector('.map').offsetWidth;

var makeOffers = function (indexOffer) {
  var createdOffer = {

    author: {
      avatar: 'img/avatars/user' + AUTHOR_AVATAR[i] + '.png'
    },

    offer: {
      title: OFFER_TITLE[indexOffer],
      address: OFFER_ADDRESS[indexOffer],
      price: OFFER_PRICE[indexOffer],
      type: OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPE.length)],
      rooms: Math.floor(Math.random() * 4) + 1,
      guests: Math.floor(Math.random() * 10) + 1,
      checkin: OFFER_CHECKS[Math.floor(Math.random() * OFFER_CHECKS.length)],
      checkout: OFFER_CHECKS[Math.floor(Math.random() * OFFER_CHECKS.length)],
      eatures: OFFER_FEATURES[indexOffer],
      description: OFFER_DESCRIPTION[indexOffer],
      photos: OFFER_PHOTOS[Math.floor(Math.random() * OFFER_PHOTOS.length)]

    },

    location: {
      x: Math.floor(Math.random() * POSITION_X + 1),
      y: Math.floor(Math.random() * (630 - 130 + 1)) + 130 // Range between min(130) and max (630)
    }
  };
    // eslint-disable-next-line no-console
  return createdOffer;
};

makeOffers(1);

var sortOffer = function (notSortedOffer) {
  var sortedArr = [];

  for (var i = 0; i < TOTAL_OFFERS; i++) {
    sortedArr [i] = makeOffers(i);
  }
};

var mapField = document.querySelector('.map');
mapField.classList.remove('map--faded');
