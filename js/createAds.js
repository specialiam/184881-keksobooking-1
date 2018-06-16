'use strict';

(function () {
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var OFFER_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_TIMES = [
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
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  function createAdItem() {
    var adItem = {
      author: {
        avatar: 'img/avatars/user0' + window.utils.getRandomInt(1, 8) + '.png',
      },
      offer: {
        title: window.utils.genrRandom(OFFER_TITLES),
        address: window.utils.getRandomInt(100, 600) + ', ' + window.utils.getRandomInt(100, 600),
        price: window.utils.getRandomInt(1000, 1000000),
        type: window.utils.genrRandom(OFFER_TYPES),
        rooms: window.utils.getRandomInt(1, 5),
        guests: window.utils.getRandomInt(1, 10),
        checkin: window.utils.genrRandom(CHECK_TIMES),
        checkout: window.utils.genrRandom(CHECK_TIMES),
        features: createFeaturesList(),
        description: '',
        photos: createPhotoList()
      },
      location: {
        x: window.utils.getRandomInt(300, 900),
        y: window.utils.getRandomInt(130, 630)
      }
    };
    return adItem;
  }

  function createFeaturesList() {
    var featuresList = [];
    for (var i = 0; i < window.utils.getRandomInt(0, OFFER_FEATURES.length); i++) {
      featuresList[i] = window.utils.genrRandom(OFFER_FEATURES);
    }
    return featuresList;
  }

  function createPhotoList() {
    var photoList = [];
    for (var i = 0; i < OFFER_PHOTOS.length; i++) {
      photoList[i] = window.utils.genrRandom(OFFER_PHOTOS);
    }
    return photoList;
  }

  window.createAds = function (quantity) {
    var offersList = [];
    for (var i = 0; i < quantity; i++) {
      offersList[i] = createAdItem();
    }

    return offersList;
  };
})();
