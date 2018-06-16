'use strict';

(function () {
  var PIN_WIDTH = 50; // px
  var PIN_HEIGHT = 70; // px
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  window.renderPin = function (pin, id) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';

    pinElement.setAttribute('data-id', id);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };
})();
