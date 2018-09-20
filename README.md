[![npm: v1.1.2](https://img.shields.io/badge/npm-v1.1.2-blue.svg)](https://www.npmjs.com/package/isolde)

# Isolde

Isolde is a lightweight, flexible, and responsive javascript plugin allow you to filter elements from a "masonry" grid.

[Demo](https://sortablejs.tristanboulanger.fr/)

## Quick start
### Install
```
npm i isolde
```

### Load
**Static HTML**

Put the required stylesheet at the top of your markup:

```html
<link rel="stylesheet" href="[__YOUR_PATH__]/isolde.min.css">
```

Put the script at the bottom of your markup:

```html
<script type="module">
  import isolde from '[__YOUR_PATH__]/isolde.min.js';
  const isoldejs = new isolde();
</script>
```

### Usage
1. Create links (a, div, etc.) that have the attribute `data-isolde-link` with an identification value corresponding to a family (ex: food, development, etc.).
2. Wrap your items with blocks (li, div, etc.) that have the attribute `data-isolde-el` with an identification value corresponding to their family.
3. Wrap your blocks with a container (ul, div, etc.) that have a className `class="isolde-default"` and an id `id="isolde"`.


```html
<!-- 1st step -->
<ul>
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