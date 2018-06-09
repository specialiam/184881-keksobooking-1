'use strict';

//Вспомогательные функции (utils.js)
(function() {
  /**
   * Функция генерации случайного числа
   * @param {int} min - минимальное значение
   * @param {int} max - максимальное значение
   * @returns {int} - возвращает случайное значение
   */
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Функция генерации случайных данных
   * @param {array} array - входной массив
   * @param {boolean} repeat - допускаются ли повторения
   * @returns {*} - возвращает случаный элемент массива
   */
  window.genrRandom = function (array, repeat) {
    var index = getRandomInt(0, array.length - 1);
    var randomValue = array[index];

    if (!repeat) {
      array.splice(index, 1);
    }

    return randomValue;
  };
})();

