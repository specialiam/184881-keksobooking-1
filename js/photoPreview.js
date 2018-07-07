'use strict';

(function () {
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var photosChooser = document.querySelector('.ad-form__upload input');
  var previewPhoto = document.querySelectorAll('.ad-form__photo');
  var previewPhotoTemplate = previewPhoto[0].cloneNode(previewPhoto);
  var previewPhotosContainer = document.querySelector('.ad-form__photo-container');

  window.utils.deleteElements(previewPhoto);

  avatarChooser.addEventListener('change', onAvatarChooserChange);
  photosChooser.addEventListener('change', onPhotosChooserChange);

  function onAvatarChooserChange() {
    var previewAvatarPhoto = document.querySelector('.ad-form-header__preview img');
    var photo = avatarChooser.files[0];
    var previewContainer = previewAvatarPhoto.parentElement;
    var photoPreview = renderPhotoPreview(photo, previewAvatarPhoto);

    window.utils.clearBlock(previewContainer);
    previewContainer.appendChild(photoPreview);
  }

  function onPhotosChooserChange() {
    var photos = photosChooser.files;
    var previewFragment = document.createDocumentFragment();

    Array.prototype.forEach.call(photos, function (item) {
      var photoPreview = renderPhotoPreview(item, previewPhotoTemplate);

      previewFragment.appendChild(photoPreview);
    });

    previewPhotosContainer.appendChild(previewFragment);
  }

  function renderPhotoPreview(file, preview) {
    if (file.type.indexOf('image') !== -1) {
      var reader = new FileReader();
      var previewTemplate = preview.cloneNode(true);

      reader.addEventListener('load', function () {
        if (previewTemplate.nodeName === 'IMG') {
          previewTemplate.src = reader.result;
        } else {
          previewTemplate.style = 'background-image: url(' + reader.result + '); background-position: center; background-size: cover;';
        }
      });

      reader.readAsDataURL(file);
    }

    return previewTemplate;
  }
})();
