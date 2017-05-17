/* global window, document */
/**
 * Получение данных инстраграма через JSONP
 */

const TOKEN = '691623.1419b97.479e4603aff24de596b1bf18891729f3';
const URL_BASE = 'https://api.instagram.com/v1/';
const URL_RECENT = `${URL_BASE}users/691623/media/recent`;
const DEFAULT_COUNT = 20;
const CALLBACK_NAME = 'instagramGetData';

const head = document.getElementsByTagName('head')[0];

/**
 * Добавляет скрипт для JSONP-запроса и вешает обработку приходящих данных
 *
 * @param {string} type - тип ленты
 * @param {function} callback - обработчик
 * @param {number} [count=20] - количество элементов в запросе
 */
function load(url, callback, count = DEFAULT_COUNT) {
  const loader = document.createElement('script');
  loader.src = `${url}?access_token=${TOKEN}&count=${count}&callback=${CALLBACK_NAME}`;

  window[CALLBACK_NAME] = (data) => {
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
export function getRecent(callback, options = {}) {
  load(URL_RECENT, callback, options.count);
}

export default () => {};
