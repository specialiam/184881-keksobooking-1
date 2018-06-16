'use strict';

(function () {
  var HOUSE_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var adTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.renderAd = function (ad) {
    var adElement = adTemplate.cloneNode(true);

    adElement.querySelector('.popup__avatar').src = ad.author.avatar;
    adElement.querySelector('.popup__title').textContent = ad.offer.title;
    adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type];
    adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adElement.querySelector('.popup__description').textContent = ad.offer.description;

    var adPhoto = adElement.querySelector('.popup__photo').cloneNode(true);

    for (var i = 0; i < ad.offer.photos.length - 1; i++) {
      if (ad.offer.photos.length > 1) {
        adElement.querySelector('.popup__photos').appendChild(adPhoto);
      }
      var adPhotos = adElement.querySelectorAll('.popup__photo');
      adPhotos[i].src = ad.offer.photos[i];
    }

    var featuresList = adElement.querySelector('.popup__features');
    featuresList.appendChild(window.renderFeatures(featuresList, ad));

    return adElement;
  };
})();
