'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  window.formService = {
    makeFieldsetActive: function () {
      var fieldsetItems = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetItems.length; i++) {
        fieldsetItems[i].disabled = false;
      }
    },
    makeFieldsetDisabled: function () {
      var fieldsetItems = adForm.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetItems.length; i++) {
        fieldsetItems[i].disabled = true;
      }
    }
  };
})();


