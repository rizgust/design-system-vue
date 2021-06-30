# RdsOverflowMenu

A Vue implementation of a Carbon Components overflow menu.

http://www.carbondesignsystem.com/components/overflow-menu/code

## Usage

RdsOverflowMenu contains slotted RdsOverflowMenuItem's which have slotted contents.

```html
<rds-overflow-menu>
  <rds-overflow-menu-item>list item 1</rds-overflow-menu-item>
  <rds-overflow-menu-item>list item 2</rds-overflow-menu-item>
  <rds-overflow-menu-item>list item 3</rds-overflow-menu-item>
</rds-overflow-menu>
```

## RdsOverflowMenu

### Attributes

- flip-menu: Boolean, optionally moves caret from right to left of popup menu
- offset: Object, optional offset setting for left and top position.
  - e.g. { left: 0, top: 200 }
- label: assistive text shown as a tooltip
- tipPosition: top, left, right(default) or bottom
- tipAlignment: start, center(default) or end.

NOTE: Default behaviour (no offset) automatically positions the popup menu.

### Slots

- default content
- trigger - defaults to three dot icon

## RdsOverflowMenuItem

### Attributes

danger: Boolean, optionally make use danger colors for item
disabled: Boolean, optionally disable the item
primary-focus: Boolean, optional initially selected item on menu
