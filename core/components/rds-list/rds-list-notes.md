# RdsList

A Vue implementation of a Carbon Components list

http://www.carbondesignsystem.com/components/list/code

## Usage

### unordered

```html
<rds-list>
  <rds-list-item>list item 1</rds-list-item>
  <rds-list-item>list item 2</rds-list-item>
  <rds-list-item>list item 3</rds-list-item>
</rds-list>
```

### ordered

```html
<rds-list ordered>
  <rds-list-item>list item 1</rds-list-item>
  <rds-list-item>list item 2</rds-list-item>
  <rds-list-item>list item 3</rds-list-item>
</rds-list>
```

### with nested

Lists can be nested inside of each other.

```html
<rds-list>
  <rds-list-item>
    list item 1
    <rds-list nested ordered>
      <!-- order based on own setting -->
      <rds-list-item>nested item 1</rds-list-item>
      <rds-list-item>nested item 2</rds-list-item>
      <rds-list-item>nested item 3</rds-list-item>
    </rds-list>
    <rds-list nested>
      <!-- ordered setting based on parent setting -->
      <rds-list-item>nested item 1</rds-list-item>
      <rds-list-item>nested item 2</rds-list-item>
      <rds-list-item>nested item 3</rds-list-item>
    </rds-list>
  </rds-list-item>
  <rds-list-item>list item 2</rds-list-item>
  <rds-list-item>list item 3</rds-list-item>
</rds-list>
```

## Attributes

ordered - if set list is numbered, if ommitted and nested the parent list setting is used.
nested - if set list uses nested form
