<template>
  <li :class="`rds-switcher-item ${carbonPrefix}--switcher__item`">
    <slot />
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsSwitcherItem',
  mixins: [carbonPrefixMixin],
};
</script>
