'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var resetBtn = document.querySelector('.ad-form__reset');
  var previewAvatarPhoto = document.querySelector('.ad-form-header__preview img');
  var successBlock = document.querySelector('.success');
  var fieldsetItems = adForm.querySelectorAll('fieldset');
  var avatarDefaultUrl = 'img/muffin-grey.svg';

  window.formService = {
    makeFieldsetDisabled: function (isDisabled) {
      fieldsetItems.forEach(function (item) {
        item.disabled = isDisabled;
      });
    }
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  adForm.addEventListener('submit', function (evt) {
    var formData = new FormData(adForm);

    window.backend.save(formData, onSubmitSuccess, window.backend.onError);
    evt.preventDefault();
  });

  function onSubmitSuccess() {
    successBlock.classList.remove('hidden');
    document.addEventListener('click', hideSuccesBlock);
    document.addEventListener('keydown', hideSuccesBlock);
    resetForm();
  }

  function resetForm() {
    var mapCard = mapElement.querySelector('.map__card');
    var previewPhotos = document.querySelectorAll('.ad-form__photo');
    var mapPinsWitoutMain = mapPinsElement.querySelectorAll('.map__pin:not( .map__pin--main)');

    window.utils.deleteElements(mapPinsWitoutMain);
    window.utils.deleteElements(previewPhotos);
    previewAvatarPhoto.src = avatarDefaultUrl;
    adForm.reset();
    window.movePinToStart();
    window.fillAddress();

    if (mapCard) {
      mapElement.removeChild(mapCard);
    }
  }

  function hideSuccesBlock(evt) {
    if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
      successBlock.classList.add('hidden');
      document.removeEventListener(evt.type, hideSuccesBlock);
    }
  }
})();
