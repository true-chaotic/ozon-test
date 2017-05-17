import './layout.css';

import { bem } from '../helpers';
import card from '../card/card';

const block = bem('layout');

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
export default function layout(data, wide = true) {
  // Для широкого экрана бъём данные на три группы, для сохранения потока
  const cardsData = wide
    ? data.reduce((previousValue, currentValue, index) => {
      previousValue[index % 3].push(currentValue);

      return previousValue;
    }, [[], [], []])
    : [data];

  const listStart = `<ul class="${block('cards')}">`;
  const listEnd = '</ul>';

  const cards = cardsData.map(
    group => group.reduce((previousValue, currentValue, index, array) =>
      `${previousValue}
      <li class="${block('card')}">
          ${card(currentValue)}
      </li>
      ${!array[index + 1] ? listEnd : ''}`, listStart)).join('');

  return `<div class="${block()}">${cards}</div>`;
}
