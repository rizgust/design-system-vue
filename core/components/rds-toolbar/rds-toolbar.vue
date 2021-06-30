<template>
  <div :class="`${carbonPrefix}--toolbar`" data-toolbar>
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsToolbar',
  mixins: [carbonPrefixMixin],
};
</script>
