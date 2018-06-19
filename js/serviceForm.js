'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  window.formService = {
    makeFieldsetDisabled: function (isDisabled) {
      var fieldsetItems = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetItems.length; i++) {
        fieldsetItems[i].disabled = isDisabled;
      }
    }
  };
})();


