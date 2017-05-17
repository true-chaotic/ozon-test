import './likes.css';

import { bem } from '../helpers';

const block = bem('likes');

export const CLICKABLE_CLASS = `js-${block('heart')}`;

/**
 * Блок с счётчиком лайков
 *
 * @return {string}
 */
export default function likes({ count }, id) {
  return `<span class="${block()}">
      <span data-id=${id} class="${block('heart')} ${CLICKABLE_CLASS}">Понравилось</span>
      ${count}
  </span>`;
}
