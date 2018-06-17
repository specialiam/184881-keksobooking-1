'use strict';

(function () {
  var HOUSES_MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var roomNumberMax = roomNumber.options[3].value;
  var formSubmit = document.querySelector('.ad-form__submit');
  var price = document.querySelector('#price');
  var inputType = document.querySelector('#type');

  roomNumber.addEventListener('change', onRoomNumberChange);
  formSubmit.addEventListener('click', onFormSubmutClick);
  timein.addEventListener('change', onTimeChange.bind(null, timein, timeout));
  timeout.addEventListener('change', onTimeChange.bind(null, timeout, timein));
  inputType.addEventListener('change', onTypeChange);

  function onRoomNumberChange() {
    var roomNumberValue = +roomNumber.value;
    var capacityValue = +capacity.value;
    roomNumber.style.outline = 'none';

    if (roomNumberValue < capacityValue) {
      capacity.value = roomNumberValue;
    }

    if (roomNumberValue === roomNumberMax) {
      capacity.value = 0;
    }
  }

  function onFormSubmutClick(evt) {
    var roomNumberValue = roomNumber.value;
    var capacityValue = capacity.value;
    if ((roomNumberValue !== roomNumberMax && capacityValue === '0') || (roomNumberValue < capacityValue)) {
      roomNumber.style.outline = '2px solid rgba(255,0,0,0.5)';
      evt.preventDefault();
    }
  }

  function onTimeChange(time1, time2) {
    var selectedIndex = time1.options.selectedIndex;
    time2.options[selectedIndex].selected = true;
  }

  function onTypeChange() {
    var houseType = inputType.value;
    var minPrice = HOUSES_MIN_PRICES[houseType];
    price.min = minPrice;
    price.placeholder = minPrice;
  }

})();
