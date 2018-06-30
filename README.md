# SortableJs

> Project is WIP, it's not advisable to use it for professionnal project.

Sortable is a javascript plugin allow you to reorganize elements from a "masonry" grid.
## Quick start
> ### Install
> This package cannot be installed with npm/yarn yet.
> <br>
> Waiting for a stable version.

### Load
**Static HTML**

> The next major version expect to use a css file for animations 

Put the script at the bottom of your markup:

```js
<script src="[YOUR_PATH]/sortablejs.min.js"></script>
```

### Usage
1. Create links (a) that have the attribute `data-sortablejs` with an identification value corresponding to a family (ex: food, development, red, etc.).
2. Wrap your items (div, a, img, span, li etc.) with an item element (div, ul etc.) that have the attribute `data-sortablejs` with an identification value corresponding to his family.
3. Wrap your items (div, a, img, span, li etc.) with a container element (div, ul etc.) that have the attribute `id="sortable"`.


```html
<!-- 1st step -->
<ul>
    <li>
        <a data-sortablejs="food">
            [...]
        </a>
    </li>
    <li>
        <a data-sortablejs="development">
            [...]
        </a>
    </li>
</ul>

<!-- 3st step -->
<div id="sortable">

    <!-- 1nd step -->
    <div data-sortablejs="food"> [...] </div>
    <div data-sortablejs="development"> [...] </div>
    <div data-sortablejs="development"> [...] </div>
</div>
```
**NOTE:** The 2nd step is optional if your items don't have "transition" css property, because SortableJs apply "transition" and "transform" style for items that have `data-sortablejs` attribute.
<br>
**WARNING:** If you skip the 2nd step, don't forget to add `data-sortablejs` attribute to your items.

Call the plugin function and it's work !

```js
<script type="text/javascript">
    var sortable = new Sortable();
</script>
```

## Documentation
Please red [OPTIONS.md](https://github.com/TristanBlg/sortableJs/blob/master/docs/OPTIONS.md).