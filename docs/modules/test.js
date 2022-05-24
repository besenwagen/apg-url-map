import { page } from './library.js';
import url_map from '../url-map.js';

const { keys, values } = Object;

/* global document */

const status = new Map([
  [true, 'pass'],
  [false, 'fail'],
]);

function initialize(element) {
  element.replaceChildren(document.createTextNode('busy'));
}

function done(element, errors) {
  const result = status.get(!errors.length);

  element.replaceChildren(document.createTextNode(result));
}

{ // 1 of 1: test if all legacy URLs are keys of the URL map
  const TR_URL = 'https://www.w3.org/TR/wai-aria-practices-1.2/';
  const SNAPSHOT_APRIL = '20220321151139';
  const ARCHIVE_PATH = `./archive/${SNAPSHOT_APRIL}.html`;
  const url_status = document.getElementById('url-status');
  const map_keys = keys(url_map);
  const errors = [];

  const dedupe = array => [...new Set(array)];

  const to_href = a => a.getAttribute('href');

  const to_absolute = fragment => [TR_URL, fragment].join('');

  const internal = href => /^#/.test(href);

  function test(item) {
    if (!map_keys.includes(item)) {
      errors.push(item);
      console.error(item);
    }
  }

  function resolve(doc) {
    const urls = [...doc.querySelectorAll('a[href]')]
      .map(to_href)
      .filter(internal)
      .map(to_absolute);
    const unique = dedupe(urls);

    for (const item of unique) {
      test(item);
    }

    done(url_status, errors);
  }

  initialize(url_status);
  page(ARCHIVE_PATH).then(resolve);
}

{ // 2 of 2: test if all fragment identifiers for the new URLs match element IDs
  const fragment_status = document.getElementById('fragment-status');
  const map_values = values(url_map);
  const errors = [];

  async function test(url) {
    const [base, fragment] = url.split('#');

    function resolve(doc) {
      if (fragment && !doc.getElementById(fragment)) {
        errors.push(url);
        console.error(fragment, base);
      }
    }

    return page(base).then(resolve);
  }

  initialize(fragment_status);

  for (const url of map_values) {
    // since most URLs are requested multiple times for this test,
    // wait for the parsed response to be cached
    await test(url);
  }

  done(fragment_status, errors);
}
