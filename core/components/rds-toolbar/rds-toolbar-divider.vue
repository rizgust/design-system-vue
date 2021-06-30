<template>
  <hr :class="`rds-toolbar-divider ${carbonPrefix}--toolbar-menu__divider`" />
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsToolbarDivider',
  mixins: [carbonPrefixMixin],
};
</script>
