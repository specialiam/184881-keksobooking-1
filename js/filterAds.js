'use strict';

(function () {
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
  var filtersContainer = document.querySelector('.map__filters');
  var mapElement = document.querySelector('.map');
  var ads = [];

  window.backend.load(onAdsLoad, window.backend.onError);

  var onFilterChange = window.debounce(function () {
    renderFilteredAds();
  });

  filtersContainer.addEventListener('change', onFilterChange);

  function renderFilteredAds() {
    var mapCard = mapElement.querySelector('.map__card');
    var checkboxCount = document.querySelectorAll('.map__checkbox:checked').length;
    var filtersWithCheckbox = document.querySelectorAll('.map__filter, .map__checkbox:checked');
    var valueMap = createValueMap(filtersWithCheckbox);
    var rankArray = [];

    var adsCopy = ads.slice();

    window.totalAds = [];

    adsCopy.forEach(function (item) {
      rankArray.push(getRank(item, valueMap));
    });

    adsCopy.forEach(function (item, i) {
      if (getIndices(rankArray, checkboxCount).indexOf(i) !== -1) {
        window.totalAds.push(item);
      }
    });

    if (mapCard) {
      mapElement.removeChild(mapCard);
    }

    window.renderMap(window.totalAds);
  }


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
          rank += 5;
        }
      }

      if (item.value === 'any') {
        rank += 5;
      }

      if (ad.offer[item.id] + '' === item.value) {
        rank += 5;
      }

      if (item.features && item.features.length > 0) {
        item.features.forEach(function (item1) {
          ad.offer.features.forEach(function (item2) {
            if (item1 === item2) {
              rank += 1;
            }
          });
        });
      }

    });

    return rank;
  }

  function getIndices(array, countCheck) {
    var RANK_TO_SHOW = 20;
    var CHECKBOX_RANK = 1;

    var indices = [];
    var element = RANK_TO_SHOW + (countCheck * CHECKBOX_RANK);
    var idx = array.indexOf(element);

    while (idx !== -1) {
      indices.push(idx);
      idx = array.indexOf(element, idx + 1);
    }

    return indices;

  }

  function onAdsLoad(adsArray) {
    ads = adsArray;
  }
})();
