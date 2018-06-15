'use strict';

(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    genrRandom: function (array, repeat) {
      var index = window.utils.getRandomInt(0, array.length - 1);
      var randomValue = array[index];
      if (!repeat) {
        array.splice(index, 1);
      }

      return randomValue;
    },
    clearBlock: function (block) {
      while (block.firstChild) {
        block.removeChild(block.firstChild);
      }
    }
  };
})();

