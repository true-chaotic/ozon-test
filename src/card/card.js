import './card.css';

import { bem, datesDiff } from '../helpers';
import image from '../image/image';
import likes from '../likes/likes';

const block = bem('card');

/**
 * Карточка с фото
 *
 * @return {string}
 */
export default function card(data) {
  const text = data.caption
                  ? `<p class="${block('text')}">${data.caption.text}</p>`
                  : '';
  const location = data.location
                  ? `<span class="${block('location')}">${data.location.name}</span>`
                  : '';

  const media = image(data.images);

  return `<div class="${block()}">
      <div class="${block('side')}">
        ${media}
      </div><div class="${block('main')}">
          <div class="${block('head')}">
              <a class="${block('profile')}" href="https://www.instagram.com/${data.user.username}"><img class="${block('profile-picture')}" src="${data.user.profile_picture}" /></a>
              <span class="${block('name-location')}">
                <a class="${block('username')}" href="https://www.instagram.com/${data.user.username}">${data.user.full_name}</a>
                ${location}
              </span>
              <time class="${block('time')}">${datesDiff(new Date().getTime(), data.created_time * 1000)}</time>
          </div>
          <div class="${block('media')}">${media}</div>
          <div class="${block('description')}">
              <p class="${block('likes')}">${likes(data.likes, data.id)}</p>
              ${text}
          </div>
      </div>
  </div>`;
}
