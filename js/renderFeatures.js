'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  window.renderFeatures = function (renderBlock, ad) {
    var featureElement = renderBlock.querySelector('.popup__feature').cloneNode(true);

    window.utils.clearBlock(renderBlock);

    ad.offer.features.forEach(function (item) {
      var featurePopup = featureElement.cloneNode(true);
      featurePopup.classList = 'popup__feature';
      featurePopup.classList.add('popup__feature--' + item);
      fragment.appendChild(featurePopup);
    });

    return fragment;
  };
})();
