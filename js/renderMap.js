'use strict';

(function () {
  window.renderMap = function () {
    var mapElement = document.querySelector('.map');
    var mapPinsElement = mapElement.querySelector('.map__pins');
    var mapFilterContainer = mapElement.querySelector('.map__filters-container');

    var ads = window.createAds(8);
    var pinsFragment = document.createDocumentFragment();
    var adsFragment = document.createDocumentFragment();

    adsFragment.appendChild(window.renderAd(ads[0]));

    for (var i = 0; i < ads.length; i++) {
      pinsFragment.appendChild(window.renderPin(ads[i]));
    }

    mapPinsElement.appendChild(pinsFragment);
    mapElement.insertBefore(adsFragment, mapFilterContainer);
  };
})();
