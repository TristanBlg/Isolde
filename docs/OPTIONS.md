# Options

## Selectors
### Parent
```js
<script type="text/javascript">
    var sortable = new Sortable({
        parent: [...]
    });
</script>
```

Default: `document.querySelector('#sortable')`

**NOTE:** Value expect is a nodeElement

### Links
```js
<script type="text/javascript">
    var sortable = new Sortable({
        links  = [...]
    });
</script>
```

Default: `document.querySelectorAll('a[data-sortablejs]')`

**NOTE:** Value expect is a nodeList or an Array

## Others
### Responsive (column, etc.)
```js
<script type="text/javascript">
    var sortable = new Sortable({
        links: [...]
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

```js
<script type="text/javascript">
    var sortable = new Sortable({
        responsive  = {
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
```js
<script type="text/javascript">
    var sortable = new Sortable({
        margin  = [...]
    });
</script>
```

Default: `20`

**NOTE:** Value is in pixel

### Active className
```js
<script type="text/javascript">
    var sortable = new Sortable({
        active  = [...]
    });
</script>
```

Default: `is-active`