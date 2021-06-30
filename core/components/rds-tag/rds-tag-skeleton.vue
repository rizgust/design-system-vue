<template>
  <div
    :class="[`rds-tag ${carbonPrefix}--tag ${carbonPrefix}--skeleton`, { [`${carbonPrefix}--tag--${size}`]: size }]"
  ></div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsTagSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    size: {
      type: String,
      validator(val) {
        return !val || val == 'sm';
      },
    },
  },
};
</script>
