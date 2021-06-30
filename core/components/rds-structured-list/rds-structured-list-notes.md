# rds-structured-list

A Vue implementation of a Carbon Components structured-list

http://www.carbondesignsystem.com/components/structured-list/code

## Usage

### Default

```html
<rds-structured-list>
  <template slot="headings">
    <rds-structured-list-heading>Heading 1</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 2</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 3</rds-structured-list-heading>
  </template>
  <template slot="items">
    <rds-structured-list-item>
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item>
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item>
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
  </template>
</rds-structured-list>
```

### Selectable with events

```html
<rds-structured-list selectable @change="actionChange">
  <template slot="headings">
    <rds-structured-list-heading>Heading 1</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 2</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 3</rds-structured-list-heading>
  </template>
  <template slot="items">
    <rds-structured-list-item name="group-1" value="value-1" checked>
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item name="group-1" value="value-2">
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item name="group-1" value="value-3">
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
  </template>
</rds-structured-list>
```

### Selectable with v-model

```html
<rds-structured-list selectable>
  <template slot="headings">
    <rds-structured-list-heading>Heading 1</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 2</rds-structured-list-heading>
    <rds-structured-list-heading>Heading 3</rds-structured-list-heading>
  </template>
  <template slot="items">
    <rds-structured-list-item name="group-1" value="value-1" v-model="listVal">
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data>Item_1</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item name="group-1" value="value-2" v-model="listVal">
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data>Item_2</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
    <rds-structured-list-item name="group-1" value="value-3" v-model="listVal">
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data>Item_3</rds-structured-list-data>
      <rds-structured-list-data
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
        bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.</rds-structured-list-data
      >
    </rds-structured-list-item>
  </template>
</rds-structured-list>
```

## Attributes

- selectable - makes rds-structured-list-item selectable
- condensed

## Events

- change - Reports value of child structured list item selection on change.

# rds-structured-list-item

## Attributes

- value - required for selectable
- checked - sets selected

## Events

- change - value of selected item

## v-model

V-model can be attached rds-structured-list-item
