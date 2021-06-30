<template>
  <component
    :is="tagType"
    v-bind="$attrs"
    v-on="$listeners"
    class="rds-structured-list-item"
    :value="value"
    :modelValue="modelValue"
  >
    <slot></slot>
  </component>
</template>

<script>
import RdsStructuredListItemStandard from './_rds-structured-list-item-standard';
import RdsStructuredListItemSelectable from './_rds-structured-list-item-selectable';

export default {
  name: 'RdsStructuredListItem',
  inheritAttrs: false,
  components: { RdsStructuredListItemStandard, RdsStructuredListItemSelectable },
  props: {
    value: { type: String, default: '' },
    modelValue: { type: String },
  },
  mounted() {
    // pass on rds-structured-list-item-selectable change events
    this.$on('rds:change', val => {
      this.$parent.$emit('rds:change', this.value); // emit to parent
      this.$emit('change', val);
    });
  },
  computed: {
    tagType() {
      return this.selectable ? 'rds-structured-list-item-selectable' : 'rds-structured-list-item-standard';
    },
    selectable() {
      return this.$parent.selectable;
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>
