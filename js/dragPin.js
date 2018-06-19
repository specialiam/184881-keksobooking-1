'use strict';

(function () {
  var PIN_HEIGHT = 85; // px
  var PIN_WIDTH = 65; // px

  var mapHeight = document.querySelector('.map').clientHeight; // px
  var mapWidth = document.querySelector('.map').clientWidth; // px
  var filtersHeight = document.querySelector('.map__filters-container').clientHeight; // px
  var pinMain = document.querySelector('.map__pin--main');
  var startCoords;

  pinMain.addEventListener('mousedown', onPinMainMouseDown);

  function onPinMainMouseDown(evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pinCurrentPosition = {
      top: pinMain.offsetTop - shift.y,
      left: pinMain.offsetLeft - shift.x
    };

    pinMain.style.top = pinCurrentPosition.top + 'px';
    pinMain.style.left = pinCurrentPosition.left + 'px';

    window.fillAddress(pinCurrentPosition.left, pinCurrentPosition.top);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    var pinStyleTop = +pinMain.style.top.replace('px', '');
    var pinStyleLeft = +pinMain.style.left.replace('px', '');

    if (pinStyleTop < 0) {
      pinMain.style.top = '0px';
    }

    if (pinStyleLeft < 0) {
      pinMain.style.left = '0px';
    }

    var mapBorderBottom = mapHeight - filtersHeight - PIN_HEIGHT;

    if (pinStyleTop > mapBorderBottom) {
      pinMain.style.top = mapBorderBottom + 'px';
    }

    var mapBorderRight = mapWidth - PIN_WIDTH;

    if (pinStyleLeft > mapBorderRight) {
      pinMain.style.left = mapBorderRight + 'px';
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

})();

