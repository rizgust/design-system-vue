<template>
  <div :class="`rds-form-item ${carbonPrefix}--form-item`">
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsFormItem',
  mixins: [carbonPrefixMixin],
};
</script>
