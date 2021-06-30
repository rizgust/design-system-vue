<template>
  <ul :class="`rds-switcher ${carbonPrefix}--switcher__item`">
    <slot />
  </ul>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsSwitcher',
  mixins: [carbonPrefixMixin],
};
</script>
