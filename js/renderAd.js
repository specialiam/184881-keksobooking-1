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


    var photoList = adElement.querySelector('.popup__photos');
    photoList.appendChild(window.renderPhotos(photoList, ad));

    var featuresList = adElement.querySelector('.popup__features');
    featuresList.appendChild(window.renderFeatures(featuresList, ad));

    return adElement;
  };
})();
