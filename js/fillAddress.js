'use strict';

(function () {
  var PIN_WIDTH = 65; // px
  var PIN_HEIGHT = 65; // px
  var ARROW_PIN_HEIGHT = 19; // px
  var pinMain = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  window.fillAddress = function () {
    var coords = {
      x: +pinMain.style.left.replace('px', '') + PIN_WIDTH / 2,
      y: +pinMain.style.top.replace('px', '') + PIN_HEIGHT + ARROW_PIN_HEIGHT
    };

    adressInput.value = coords.x + ', ' + coords.y;
  };

})();
