<template>
  <rds-search
    kind="toolbar"
    class="rds-toolbar-search"
    :form-item="false"
    v-bind="$attrs"
    v-on="$listeners"
    @focus="onFocus"
    @blur="onBlur"
    :value="value"
    small
  ></rds-search>
</template>

<script>
import RdsSearch from '../rds-search/rds-search';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsToolbarSearch',
  mixins: [carbonPrefixMixin],
  components: {
    RdsSearch,
  },
  inheritAttrs: false,
  props: {
    value: String,
  },
  methods: {
    onBlur(ev) {
      if (!this.$el.contains(ev.target)) {
        this.$el.classList.remove(`${this.carbonPrefix}--toolbar-search--active`);
      }
    },
    onFocus() {
      this.$el.classList.add(`${this.carbonPrefix}--toolbar-search--active`);
    },
  },
};
</script>
