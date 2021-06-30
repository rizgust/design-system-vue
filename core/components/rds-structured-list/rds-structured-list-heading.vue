<template>
  <div :class="`rds-structured-list-heading ${carbonPrefix}--structured-list-th`">
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsStructuredListHeading',
  mixins: [carbonPrefixMixin],
};
</script>
