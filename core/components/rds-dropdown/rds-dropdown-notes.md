# RDS Dropdown

A Vue implementation of a Carbon Components dropdown

https://www.carbondesignsystem.com/components/dropdown/code

## Usage

```html
<rds-dropdown class="rds-dropdown" placeholder="Choose an option">
  <rds-dropdown-item value="10">Option 1</rds-dropdown-item>
  <rds-dropdown-item value="20">Option 2</rds-dropdown-item>
  <rds-dropdown-item value="30">Option 3</rds-dropdown-item>
  <rds-dropdown-item value="40">Option 4</rds-dropdown-item>
  <rds-dropdown-item value="50">Option 5</rds-dropdown-item>
</rds-dropdown>
```

## Attributes

### rds-dropdown

- placeholder - The descriptive text appearing at the top of the dropdown
- up - diretction of dropdown
- value - string matching value of one of the options or ''

## Methods

Focus - sets focus to the text dropdown

### rds-dropdown-item

- value - The value that will be returned upon selection of the dropdown item by users

## Slots

- rds-dropdown - Takes a list of rds-dropdown-item as children
- rds-dropdown-item - Takes the text to display as child

## Events

- @change sends the value as it changes.
