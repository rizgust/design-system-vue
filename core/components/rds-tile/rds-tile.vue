<template>
  <component
    :is="tagType"
    :class="[`rds-tile ${carbonPrefix}--tile`, { [`${carbonPrefix}--tile--light`]: isLight }]"
    :checked="selected"
    :expanded="expanded"
    :tileCollapsedLabel="tileCollapsedLabel"
    :tileExpandedLabel="tileExpandedLabel"
    v-bind="$attrs"
    v-on="$listeners"
    ref="tile"
  >
    <!-- can i now click on this -->
    <template>
      <slot></slot>
    </template>
    <template slot="below">
      <slot name="below"></slot>
    </template>
  </component>
</template>

<script>
import { themeMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';
import RdsTileClickable from './_rds-tile-clickable';
import RdsTileExpandable from './_rds-tile-expandable';
import RdsTileSelectable from './_rds-tile-selectable';
import RdsTileStandard from './_rds-tile-standard';

export default {
  name: 'RdsTile',
  inheritAttrs: false,
  model: {
    // required for selectable kind
    prop: 'modelValue',
    event: 'modelEvent',
  },
  mixins: [themeMixin, carbonPrefixMixin, methodsMixin({ tile: ['blur', 'focus'] })],
  components: {
    RdsTileClickable,
    RdsTileExpandable,
    RdsTileSelectable,
    RdsTileStandard,
  },
  props: {
    expanded: Boolean,
    selected: Boolean,
    tileCollapsedLabel: { type: String, default: 'Tile collapsed' },
    tileExpandedLabel: { type: String, default: 'Tile expanded' },
    kind: {
      type: String,
      default: '',
      validator: value => ['clickable', 'expandable', 'selectable', 'standard', ''].includes(value),
    },
  },
  computed: {
    tagType() {
      switch (this.kind) {
        case 'clickable':
          return 'rds-tile-clickable';
        case 'selectable':
          return 'rds-tile-selectable';
        case 'expandable':
          return 'rds-tile-expandable';
        default:
          return 'rds-tile-standard';
      }
    },
  },
  // methods: {
  //   focus() {
  //     if (this.$children[0].focus) {
  //       this.$children[0].focus();
  //     }
  //   },
  //   blur() {
  //     if (this.$children[0].blur) {
  //       this.$children[0].blur();
  //     }
  //   },
  // },
};
</script>
