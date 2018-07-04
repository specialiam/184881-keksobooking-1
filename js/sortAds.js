'use strict';

(function () {
  var RANK_TO_SHOW = 4;

  var housePriceMap = {
    low: function (value) {
      return (value < 10000);
    },
    middle: function (value) {
      return (value >= 10000 && value <= 50000);
    },
    high: function (value) {
      return (value > 50000);
    },
    any: function () {
      return false;
    }
  };
  window.ads = [];
  window.adsRange = [];

  var filtersContainer = document.querySelector('.map__filters');
  var featuresContainer = document.querySelector('.map__features');
  var mapElement = document.querySelector('.map');

  window.backend.load(onAdsLoad, window.backend.onError);

  featuresContainer.addEventListener('change', function () {

  });


  filtersContainer.addEventListener('change', function () {

    var mapCard = mapElement.querySelector('.map__card');
    var filtersWithCheckbox = document.querySelectorAll('.map__filter, .map__checkbox:checked');
    var valueMap = createValueMap(filtersWithCheckbox);

    window.totalAds = [];

    var rankArray = [];
    var adsCopy = window.ads.slice();

    adsCopy.forEach(function (item) {
      rankArray.push(getRank(item, valueMap));
    });
    
    adsCopy.forEach(function (item, i) {
      if (getIndices(rankArray, RANK_TO_SHOW).indexOf(i) !== -1) {
        window.totalAds.push(item);
      }
    });

    if (mapCard) {
      mapElement.removeChild(mapCard);
    }
    
    window.renderMap(window.totalAds);
  });


  function createValueMap(items) {
    var valueMap = [];
    var featureValues = {
      features: []
    };

    items.forEach(function (item) {
      var filter = {};
      if (item.attributes.name.nodeValue === 'features') {
        featureValues.features.push(item.value);
      } else {
        filter = {
          id: item.attributes.name.nodeValue.replace('housing-', ''),
          value: item.value
        };
        valueMap.push(filter);
      }
    });
    valueMap.push(featureValues);

    return valueMap;
  }

  function getRank(ad, filterMap) {
    var rank = 0;

    filterMap.forEach(function (item) {
      if (item.id === 'price') {
        if (housePriceMap[item.value](ad.offer[item.id])) {
          rank += 1;
        }
      }

      if (item.value === 'any') {
        rank += 1;
      }

      if (ad.offer[item.id] + '' === item.value) {
        rank += 1;
      }

      // Придумать рейты для features, возможно упростить эту штуку с помощью includes
      if (item.features && item.features.length > 0) {
        item.features.forEach(function (item1) {
          ad.offer.features.forEach(function (item2) {
            if (item1 === item2) {
              rank += 0.1;
            }
          });
        });
      }

    });

    return rank;
  }

  function getIndices(array, element) {
    var indices = [];
    var maxValue = Math.max.apply(Math, array);

    console.log(maxValue);

    if (maxValue <= 4) {
      element = 4;
    }

    element = maxValue;

    var idx = array.indexOf(element);

    while (idx !== -1) {
      indices.push(idx);
      idx = array.indexOf(element, idx + 1);
    }

    console.log(indices);
    return indices;

  }

  function onAdsLoad(adsArray) {
    window.ads = adsArray;
  }

})();
