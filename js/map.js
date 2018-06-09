'use strict';

var PIN_WIDTH = 50; //px
var PIN_HEIGHT = 70; //px

var houseTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var createFeaturesList = function () {
  var featuresList = [];
  for (var i = 0; i < getRandomInt(0, OFFER_FEATURES.length); i++) {
    featuresList[i] = genrRandom(OFFER_FEATURES, false);
  }
  return featuresList;
};

var createPhotoList = function () {
  var photoList = [];
  for (var i = 0; i < OFFER_PHOTOS.length; i++) {
    photoList[i] = genrRandom(OFFER_PHOTOS, false);
  }

  return photoList;
};

var createAdItem = function () {
  var adItem = {
    author: {
      avatar: 'img/avatars/user0'+ getRandomInt(1, 8) + '.png',
    },
    offer: {
      title: genrRandom(OFFER_TITLES, false),
      address: getRandomInt(100, 600) + ', ' + getRandomInt(100, 600),
      price: getRandomInt(1000, 1000000),
      type: genrRandom(OFFER_TYPES, false),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: genrRandom(CHECK_TIMES, false),
      checkout: genrRandom(CHECK_TIMES, false),
      features: createFeaturesList(),
      description: '',
      photos: createPhotoList()
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    }
  };

  return adItem;
};

var createAds = function (quantity) {
  var offersList = [];
  for (var i = 0; i < quantity; i++) {
    offersList[i] = createAdItem();
  }

  return offersList;
};

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var adTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderAd = function (ad) {
  var adElement = adTemplate.cloneNode(true);

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = houseTypes[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__description').textContent = ad.offer.description;

  var adPhoto = adElement.querySelector('.popup__photo').cloneNode(true);

  for (var i = 0; i < ad.offer.photos.length; i++) {
    if (ad.offer.photos.length > 1) {
      adElement.querySelector('.popup__photos').appendChild(adPhoto);
    }
    var adPhotos = adElement.querySelectorAll('.popup__photo');
    adPhotos[i].src = ad.offer.photos[i];
  }

  var featuresList = adElement.querySelector('.popup__features');

  var renderFeatures = function (renderBlock) {

    var featureElements = renderBlock.querySelectorAll('.popup__feature');
    var featureElement = featureElements[0].cloneNode(true);

    clearBlock(renderBlock);

    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < ad.offer.features.length; i++) {
      var featurePopup = featureElement.cloneNode(true);
      featurePopup.classList = 'popup__feature';
      featurePopup.classList.add('popup__feature--' + ad.offer.features[i]);
      featuresFragment.appendChild(featurePopup);
    }

    return featuresFragment;
  };

  featuresList.appendChild(renderFeatures(featuresList));

  return adElement;
};

var ads = createAds(8);
var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
var mapFilterContainer = mapElement.querySelector('.map__filters-container');
var pinsFragment = document.createDocumentFragment();
var adsFragment = document.createDocumentFragment();

adsFragment.appendChild(renderAd(ads[0]));

for (var i = 0; i < ads.length; i++) {
  pinsFragment.appendChild(renderPin(ads[i]));
}

mapPinsElement.appendChild(pinsFragment);
mapElement.insertBefore(adsFragment, mapFilterContainer);



