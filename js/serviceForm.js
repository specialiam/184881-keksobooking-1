'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var resetBtn = document.querySelector('.ad-form__reset');

  window.formService = {
    makeFieldsetDisabled: function (isDisabled) {
      var fieldsetItems = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetItems.length; i++) {
        fieldsetItems[i].disabled = isDisabled;
      }
    }
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), resetForm, window.backend.onError);
    evt.preventDefault();
  });

  function resetForm() {
    adForm.reset();
    window.movePinToStart();
    window.fillAddress();
  }

})();


