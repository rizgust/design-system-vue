# rds-select

A Vue implementation of a Carbon Components select

http://www.carbondesignsystem.com/components/select/code

## Usage

### Default

```html
<rds-select label="test-label" @change="actionChange">
  <rds-select-option disabled selected hidden>Choose an option</rds-select-option>
  <rds-select-option value="solong"
    >A much longer rds-select-option that is worth having around to check how text flows</rds-select-option
  >
  <rds-select-optgroup label="Category 1">
    <rds-select-option value="rds-select-option1">rds-select-option 1</rds-select-option>
    <rds-select-option value="rds-select-option2">rds-select-option 2</rds-select-option>
  </rds-select-optgroup>
  <rds-select-optgroup label="Category 2">
    <rds-select-option value="rds-select-option3">rds-select-option 3</rds-select-option>
    <rds-select-option value="rds-select-option4">rds-select-option 4</rds-select-option>
  </rds-select-optgroup>
</rds-select>
```

### With v-model

```html
<rds-select label="test-label" @change="actionChange" v-model="selectValue">
  <rds-select-option disabled hidden>Choose an option</rds-select-option>
  <rds-select-option value="solong"
    >A much longer rds-select-option that is worth having around to check how text flows</rds-select-option
  >
  <rds-select-optgroup label="Category 1">
    <rds-select-option value="rds-select-option1">rds-select-option 1</rds-select-option>
    <rds-select-option value="rds-select-option2">rds-select-option 2</rds-select-option>
  </rds-select-optgroup>
  <rds-select-optgroup label="Category 2">
    <rds-select-option value="rds-select-option3">rds-select-option 3</rds-select-option>
    <rds-select-option value="rds-select-option4">rds-select-option 4</rds-select-option>
  </rds-select-optgroup>
</rds-select>
```

NOTE: Any use of v-model causes selected to be ignored

```javascript
  data() {
    return {
      selectValue: 'Choose an option',
    },
  }
  //...
```

## Slots

### rds-select

- default contains rds-select-options and rds-select-optgroups

### rds-select-option

- default contents to label option

### rds-select-optgroup

- default: contains rds-select options

## Attributes

### rds-select

- label

### rds-select-optgroup

- label
