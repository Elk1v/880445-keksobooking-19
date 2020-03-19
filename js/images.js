'use strict';

(function () {
  var load = function (element, prw) {
    var image = element.files[0];
    var imageName = image.name.toLowerCase();

    var matches = window.data.FILE_TYPES.some(function (it) {
      return imageName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        prw.src = reader.result;
      });

      reader.readAsDataURL(image);
    }
  };

  var createPreview = function () {
    var houseElement = document.createElement(window.data.HousePreviewElement.HOUSE_ELEMENT_TYPE);

    houseElement.alt = window.data.HousePreviewElement.HOUSE_ELEMENT_ALT;
    houseElement.style.width = window.data.HousePreviewElement.HOUSE_ELEMENT_WIDTH;
    houseElement.style.height = window.data.HousePreviewElement.HOUSE_ELEMENT_HEIGHT;

    return houseElement;
  };

  window.images = {
    load: load,
    createPreview: createPreview
  };
})();
