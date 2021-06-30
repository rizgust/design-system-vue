<template>
  <div :class="`rds-structured-list-item--standard ${carbonPrefix}--structured-list-row`">
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsStructuredListItemStandard',
  mixins: [carbonPrefixMixin],
};
</script>
