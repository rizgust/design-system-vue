<template>
  <div
    :class="[
      `rds-structured-list-data ${carbonPrefix}--structured-list-td`,
      {
        [`${carbonPrefix}--structured-list-content--nowrap`]: noWrap,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsStructuredListData',
  mixins: [carbonPrefixMixin],
  props: {
    noWrap: Boolean,
  },
};
</script>
