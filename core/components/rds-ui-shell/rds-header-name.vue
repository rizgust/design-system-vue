<template>
  <component :is="tagType" v-on="$listeners" v-bind="linkProps" :class="`rds-header-name ${carbonPrefix}--header__name`">
    <span v-if="prefix" :class="`${carbonPrefix}--header__name--prefix`">{{ prefix }}&nbsp;</span>
    <slot />
  </component>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsHeaderName',
  mixins: [linkMixin, carbonPrefixMixin],
  props: {
    prefix: String,
  },
};
</script>
