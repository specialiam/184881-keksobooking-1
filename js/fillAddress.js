'use strict';

(function () {
  var pinWidth = 65; // px
  var pinHeight = 65; // px
  var partPinHeight = 19; // px
  var pinMain = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  var startCoords = {
    x: +pinMain.style.left.replace(/\D+/g, '') + pinWidth / 2,
    y: +pinMain.style.top.replace(/\D+/g, '') + pinHeight / 2
  };

  adressInput.value = startCoords.x + ', ' + startCoords.y;

  window.fillAddress = function () {
    startCoords = {
      x: +pinMain.style.left.replace(/\D+/g, '') + pinWidth / 2,
      y: +pinMain.style.top.replace(/\D+/g, '') + pinHeight + partPinHeight
    };

    adressInput.value = startCoords.x + ', ' + startCoords.y;
  };
})();
