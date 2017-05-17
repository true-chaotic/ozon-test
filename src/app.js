/* global document, window, alert */
import 'normalize.css';

import { getWidth } from './helpers';
import { getRecent } from './instagram';
import { CLICKABLE_CLASS as heart } from './likes/likes';

import layout from './layout/layout';

const LAYOUT_BREAKPOINT = 768;
const appContainer = document.getElementById('app');

const state = {
  data: [],
  wideScreen: true,
};

/**
 * Отрисовывает данные в контейнере приложения, если они есть
 */
function renderData() {
  appContainer.innerHTML = (state.data.length !== 0)
      ? layout(state.data, state.wideScreen)
      : '';
}

/**
 * Проверяет ширину экрана, вызывает перерисовку на изменение ширины
 * при пересечении порога
 */
function checkSize() {
  const newWideScreen = getWidth() > LAYOUT_BREAKPOINT;

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
getRecent(({ data }) => {
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
appContainer.addEventListener('click', (e) => {
  const target = e.target;
  const classes = target.className.split(' ');

  if (classes.indexOf(heart) === -1) {
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
