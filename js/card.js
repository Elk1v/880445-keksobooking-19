'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var removeChildren = function (parent, childList) {
    childList.forEach(function (child) {
      parent.removeChild(child);
    });
  };

  var createFeatureElement = function (feature) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + feature);

    return featureElement;
  };

  var renderFeatures = function (advert, card) {
    var featuresList = card.querySelector('.popup__features');
    var features = featuresList.querySelectorAll('.popup__feature');

    removeChildren(featuresList, features);

    advert.offer.features.map(createFeatureElement).forEach(function (element) {
      featuresList.appendChild(element);
    });
  };

  var renderPhotos = function (advert, card) {
    var photosList = card.querySelector('.popup__photos');
    var photos = photosList.querySelectorAll('.popup__photo');

    var photoElement = photosList.querySelector('.popup__photo');

    var createPhotoElement = function (photoSrc) {
      var tempPhoto = photoElement.cloneNode();
      tempPhoto.src = photoSrc;
      return tempPhoto;
    };

    removeChildren(photosList, photos);

    if (advert.offer.photos) {
      advert.offer.photos.map(createPhotoElement).forEach(function (element) {
        photosList.appendChild(element);
      });
    } else {
      card.removeChild(photosList);
    }
  };

  var render = function (advert) {
    var card = cardTemplate.cloneNode(true);

    var onCloseCardBtnClick = function (evt) {
      if (evt.target.type === 'button') {
        map.removeChild(card);
        window.map.removeCards();
        card.removeEventListener('click', onCloseCardBtnClick);
      }
    };

    var onEscapePress = function (evt) {
      if (evt.key === window.data.Key.ESC) {
        window.map.removeCards();
        card.removeEventListener('click', onCloseCardBtnClick);
        window.removeEventListener('keydown', onEscapePress);
      }
    };

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__title').innerText = advert.offer.title;
    card.querySelector('.popup__text--address').innerText = advert.offer.address;
    card.querySelector('.popup__text--price').innerText = advert.offer.price + '₽/ночь';
    card.querySelector('.popup__type').innerText = window.data.HouseType[advert.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').innerText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').innerText = advert.offer.description;

    renderFeatures(advert, card);
    renderPhotos(advert, card);

    map.insertBefore(card, map.querySelector('.map__filters-container'));

    card.addEventListener('click', onCloseCardBtnClick);
    window.addEventListener('keydown', onEscapePress);
  };

  window.card = {
    render: render
  };
})();
