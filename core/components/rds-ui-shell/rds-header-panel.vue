<template>
  <div
    :class="[
      `rds-header-panel`,
      `${carbonPrefix}--header-panel`,
      { [`${carbonPrefix}--header-panel--expanded`]: panelExpanded },
    ]"
    :aria-hidden="!panelExpanded ? 'true' : 'false'"
    :id="id"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsHeaderPanel',
  mixins: [carbonPrefixMixin],
  props: {
    expanded: Boolean,
    id: { type: String, required: true },
  },
  mounted() {
    this.$parent.$emit('rds:panel-mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('rds:panel-beforeDestroy', this);
  },
  data() {
    return {
      dataExpanded: this.expanded,
    };
  },
  model: {
    event: 'modelEvent',
    prop: 'expanded',
  },
  watch: {
    expanded() {
      this.panelExpanded = this.expanded;
    },
  },
  computed: {
    panelExpanded: {
      get() {
        return this.dataExpanded;
      },
      set(val) {
        if (this.dataExpanded !== val) {
          this.dataExpanded = val;
          this.$emit('modelEvent', val);
          this.$emit('panel-resize', this);
        }
      },
    },
  },
  methods: {
    onFocusout(ev) {
      this.$parent.$emit('rds:panel-focusout', this, ev);
    },
    onMouseDown(ev) {
      if (this.$el == ev.target || this.$el.contains(ev.target)) {
        // ignore mousedown on panel can cause focus event
        ev.preventDefault();
      }
    },
  },
};
</script>
