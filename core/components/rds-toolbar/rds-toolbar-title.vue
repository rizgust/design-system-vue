<template>
  <li :class="`rds-toolbar-title ${carbonPrefix}--toolbar-menu__title`">{{ title }}</li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsToolbarTitle',
  mixins: [carbonPrefixMixin],
  props: {
    title: { type: String, required: true },
  },
};
</script>
