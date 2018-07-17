# SortableJs

Sortable is a javascript plugin allow you to reorganize elements from a "masonry" grid.

Demo: [https://sortablejs.tristanboulanger.fr/](https://sortablejs.tristanboulanger.fr/)

## Quick start
### Install
> This package cannot be install with npm/yarn yet.
> <br>
> Waiting for a clean review.

### Load
**Static HTML**

Put the script and the stylesheet at the bottom of your markup:

```html
<link rel="stylesheet" href="[__YOUR_PATH__]/sortable.min.css">
<script src="[__YOUR_PATH__]/sortable.min.js"></script>
```

### Usage
1. Create links (a, div, etc.) that have the attribute `data-sjslink` with an identification value corresponding to a family (ex: food, development, etc.).
2. Wrap your items with blocks (li, div, etc.) that have the attribute `data-sjsel` with an identification value corresponding to their family.
3. Wrap your blocks with a container (ul, div, etc.) that have a className `class="sjs-default"` and an id `id="sortable"`.


```html
<!-- 1st step -->
<ul>
  <li>
    <a data-sjslink="food"> [...] </a>
  </li>
  <li>
    <a data-sjslink="development"> [...] </a>
  </li>
</ul>

<!-- 3st step -->
<div id="sortable" class="sjs-default">

  <!-- 2nd step -->
  <div data-sjsel="food"> [...] </div>
  <div data-sjsel="development"> [...] </div>
  <div data-sjsel="development"> [...] </div>
</div>
```

Call the plugin and it works !

```html
<script type="text/javascript">
  document.querySelector('#sortable').sortablejs()
</script>
```

## Documentation
Please read [OPTIONS.md](https://github.com/TristanBlg/sortableJs/blob/master/docs/OPTIONS.md).