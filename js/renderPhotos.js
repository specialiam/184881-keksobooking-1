'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  window.renderPhotos = function (renderBlock, ad) {
    var photoElement = renderBlock.querySelector('.popup__photo').cloneNode(true);
    window.utils.clearBlock(renderBlock);
    ad.offer.photos.forEach(function (item) {
      var adPhotos = photoElement.cloneNode(true);
      adPhotos.src = item;
      fragment.appendChild(adPhotos);
    });


    return fragment;
  };
})();
