# rds-tile

A Vue implementation of a Carbon Components tile

http://www.carbondesignsystem.com/components/tile/code

## Usage

The tile comes in four types selected by the kind attribute.

### standard

```html
<<rds-tile kind="standard"> Tile content </rds-tile>
```

### selectable

```html
<rds-tile rds-type="selectable" rds-selected> Tile content </rds-tile>
```

### Clickable

```html
<rds-tile rds-type="clickable"> Tile content </rds-tile>
```

### Expandable

```HTML
<rds-tile
  rds-type="expandable"
  expanded
  tileCollapsedLabel,
  tileExpandedLabel,
  >
  Tile content
  <template slot="below">Below the fold content</template>
</rds-tile>
```

## Attributes

- kind: 'standard', 'clickable', 'expandable' or 'selectable'
- selected: Selectable kind only sets initial state to selected
- expanded: Expandable kind only sets initial state to expanded
- tileCollapsedLabel: String expandable kind only default: 'Tile collapsed'
- tileExpandedLabel: String expandable kind only default: 'Tile expanded'

### Clickable kind

The clickable kind is intended as a navigation link. Users should supply href or click handling.

### Selectable kind is based on an input. Users should supply name and value if needed.

Has the following unique attribute

- ariaLabel: { type: String, default: 'tile' },

## slots

- default: Content of tile (above fold in expandable)
- below: Content placed below the fold in the expandable version.
