'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardPhotoTemplate = cardTemplate.querySelector('.popup__photo');

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

  window.card = {
    renderCard: function (cardInfo) {
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
    }
  };
})();
