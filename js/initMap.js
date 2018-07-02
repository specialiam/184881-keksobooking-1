'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ADS_QUANTITY = 5;
  var mapElement = document.querySelector('.map');
  var pinMain = mapElement.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  window.formService.makeFieldsetDisabled(true);

  pinMain.addEventListener('mouseup', onPinMainClick);

  mapElement.addEventListener('click', onPinClick);

  window.backend.load(onAdsLoad, window.backend.onError);

  function makeMapActive() {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.formService.makeFieldsetDisabled(false);
    window.fillAddress();
  }

  function onPinMainClick() {
    makeMapActive();
    window.renderMap(window.totalAds);
    pinMain.removeEventListener('mouseup', onPinMainClick);
  }

  function closePopup(evt) {
    if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
      var popup = document.querySelector('.map__card');
      popup.remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  }

  window.renderMap = function (data) {
    if (data.length > ADS_QUANTITY) {
      data.splice(0, ADS_QUANTITY);
    }
    var mapPinsElement = mapElement.querySelector('.map__pins');
    mapPinsElement.innerHTML = '';
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      pinsFragment.appendChild(window.renderPin((data[i]), i));
    }
    mapPinsElement.appendChild(pinsFragment);
  };

  function showAd(ad) {
    var adsFragment = document.createDocumentFragment();
    var mapFilterContainer = mapElement.querySelector('.map__filters-container');
    adsFragment.appendChild(window.renderAd(ad));
    mapElement.insertBefore(adsFragment, mapFilterContainer);
  }

  function onPinClick(evt) {
    var id;

    if (evt.target.nodeName === 'IMG') {
      id = evt.target.parentNode.getAttribute('data-id');
    } else {
      id = evt.target.getAttribute('data-id');
    }

    if (evt.target.className === 'popup__close') {
      closePopup(evt);
    }

    if (!id) {
      return;
    }

    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
      document.querySelector('.map__card').remove();
    }

    if (evt.target.nodeName === 'IMG') {
      evt.target.parentNode.classList.add('map__pin--active');
    } else {
      evt.target.classList.add('map__pin--active');
    }

    showAd(window.totalAds[id]);
  }

  function onAdsLoad(adsArray) {
    window.totalAds = adsArray;
  }

})();
