# URL map for the ARIA Authoring Practices Guide

> This repository provides an ECMAScript module that exports an object
  that maps the
  [now broken](https://github.com/w3c/aria-practices/issues/2335)
  *WAI-ARIA Authoring Practices 1.2* URLs to
  their new destinations.

If you use Deno to programmatically fix URLs in your own resources, you
can just import the module as is. For Node, copy it to the file system
and change the extension to .mjs if necessary. For other languages, you
probably want to convert it to JSON first.

## Internet Archive

The HTML source of *WAI-ARIA Authoring Practices 1.2* has been
retrieved from the *Internet Archive* and added to this repository
because the origin doesn't allow cross origin requests.

[https://web.archive.org/web/20220321151139/https://www.w3.org/TR/wai-aria-practices-1.2/](https://web.archive.org/web/20220321151139/https://www.w3.org/TR/wai-aria-practices-1.2/)

The injected IA HTML header has been stripped out.

## Tests

There are two tests that can be run in the browser:

- verify that all old URLs are available as keys
- verify that the value URLs can be retrieved and the fragment identifiers match an ID

## Disclaimer

I probably made lots of errors.

## License

MIT
