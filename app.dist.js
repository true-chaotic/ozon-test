/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bem = bem;
exports.datesDiff = datesDiff;
exports.getWidth = getWidth;
/* global window, document */

/**
 * Простая имитация BEM-разметки вида block__element
 *
 * @param {string} block
 * @returns {function}
 */
function bem(block) {
  return function (element) {
    return '' + block + (element ? '__' + element : '');
  };
}

/**
 * Разница между текущей и указанной датой
 * @param {string} time - данные инстраграма о дате фото
 * @returns {string} - разница вида 1h, 2d или 3w
 */
function datesDiff(currentTime, userTime) {
  var timeDiff = currentTime - userTime;

  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;

  if (timeDiff < 0) {
    return '';
  }

  if (timeDiff < minute) {
    return Math.floor(timeDiff / second) + 's';
  }

  if (timeDiff < hour) {
    return Math.floor(timeDiff / minute) + 'm';
  }

  if (timeDiff < day) {
    return Math.floor(timeDiff / hour) + 'h';
  }

  if (timeDiff < week) {
    return Math.floor(timeDiff / day) + 'd';
  }

  return Math.floor(timeDiff / week) + 'w';
}

/**
 * Получение ширины окна
 * @return {number}
 */
function getWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLICKABLE_CLASS = undefined;
exports.default = likes;

__webpack_require__(11);

var _helpers = __webpack_require__(0);

var block = (0, _helpers.bem)('likes');

var CLICKABLE_CLASS = exports.CLICKABLE_CLASS = 'js-' + block('heart');

/**
 * Блок с счётчиком лайков
 *
 * @return {string}
 */
function likes(_ref, id) {
  var count = _ref.count;

  return '<span class="' + block() + '">\n      <span data-id=' + id + ' class="' + block('heart') + ' ' + CLICKABLE_CLASS + '">\u041F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C</span>\n      ' + count + '\n  </span>';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecent = getRecent;
/* global window, document */
/**
 * Получение данных инстраграма через JSONP
 */

var TOKEN = '691623.1419b97.479e4603aff24de596b1bf18891729f3';
var URL_BASE = 'https://api.instagram.com/v1/';
var URL_RECENT = URL_BASE + 'users/691623/media/recent';
var DEFAULT_COUNT = 20;
var CALLBACK_NAME = 'instagramGetData';

var head = document.getElementsByTagName('head')[0];

/**
 * Добавляет скрипт для JSONP-запроса и вешает обработку приходящих данных
 *
 * @param {string} type - тип ленты
 * @param {function} callback - обработчик
 * @param {number} [count=20] - количество элементов в запросе
 */
function load(url, callback) {
  var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_COUNT;

  var loader = document.createElement('script');
  loader.src = url + '?access_token=' + TOKEN + '&count=' + count + '&callback=' + CALLBACK_NAME;

  window[CALLBACK_NAME] = function (data) {
    callback(data);

    // Чистим DOM и global scope
    head.removeChild(loader);
    delete window[CALLBACK_NAME];
  };

  head.appendChild(loader);
}

/**
 * Получает недавние посты пользователя
 *
 * @param {function} callback - функция которой передаются данные от сервера
 * @param {object} [options] - настройки, пока только количество постов
 */
function getRecent(callback) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  load(URL_RECENT, callback, options.count);
}

exports.default = function () {};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = layout;

__webpack_require__(10);

var _helpers = __webpack_require__(0);

var _card = __webpack_require__(6);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var block = (0, _helpers.bem)('layout');

/**
 * Основное расположение элементов на странице
 *
 * @TODO: Сделать вариант для скольки угодно колонок
 *
 * @param {array} data - массив с информацией карточек
 * @param {boolean} [wide=true] - при true, строит в три колонки
 *
 * @return {string}
 */
function layout(data) {
  var wide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // Для широкого экрана бъём данные на три группы, для сохранения потока
  var cardsData = wide ? data.reduce(function (previousValue, currentValue, index) {
    previousValue[index % 3].push(currentValue);

    return previousValue;
  }, [[], [], []]) : [data];

  var listStart = '<ul class="' + block('cards') + '">';
  var listEnd = '</ul>';

  var cards = cardsData.map(function (group) {
    return group.reduce(function (previousValue, currentValue, index, array) {
      return previousValue + '\n      <li class="' + block('card') + '">\n          ' + (0, _card2.default)(currentValue) + '\n      </li>\n      ' + (!array[index + 1] ? listEnd : '');
    }, listStart);
  }).join('');

  return '<div class="' + block() + '">' + cards + '</div>';
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _helpers = __webpack_require__(0);

var _instagram = __webpack_require__(2);

var _likes = __webpack_require__(1);

var _layout = __webpack_require__(3);

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LAYOUT_BREAKPOINT = 768; /* global document, window, alert */

var appContainer = document.getElementById('app');

var state = {
  data: [],
  wideScreen: true
};

/**
 * Отрисовывает данные в контейнере приложения, если они есть
 */
function renderData() {
  appContainer.innerHTML = state.data.length !== 0 ? (0, _layout2.default)(state.data, state.wideScreen) : '';
}

/**
 * Проверяет ширину экрана, вызывает перерисовку на изменение ширины
 * при пересечении порога
 */
function checkSize() {
  var newWideScreen = (0, _helpers.getWidth)() > LAYOUT_BREAKPOINT;

  if (newWideScreen !== state.wideScreen) {
    state.wideScreen = newWideScreen;

    renderData();
  }
}

if (!appContainer) {
  throw new Error('Нужен блок с id="app"');
}

/**
 * Основная логика задачи
 *
 * "Есть API для «Instagram», надо вывести результат выполнения запроса
 * по предоставленному макету."
 */
(0, _instagram.getRecent)(function (_ref) {
  var data = _ref.data;

  if (!data) {
    return;
  }

  state.data = data;

  renderData();
});

/**
 * "При нажатии на сердце, должен быть отображен alert
 * с идентификатором соответствующей записи."
 */
appContainer.addEventListener('click', function (e) {
  var target = e.target;
  var classes = target.className.split(' ');

  if (classes.indexOf(_likes.CLICKABLE_CLASS) === -1) {
    return;
  }

  // актуальный eslintrc не одобряет алерты
  /*eslint-disable */
  alert(target.getAttribute('data-id'));
  /*eslint-enable */
});

/**
 * "Страница должна получиться адаптивной (в макете изображено два состояния)"
 *
 * Для того, чтобы элементы были в потоке, для широкого экрана используется
 * другая разметка. Иначе нужно было писать аналог Masonry с пересчётом размеров
 */
window.onresize = checkSize;
checkSize();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = card;

__webpack_require__(8);

var _helpers = __webpack_require__(0);

var _image = __webpack_require__(7);

var _image2 = _interopRequireDefault(_image);

var _likes = __webpack_require__(1);

var _likes2 = _interopRequireDefault(_likes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var block = (0, _helpers.bem)('card');

/**
 * Карточка с фото
 *
 * @return {string}
 */
function card(data) {
    var text = data.caption ? '<p class="' + block('text') + '">' + data.caption.text + '</p>' : '';
    var location = data.location ? '<span class="' + block('location') + '">' + data.location.name + '</span>' : '';

    var media = (0, _image2.default)(data.images);

    return '<div class="' + block() + '">\n      <div class="' + block('side') + '">\n        ' + media + '\n      </div><div class="' + block('main') + '">\n          <div class="' + block('head') + '">\n              <a class="' + block('profile') + '" href="https://www.instagram.com/' + data.user.username + '"><img class="' + block('profile-picture') + '" src="' + data.user.profile_picture + '" /></a>\n              <span class="' + block('name-location') + '">\n                <a class="' + block('username') + '" href="https://www.instagram.com/' + data.user.username + '">' + data.user.full_name + '</a>\n                ' + location + '\n              </span>\n              <time class="' + block('time') + '">' + (0, _helpers.datesDiff)(new Date().getTime(), data.created_time * 1000) + '</time>\n          </div>\n          <div class="' + block('media') + '">' + media + '</div>\n          <div class="' + block('description') + '">\n              <p class="' + block('likes') + '">' + (0, _likes2.default)(data.likes, data.id) + '</p>\n              ' + text + '\n          </div>\n      </div>\n  </div>';
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = image;

__webpack_require__(9);

var _helpers = __webpack_require__(0);

var block = (0, _helpers.bem)('image');

/**
 * Фото
 *
 * @TODO: использовать размеры фото и разные фото для разных экранов
 *
 * @return {string}
 */
function image(_ref) {
  var picture = _ref.standard_resolution;

  var photo = image ? '<img class="' + block('itself') + '" src="' + picture.url + '">' : '';

  return '<div class="' + block() + '">' + photo + '</div>';
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);