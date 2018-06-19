'use strict';

(function () {
  var PIN_WIDTH = 65; // px
  var PIN_HEIGHT = 65; // px
  var ARROW_PIN_HEIGHT = 19; // px
  var pinMain = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  var startCoords = {
    x: +pinMain.style.left.replace('px', '') + PIN_WIDTH / 2,
    y: +pinMain.style.top.replace('px', '') + PIN_HEIGHT / 2
  };

  adressInput.value = startCoords.x + ', ' + startCoords.y;

  window.fillAddress = function (currentX, currentY) {
    var coords = {
      x: currentX + PIN_WIDTH / 2,
      y: currentY + PIN_HEIGHT + ARROW_PIN_HEIGHT
    };

    adressInput.value = coords.x + ', ' + coords.y;
  };
})();
