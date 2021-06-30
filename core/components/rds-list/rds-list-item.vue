<template>
  <li :class="`rds-list-item ${carbonPrefix}--list__item`">
    <slot></slot>
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsListItem',
  mixins: [carbonPrefixMixin],
};
</script>
