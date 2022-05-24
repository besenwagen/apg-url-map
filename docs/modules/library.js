/* global DOMParser fetch */

const MIME = 'text/html';
const parser = new DOMParser();
const cache = new Map();

const doc = html => parser.parseFromString(html, MIME);

const get = url =>
  fetch(url)
    .then(response => response.text())
    .then(html => doc(html));

const with_url = url =>
  function resolve(dom) {
    cache.set(url, dom);

    return dom;
  };

const with_cache = url =>
  get(url)
    .then(with_url(url));

export function page(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return with_cache(url);
}
