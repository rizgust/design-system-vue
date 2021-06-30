<template>
  <div :class="`rds-radio-group ${carbonPrefix}--form-item`">
    <div
      :class="[`${carbonPrefix}--radio-button-group`, { [`${carbonPrefix}--radio-button-group--vertical`]: vertical }]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsRadioGroup',
  mixins: [carbonPrefixMixin],
  props: {
    vertical: Boolean,
  },
  mounted() {
    // pass on rds-radio-button change events
    this.$on('rds:change', val => this.$emit('change', val));
  },
};
</script>
