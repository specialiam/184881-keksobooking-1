'use strict';

(function () {
  var featuresFragment = document.createDocumentFragment();
  window.renderFeatures = function (renderBlock, ad) {
    var featureElements = renderBlock.querySelectorAll('.popup__feature');
    var featureElement = featureElements[0].cloneNode(true);
    window.utils.clearBlock(renderBlock);
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featurePopup = featureElement.cloneNode(true);
      featurePopup.classList = 'popup__feature';
      featurePopup.classList.add('popup__feature--' + ad.offer.features[i]);
      featuresFragment.appendChild(featurePopup);
    }

    return featuresFragment;
  };
})();
