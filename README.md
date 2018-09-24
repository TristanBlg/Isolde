[![npm: v1.1.6](https://img.shields.io/badge/npm-v1.1.6-blue.svg)](https://www.npmjs.com/package/isolde)

# Isolde

Isolde is a lightweight, flexible, and responsive javascript plugin allow you to filter elements from a "masonry" grid.

## Quick start
### Install

This package can be installed with:
```
npm install isolde
```

Or download the [latest release](https://github.com/TristanBlg/Isolde/releases).

### Load

```js
import isolde from 'isolde';
import 'isolde/dist/isolde.min.css';

const ijs = new isolde();
```

### Usage
1. Create links (a, div, etc.) that have the attribute `data-isolde-link` with an identification value corresponding to a family (ex: food, development, etc.).
2. Wrap your items with blocks (li, div, etc.) that have the attribute `data-isolde-el` with an identification value corresponding to their family.
3. Wrap your blocks with a container (ul, div, etc.) that have a className `class="isolde-default"` and an id `id="isolde"`.


```html
<!-- 1st step -->
<ul>
  <li>
    <a data-isolde-link="all"> [...] </a>
  </li>
  <li>
    <a data-isolde-link="food"> [...] </a>
  </li>
  <li>
    <a data-isolde-link="development"> [...] </a>
  </li>
</ul>

<!-- 3st step -->
<div id="isolde" class="isolde-default">

  <!-- 2nd step -->
  <div data-isolde-el="food"> [...] </div>
  <div data-isolde-el="development"> [...] </div>
  <div data-isolde-el="development"> [...] </div>
</div>
```

## Documentation
[Doc](https://github.com/TristanBlg/sortableJs/blob/master/docs/OPTIONS.md)

## License
[MIT](https://github.com/TristanBlg/sortableJs/blob/master/LICENSE.md)