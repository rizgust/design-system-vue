<template>
  <div
    disabled
    :class="[
      `${carbonPrefix}--list-box ${carbonPrefix}--dropdown ${carbonPrefix}--skeleton`,
      { [`${carbonPrefix}--list-box--inline`]: inline },
    ]"
  ></div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsDropdownSkeleton',
  mixins: [carbonPrefixMixin],
  props: {
    inline: { type: Boolean, default: false },
  },
};
</script>
