<template>
  <div
    class="rds-row"
    :class="[
      `${carbonPrefix}--row`,
      {
        [`${carbonPrefix}--row--condensed`]: kind === 'condensed',
        [`${carbonPrefix}--row--narrow`]: kind === 'narrow',
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'RdsRow',
  mixins: [carbonPrefixMixin],
  props: {
    kind: {
      type: String,
      default: 'wide',
      validator: val => ['wide', 'narrow', 'condensed'].includes(val),
    },
  },
};
</script>
