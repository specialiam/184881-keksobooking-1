'use strict';

(function(){
    var ADS_QUANTITY = 5;
    var mapElement = document.querySelector('.map');

    window.renderMap = function (data) {
        var currentData = data;
        var mapPinsElement = mapElement.querySelector('.map__pins');
        var mapPinsWitoutMain = mapPinsElement.querySelectorAll('.map__pin:not( .map__pin--main)');
        var pinsFragment = document.createDocumentFragment();

        if (currentData.length > ADS_QUANTITY) {
          currentData = data.slice(0, ADS_QUANTITY);
        }

        window.utils.deleteElements(mapPinsWitoutMain);
        for (var i = 0; i < currentData.length; i++) {
          pinsFragment.appendChild(window.renderPin((currentData[i]), i));
        }
        mapPinsElement.appendChild(pinsFragment);
      };
})();