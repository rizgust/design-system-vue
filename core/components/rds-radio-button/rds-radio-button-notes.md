# rds-radio-button

A Vue implementation of a Carbon Components radio-button

http://www.carbondesignsystem.com/components/radio-button/code

## Usage

### Default

```html
<rds-radio-group @change="actionChange">
  <rds-radio-button name="group-1" label="radio-1" value="value-1" checked />
  <rds-radio-button name="group-1" label="radio-2" value="value-2" />
  <rds-radio-button name="group-1" label="radio-3" value="value-3" disabled />
</rds-radio-group>
```

### With v-model and events

```html
<rds-radio-group @change="actionChange">
  <rds-radio-button name="group-1" label="radio-1" value="value-1" v-model="radioVal" />
  <rds-radio-button name="group-1" label="radio-2" value="value-2" v-model="radioVal" />
  <rds-radio-button name="group-1" label="radio-3" value="value-3" v-model="radioVal" disabled />
</rds-radio-group>
```

NOTE: Any use of v-model causes checked to be ignored
NOTE 2: radioVal is the value of the radio button to be checked.

```javascript
  data() {
    return {
      radioVal: 'value-1',
    },
  }
  //...
```

## Attributes

- checked: true | false
- hideLabel: true | false do not show the label
- label: radio-button label
- labelLeft: true | false position label on left
- value:

## Events

Both the radio button and radio button group raise change events.

## v-model

V-model is used directly with radio buttons.