<template>
  <optgroup :class="`rds-select-optgroup ${carbonPrefix}--select-optgroup`">
    <slot></slot>
  </optgroup>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsSelectOptgroup',
  mixins: [carbonPrefixMixin],
  // html props: label
};
</script>
