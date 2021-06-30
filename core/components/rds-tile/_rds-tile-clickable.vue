<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    ref="target"
    data-tile="clickable"
    :class="`rds-tile-clickable ${carbonPrefix}--tile--clickable`"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>

<script>
import { linkMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';

export default {
  name: 'RdsTileClickable',
  mixins: [linkMixin, carbonPrefixMixin, methodsMixin({ target: ['blur', 'focus'] })],
};
</script>
