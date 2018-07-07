'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var OK_CODE = 200;

  var mainBlock = document.querySelector('main');
  var successBlock = document.querySelector('.success');
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_CODE) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('GET', loadURL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_CODE) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', saveURL);
      xhr.send(data);
    },
    onError: function (errorMessage) {
      var node = document.createElement('div');

      node.classList.add('error-block');
      node.style = 'position: fixed; top: 0; left: 0; z-index: 2; box-sizing: border-box; width: 100%; height: 100%; overflow: auto; padding-top: 300px; text-align: center; vertical-align: middle;background-color: rgba(255, 114, 0, 0.8); color: #fff; font-size: 50px; font-weight: 700;';
      node.textContent = 'Ошибка при отправке! ' + errorMessage;

      mainBlock.insertBefore(node, successBlock);

      document.addEventListener('click', deleteErrorBlock);
      document.addEventListener('keydown', deleteErrorBlock);

    }
  };

  function deleteErrorBlock(evt) {
    var block = document.querySelector('.error-block');
    if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
      block.parentElement.removeChild(block);
    }
  }

})();
