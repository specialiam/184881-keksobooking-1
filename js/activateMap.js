'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = mapElement.querySelector('.map__pin--main');

  window.formService.makeFieldsetDisabled();

  pinMain.addEventListener('mouseup', onPinMainClick);

  function makeMapActive() {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.formService.makeFieldsetActive();
  }

  function onPinMainClick() {
    makeMapActive();
    window.renderMap();
    window.fillAddress();
    pinMain.removeEventListener('mouseup', onPinMainClick);
  }
})();
