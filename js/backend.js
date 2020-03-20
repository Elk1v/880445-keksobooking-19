'use strict';

(function () {
  var RESPONSE_JSON = 'json';
  var STATUS_OK = 200;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var Timeout = {
    LOAD: 10000,
    MESSAGE: 3000
  };

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var Message = {
    STATUS: 'Статус ответа: ',
    DISCONNECT: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    TIME: 'мс'
  };

  var main = document.querySelector('main');
  var notice = main.querySelector('.notice');

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(Message.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Message.DISCONNECT);
    });

    xhr.addEventListener('timeout', function () {
      onError(Message.TIMEOUT + xhr.timeout + Message.TIME);
    });

    xhr.timeout = Timeout.LOAD;

    xhr.open(RequestMethod.GET, Url.LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(Message.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Message.DISCONNECT);
    });

    xhr.open(RequestMethod.POST, Url.UPLOAD);
    xhr.send(data);
  };

  var onErrorLoad = function (message) {
    var errorMessageText = document.createElement('p');
    errorMessageText.classList.add('error__message');
    errorMessageText.innerText = message;

    var errorMessage = errorMessageTemplate.cloneNode();
    errorMessage.appendChild(errorMessageText);

    main.insertBefore(errorMessage, notice);

    window.setTimeout(function () {
      errorMessage.remove();
      window.page.reset();
    }, Timeout.MESSAGE);
  };

  var onErrorUpload = function (message) {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').innerText = message;
    var tryAgainBtn = errorMessage.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorMessage.remove();
      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      document.removeEventListener('keydown', onEscapeKeyPress);
      document.removeEventListener('click', onEmptyAriaClick);
    };

    var onTryAgainBtnClick = function () {
      closeErrorMessage();
    };

    var onEscapeKeyPress = function () {
      closeErrorMessage();
    };

    var onEmptyAriaClick = function () {
      closeErrorMessage();
    };

    main.insertBefore(errorMessage, notice);

    tryAgainBtn.addEventListener('click', onTryAgainBtnClick);
    document.addEventListener('keydown', onEscapeKeyPress);
    document.addEventListener('click', onEmptyAriaClick);
  };

  window.backend = {
    load: load,
    upload: upload,
    onErrorLoad: onErrorLoad,
    onErrorUpload: onErrorUpload
  };
})();
