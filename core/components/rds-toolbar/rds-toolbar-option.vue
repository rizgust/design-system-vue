<template>
  <li
    :class="`rds-toolbar-option ${carbonPrefix}--toolbar-menu__option`"
    @keydown.esc.prevent="$parent.$emit('rds:close')"
  >
    <slot></slot>
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsToolbarOption',
  mixins: [carbonPrefixMixin],
};
</script>
