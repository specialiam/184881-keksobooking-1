'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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
        if (xhr.status === 200) {
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
      node.style = 'z-index: 100; margin-left: -150px; margin-top: -100px; text-align: center; background-color: red; border-radius: 10px; width: 300px; height: 200px; padding-top: 50px; color: #fff; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);';
      node.style.position = 'absolute';
      node.style.left = '50%';
      node.style.top = '50%';
      node.style.fontSize = '20px';

      node.textContent = 'Ошибка! ' + errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
