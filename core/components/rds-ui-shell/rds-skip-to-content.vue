<template>
  <component
    :is="tagType"
    v-on="$listeners"
    v-bind="linkProps"
    :class="`rds-skip-to-content ${carbonPrefix}--skip-to-content`"
  >
    <slot>Skip to main content</slot>
  </component>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsSkipToContent',
  mixins: [linkMixin, carbonPrefixMixin],
};
</script>
