<template>
  <div class="rds-button-set" :class="[`${carbonPrefix}--btn-set`, { [`${carbonPrefix}--btn-set--stacked`]: stacked }]">
    <slot />
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsButtonSet',
  mixins: [carbonPrefixMixin],
  props: {
    stacked: Boolean,
  },
};
</script>
