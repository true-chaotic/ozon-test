import './image.css';

import { bem } from '../helpers';

const block = bem('image');

/**
 * Фото
 *
 * @TODO: использовать размеры фото и разные фото для разных экранов
 *
 * @return {string}
 */
export default function image({ standard_resolution: picture }) {
  const photo = image
                  ? `<img class="${block('itself')}" src="${picture.url}">`
                  : '';

  return `<div class="${block()}">${photo}</div>`;
}
