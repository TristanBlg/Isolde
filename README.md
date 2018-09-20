# Pronkt

Pronkt is a lightweight, flexible, and responsive javascript plugin allow you to filter elements from a "masonry" grid.

[Demo](https://sortablejs.tristanboulanger.fr/)

## Quick start
### Install
```
npm i pronkt
```

### Load
**Static HTML**

Put the required stylesheet at the top of your markup:

```html
<link rel="stylesheet" href="[__YOUR_PATH__]/pronkt.min.css">
```

Put the script at the bottom of your markup:

```html
<script type="module">
  import pronkt from '[__YOUR_PATH__]/pronkt.js';
  const pkt = new pronkt();
</script>
```

### Usage
1. Create links (a, div, etc.) that have the attribute `data-pronkt-link` with an identification value corresponding to a family (ex: food, development, etc.).
2. Wrap your items with blocks (li, div, etc.) that have the attribute `data-pronkt-el` with an identification value corresponding to their family.
3. Wrap your blocks with a container (ul, div, etc.) that have a className `class="pronkt-default"` and an id `id="pronkt"`.


```html
<!-- 1st step -->
<ul>
  <li>
    <a data-pronkt-link="food"> [...] </a>
  </li>
  <li>
    <a data-pronkt-link="development"> [...] </a>
  </li>
</ul>

<!-- 3st step -->
<div id="pronkt" class="pronkt-default">

  <!-- 2nd step -->
  <div data-pronkt-el="food"> [...] </div>
  <div data-pronkt-el="development"> [...] </div>
  <div data-pronkt-el="development"> [...] </div>
</div>
```

## Documentation
[Doc](https://github.com/TristanBlg/sortableJs/blob/master/docs/OPTIONS.md)

## License
[MIT](https://github.com/TristanBlg/sortableJs/blob/master/LICENSE.md)