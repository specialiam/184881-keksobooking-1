'use strict';

(function () {
  var PIN_HEIGHT = 84; // px
  var PIN_WIDTH = 65; // px
  var MAP_BORDER_TOP = 130; // px
  var MAP_BORDER_BOTTOM = 630; // px

  var mapWidth = document.querySelector('.map').clientWidth; // px
  var pinMain = document.querySelector('.map__pin--main');
  var startPosition = {
    left: pinMain.style.left,
    top: pinMain.style.top
  };
  var startCoords;

  window.movePinToStart = function () {
    pinMain.style.left = startPosition.left;
    pinMain.style.top = startPosition.top;
  };

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

    window.fillAddress();
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    var pinStyleTop = +pinMain.style.top.replace('px', '');
    var pinStyleLeft = +pinMain.style.left.replace('px', '');

    if (pinStyleTop <= MAP_BORDER_TOP) {
      pinMain.style.top = MAP_BORDER_TOP + 'px';
      window.fillAddress();
    }

    if (pinStyleLeft <= 0) {
      pinMain.style.left = '0px';
      window.fillAddress();
    }

    if (pinStyleTop >= MAP_BORDER_BOTTOM - PIN_HEIGHT) {
      pinMain.style.top = MAP_BORDER_BOTTOM - PIN_HEIGHT + 'px';
      window.fillAddress();
    }

    var mapBorderRight = mapWidth - PIN_WIDTH;

    if (pinStyleLeft >= mapBorderRight) {
      pinMain.style.left = mapBorderRight + 'px';
      window.fillAddress();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

})();

