/* global window, document */

/**
 * Простая имитация BEM-разметки вида block__element
 *
 * @param {string} block
 * @returns {function}
 */
export function bem(block) {
  return element => `${block}${element ? `__${element}` : ''}`;
}

/**
 * Разница между текущей и указанной датой
 * @param {string} time - данные инстраграма о дате фото
 * @returns {string} - разница вида 1h, 2d или 3w
 */
export function datesDiff(currentTime, userTime) {
  const timeDiff = currentTime - userTime;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (timeDiff < 0) {
    return '';
  }

  if (timeDiff < minute) {
    return `${Math.floor(timeDiff / second)}s`;
  }

  if (timeDiff < hour) {
    return `${Math.floor(timeDiff / minute)}m`;
  }

  if (timeDiff < day) {
    return `${Math.floor(timeDiff / hour)}h`;
  }

  if (timeDiff < week) {
    return `${Math.floor(timeDiff / day)}d`;
  }

  return `${Math.floor(timeDiff / week)}w`;
}

/**
 * Получение ширины окна
 * @return {number}
 */
export function getWidth() {
  return window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
}
