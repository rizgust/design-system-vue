# rds-tabs

A Vue implementation of a Carbon Components content switcher.

http://www.carbondesignsystem.com/components/tabs/code

## Usage

```html
<rds-tabs>
  <rds-tab id="tabs-1" label="Tab link 1"> Sample tab panel content 1 </rds-tab>
  <rds-tab id="tabs-2" label="Tab link 2"> Sample tab panel content 2 </rds-tab>
  <rds-tab id="tabs-3" label="Tab link 3"> Sample tab panel content 3 </rds-tab>
  <rds-tab id="tabs-4" label="Tab link 4"> Sample tab panel content 4 </rds-tab>
  <rds-tab id="tabs-5" label="Tab link 5"> Sample tab panel content 5 </rds-tab>
</rds-tabs>
```

## RdsTabs

NOTE: \$attrs are assigned to the nav tab (rds-tabs).

### Attributes

noDefaultToFirst: Boolean - prevents initial default,
container: Boolean - content appears contained

### Events

- tab-selected

## RdsTab

### Slots

- default: Location for tab content

### Attributes - rds-tab

- id: required
- selected: optional
- label: required label for tab link
- disabled: optional
- no-default-to-first: Boolean - failure to select a tab or removal of selected tab will not cause the a tab to be selected
