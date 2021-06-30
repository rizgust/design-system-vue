<template>
  <div class="rds-checkbox" :class="`${carbonPrefix}--form-item ${carbonPrefix}--checkbox-wrapper`">
    <label :class="`${carbonPrefix}--checkbox-label ${carbonPrefix}--skeleton`">
      <span :class="`${carbonPrefix}--checkbox-label-text ${carbonPrefix}--skeleton`"></span>
    </label>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsCheckboxSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
