# rds-checkbox

A Vue implementation of a Carbon Components checkbox

http://www.carbondesignsystem.com/components/checkbox/code

## Usage

### Default

```html
<rds-checkbox label="checkbox" @change="actionChange"> </rds-checkbox>
```

### mixed

```html
<rds-checkbox label="checkbox" mixed @change="actionChange"> </rds-checkbox>
```

### With v-model

```html
<rds-checkbox label="checkbox" v-model="checked" @change="actionChange"> </rds-checkbox>
```

```javascript
  data() {
    return {
      checked: Boolean,
    },
  }
  //...
```

### With v-model Array

```
html
<rds-checkbox v-model="checks" name="check-1" value="check-1" @change="actionChange" label="check-1"></rds-checkbox>
<rds-checkbox v-model="checks" name="check-2" value="check-2" @change="actionChange" label="check-2" mixed></rds-checkbox>
<rds-checkbox v-model="checks" name="check-3" value="check-3" @change="actionChange" label="check-3"></rds-checkbox>
<rds-checkbox v-model="checks" name="check-4" value="check-4" @change="actionChange" label="check-4" mixed></rds-checkbox>
```

```javascript
  data() {
    return {
      checks: ['check-3', 'check-4'], // check-3 and check-4 initially checked
    },
  }
  //...
```

## Attributes

- checked: true | false
- disabled: standard HTML checkbox property
- hideLabel: makes the label visually hidden but still labels the checkbox
- label: checkbox label
- mixed: if true aria-checkbox set to mixed if checked is false
