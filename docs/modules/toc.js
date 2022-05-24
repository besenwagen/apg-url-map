import url_map from '../url-map.js';

const { entries } = Object;

/* global document */

const list = document.createElement('UL');

for (const [from, to] of entries(url_map)) {
  const item = document.createElement('LI');
  const link = document.createElement('A');

  link.setAttribute('href', to);
  link.appendChild(document.createTextNode(from));
  item.appendChild(link);
  list.appendChild(item);
}

document.body.appendChild(list);
