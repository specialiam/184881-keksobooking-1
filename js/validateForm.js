'use strict';

(function () {
  var housesMinPricesMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var formSubmit = document.querySelector('.ad-form__submit');
  var price = document.querySelector('#price');
  var inputType = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var roomNumberMax = +roomNumber.options[3].value;

  roomNumber.addEventListener('change', onRoomNumberChange);
  formSubmit.addEventListener('click', onFormSubmitClick);
  timein.addEventListener('change', onTimeChange.bind(null, timein, timeout));
  timeout.addEventListener('change', onTimeChange.bind(null, timeout, timein));
  inputType.addEventListener('change', onTypeChange);

  function onRoomNumberChange() {
    var roomNumberValue = +roomNumber.value;
    var capacityValue = +capacity.value;

    roomNumber.style.outline = 'none';

    if (roomNumberValue <= capacityValue || roomNumberValue !== roomNumberMax && capacityValue === 0) {
      capacity.value = roomNumberValue;
    }

    if (roomNumberValue === roomNumberMax) {
      capacity.value = 0;
    }

  }

  function onFormSubmitClick() {
    var roomNumberValue = +roomNumber.value;
    var capacityValue = +capacity.value;
    if ((roomNumberValue !== roomNumberMax && capacityValue === 0) || (roomNumberValue < capacityValue)) {
      roomNumber.setCustomValidity('Количество комнат не соответсвует количеству гостей.');
    } else {
      roomNumber.setCustomValidity('');
    }
  }

  function onTimeChange(time1, time2) {
    var selectedIndex = time1.options.selectedIndex;
    time2.options[selectedIndex].selected = true;
  }

  function onTypeChange() {
    var houseType = inputType.value;
    var minPrice = housesMinPricesMap[houseType];
    price.min = minPrice;
    price.placeholder = minPrice;
  }

})();
