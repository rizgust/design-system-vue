<template>
  <ul :class="`rds-side-nav-items ${carbonPrefix}--side-nav__items`" @mousedown="onMousedown">
    <slot />
  </ul>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsSideNavItems',
  mixins: [carbonPrefixMixin],
  methods: {
    onMousedown(ev) {
      if (ev.target === this.$el) {
        // non-css fix for #448
        ev.preventDefault();
      }
    },
  },
};
</script>
