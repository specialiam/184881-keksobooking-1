'use strict';

(function(){
    var ADS_QUANTITY = 5;
    var mapElement = document.querySelector('.map');

    window.renderMap = function (data) {
        var currentDate = data;
        var mapPinsElement = mapElement.querySelector('.map__pins');
        var mapPinsWitoutMain = mapPinsElement.querySelectorAll('.map__pin:not( .map__pin--main)');
        var pinsFragment = document.createDocumentFragment();

        if (currentDate && currentDate.length > ADS_QUANTITY) {
          currentDate = data.slice(0, ADS_QUANTITY);
        }
        window.utils.deleteElements(mapPinsWitoutMain);
        for (var i = 0; i < currentDate.length; i++) {
          pinsFragment.appendChild(window.renderPin((currentDate[i]), i));
        }
        mapPinsElement.appendChild(pinsFragment);
      };
})();