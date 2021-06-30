# RdsToolbar

A Vue implementation of a Carbon Components Toolbar (Deprecated).

## Usage

```html
<rds-toolbar>
  <rds-toolbar-search v-model="searchInput" />

  <rds-overflow-menu>
    <template slot="trigger">
      <svg :class="`bx--overflow-menu__icon bx--toolbar-filter-icon`" width="16" height="12" viewBox="0 0 16 12">
        <g fill-rule="nonzero">
          <path
            d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
          ></path>
        </g>
      </svg>
    </template>
    <rds-toolbar-title title="Filter by" />
    <rds-toolbar-option>
      <rds-checkbox value="filter-1" label="Filter option 1" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-checkbox value="filter-2" label="Filter option 2" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-checkbox value="filter-3" label="Filter option 3" />
    </rds-toolbar-option>
  </rds-overflow-menu>

  <rds-overflow-menu>
    <rds-overflow-menu-item primary-focus>Refresh table</rds-overflow-menu-item>
    <rds-toolbar-divider></rds-toolbar-divider>
    <rds-toolbar-title title="ROW HEIGHT" />
    <rds-toolbar-option>
      <rds-radio-button name="row-height" label="Short" value="short" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-radio-button name="row-height" label="Tall" value="tall" />
    </rds-toolbar-option>
  </rds-overflow-menu>
</rds-toolbar>
```

## Slots

- default - Add rds-toolbar-search or rds-overflow-menus here.

NOTE: rds-overflow-menus children should consist of rds-overflow-menu-items (buttons), rds-toolbar-options, rds-toolbar-titles and rds-toolbar-dividers

### Additional

N/A
