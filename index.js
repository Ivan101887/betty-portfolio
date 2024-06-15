import { header, leftSidebar } from "./data.js";

function init() {
  fillMarquee();
  insertMenu();
}

function fillMarquee() {
  const elMarquee = document.querySelector('#MarqueeContent');
  elMarquee.innerHTML = header.marquee;
}

function getFormatMenu() {
  const { infoList = [] } = leftSidebar;
  return infoList.reduce((acc, { title, submenu }) => {
    const string = title
      ? `
        <li class="leftSidebar__listItem leftSidebar__listItem--title">
            <h2 class="menu__title">
                ${title}
            </h2>
        </li>
        ${getFormatSubmenu(submenu)}
      `
      : '';
    return acc += string;
  }, '');
}

function getFormatSubmenu(list = []) {
  return list.reduce((acc, { prefix, main, suffix, href }) => {
    const str = main ? `
      <li class="leftSidebar__submenu">
        <ul class="submenu">
          ${href ? `<a class="submenu__link" href="${href}" target='_blank'>` : ''}
            <li class="submenu__item leftSidebar__listItem">
              <div
                class="submenu__content ${prefix && prefix.content ? 'hasPrefix' : ''}"
                style="--font-pre: '${prefix.fontFamily || ''}'; --prefix: '${prefix.content || ''}';"
              >
                <p class="submenu__content--wrapper">
                   <span class="submenu__content--main">
                    ${main.content}
                  </span>
                   <span class="submenu__content--suffix">
                    ${suffix}
                  </span>
                </p>
              </div>
            </li>
          ${href ? `</a>` : ''}
        </ul>
      </li>
    ` : '';
    return acc += str;
  }, '')
}

function insertMenu() {
  const elMenu = document.querySelector('#Profile');
  elMenu.innerHTML = getFormatMenu();
}

init();
