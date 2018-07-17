# Options

## Selectors
### Parent
```html
<script type="text/javascript">
  [__PARENT__].sortablejs();
</script>
```

Example: 

```html
<div id="sortable"> [...] </div>

<script type="text/javascript">
  document.querySelector('#sortable').sortablejs();
</script>
```

**NOTE:** Value expect is a HTMLElement

### Links
```html
<script type="text/javascript">
  [__PARENT__].sortablejs({
    links: [...]
  });
</script>
```

Default: `document.querySelectorAll('[data-sjslink]')`

**NOTE:** Value expect is a nodeList or an Array

## Others
### Responsive (column, etc.)
```html
<script type="text/javascript">
  [__PARENT__].sortablejs({
    responsive: [...]
  });
</script>
```

Default: 

```js
{
  980: {
    columns: 3
  },
  480: {
    columns: 2
  },
  0: {
    columns: 1
  }
}
```

Example:

```html
<script type="text/javascript">
  [__PARENT__].sortablejs({
    responsive: {
      1170: {
        columns: 4
      },
      768: {
        columns: 3
      },
      0: {
        columns: 2
      }
    }
  });
</script>
```

### Margin
```html
<script type="text/javascript">
  [__PARENT__].sortablejs({
    margin: [...]
  });
</script>
```

Default: `20`

**NOTE:** Value is in pixel

### Active className
```html
<script type="text/javascript">
  [__PARENT__].sortablejs({
    active: [...]
  });
</script>
```

Default: `is-active`
