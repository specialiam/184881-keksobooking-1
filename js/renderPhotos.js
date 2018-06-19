'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  window.renderPhotos = function (renderBlock, ad) {
    var photoElements = renderBlock.querySelectorAll('.popup__photo');
    var photoElement = photoElements[0].cloneNode(true);
    window.utils.clearBlock(renderBlock);
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var adPhotos = photoElement.cloneNode(true);
      adPhotos.src = ad.offer.photos[i];
      fragment.appendChild(adPhotos);
    }

    return fragment;
  };
})();
