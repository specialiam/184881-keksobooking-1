'use strict';

(function () {
  var RANK_TO_SHOW = 20;
  var FILTER_RANK = 5;
  var CHECKBOX_RANK = 1;
  var LOW_PRICE = 10000;
  var MID_PRICE = 50000;

  var housePriceMap = {
    low: function (value) {
      return (value < LOW_PRICE);
    },
    middle: function (value) {
      return (value >= LOW_PRICE && value <= MID_PRICE);
    },
    high: function (value) {
      return (value > MID_PRICE);
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
    var values = createValuesMap(filtersWithCheckbox);
    var ranks = [];

    var adsCopy = ads.slice();

    window.totalAds = [];

    adsCopy.forEach(function (item) {
      ranks.push(getRank(item, values));
    });

    adsCopy.forEach(function (item, i) {
      if (getIndices(ranks, checkboxCount).indexOf(i) !== -1) {
        window.totalAds.push(item);
      }
    });

    if (mapCard) {
      mapElement.removeChild(mapCard);
    }

    window.renderMap(window.totalAds);
  }


  function createValuesMap(items) {
    var values = [];
    var additionalValues = {
      features: []
    };

    items.forEach(function (item) {
      var filter = {};
      if (item.attributes.name.nodeValue === 'features') {
        additionalValues.features.push(item.value);
      } else {
        filter = {
          id: item.attributes.name.nodeValue.replace('housing-', ''),
          value: item.value
        };
        values.push(filter);
      }
    });
    values.push(additionalValues);

    return values;
  }

  function getRank(ad, filterMap) {
    var rank = 0;

    filterMap.forEach(function (item) {
      if (item.id === 'price') {
        if (housePriceMap[item.value](ad.offer[item.id])) {
          rank += FILTER_RANK;
        }
      }

      if (item.value === 'any') {
        rank += FILTER_RANK;
      }

      if (ad.offer[item.id] + '' === item.value) {
        rank += FILTER_RANK;
      }

      if (item.features && item.features.length > 0) {
        item.features.forEach(function (item1) {
          ad.offer.features.forEach(function (item2) {
            if (item1 === item2) {
              rank += CHECKBOX_RANK;
            }
          });
        });
      }

    });

    return rank;
  }

  function getIndices(array, countCheck) {
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
