'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapElement = document.querySelector('.map');
  var pinMain = mapElement.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilterContainer = mapElement.querySelector('.map__filters-container');
  var closeElement;
  window.formService.makeFieldsetDisabled(true);
  window.totalAds = [];

  pinMain.addEventListener('mouseup', onPinMainMouseup);
  pinMain.addEventListener('keydown', onPinMainKeydown);

  mapElement.addEventListener('click', onPinClick);

  window.backend.load(onAdsLoad, window.backend.onError);

  function onPinMainKeydown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinMainActivate();
    }
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  function onPinMainMouseup() {
    pinMainActivate();
    pinMain.removeEventListener('mouseup', onPinMainMouseup);
  }

  function makeMapActive() {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.formService.makeFieldsetDisabled(false);
    window.fillAddress();
  }

  function pinMainActivate() {
    makeMapActive();
    window.renderMap(window.totalAds);
  }

  function closePopup() {
    var popup = document.querySelector('.map__card');
    popup.remove();
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }

  function showAd(ad) {
    var adsFragment = document.createDocumentFragment();
    adsFragment.appendChild(window.renderAd(ad));
    mapElement.insertBefore(adsFragment, mapFilterContainer);
    closeElement = mapElement.querySelector('.popup__close');

    closeElement.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupKeydown);

  }

  function onPopupClick() {
    closePopup();
    closeElement.removeEventListener('click', onPopupClick);
  }

  function onPopupKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      document.removeEventListener('keydown', onPopupKeydown);
    }
  }

  function onPinClick(evt) {
    var activePin = document.querySelector('.map__pin--active');
    var id;

    if (evt.target.nodeName === 'IMG') {
      id = evt.target.parentNode.getAttribute('data-id');
    } else {
      id = evt.target.getAttribute('data-id');
    }

    if (!id) {
      return;
    }

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
