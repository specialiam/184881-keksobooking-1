'use strict';

(function () {
  var ADS_QUANTITY = 5;
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');

  window.renderMap = function (data) {
    var currentData = data;
    var mapPinsWitoutMain = mapPinsElement.querySelectorAll('.map__pin:not( .map__pin--main)');
    var pinsFragment = document.createDocumentFragment();

    if (currentData.length > ADS_QUANTITY) {
      currentData = data.slice(0, ADS_QUANTITY);
    }

    window.utils.deleteElements(mapPinsWitoutMain);

    currentData.forEach(function (item, i) {
      pinsFragment.appendChild(window.renderPin(item, i));
    });

    mapPinsElement.appendChild(pinsFragment);
  };
})();
