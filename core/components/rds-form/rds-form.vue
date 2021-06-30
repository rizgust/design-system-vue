<template>
  <form :class="`rds-form ${carbonPrefix}--form`" v-on="$listeners">
    <slot></slot>
  </form>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsForm',
  mixins: [carbonPrefixMixin],
};
</script>
