# rds-slider

A Vue implementation of a Carbon Components slider

http://www.carbondesignsystem.com/components/slider/code

## Usage

```html
<rds-slider label="Slider label" min="0" max="100" value="45"></rds-slider>
```

### v-model

```html
<rds-slider label="Slider input label" min="0" max="100" v-model="modelValue"> </rds-slider>
```

```javascript
...
data() {
  return {
    modelValue: '45', // a string to match underlying slider control
  };
},
```

## Attributes

- label: String slider label
- disabled: standard property
- min: String standard property default 0
- max: String standard property default 100
- value: String standard property default (max + min) / 2
- step: String standard property,
- stepMultiplier: String multiplier > 1,
- minLabel: String label for min side of slider, otehrwise min value used,
- maxLabel: String label for max side of slider, otehrwise max value used,

## events

Change - not cancellable
