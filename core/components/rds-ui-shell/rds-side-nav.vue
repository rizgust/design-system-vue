<template>
  <nav
    :class="[
      `rds-side-nav`,
      `${carbonPrefix}--side-nav`,
      `${carbonPrefix}--side-nav__navigation`,
      {
        [`${carbonPrefix}--side-nav--expanded`]: panelExpanded,
        [`${carbonPrefix}--side-nav--rail`]: rail,
        [`${carbonPrefix}--side-nav--collapsed`]: !panelExpanded && fixed,
        [`${carbonPrefix}--side-nav--ux`]: isChildOfHeader,
      },
    ]"
    :aria-hidden="!panelExpanded && !fixed ? 'true' : 'false'"
    :id="id"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
  >
    <slot></slot>
    <rds-side-nav-footer
      v-if="!fixed && !rail && !headerEmbedded"
      :expanded="panelExpanded"
      :assistiveText="assistiveToggleText"
      @toggle-expand="toggleExpand"
    />
  </nav>
</template>

<script>
import RdsSideNavFooter from './_rds-side-nav-footer';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsSideNav',
  components: { RdsSideNavFooter },
  mixins: [carbonPrefixMixin],
  props: {
    expanded: Boolean,
    fixed: Boolean,
    id: { type: String, required: true },
    assistiveToggleText: String,
    rail: Boolean,
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
      headerEmbedded: false,
    };
  },
  watch: {
    expanded() {
      this.panelExpanded = this.expanded;
    },
  },
  computed: {
    isChildOfHeader() {
      return this.$parent.isRdsHeader;
    },
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
    toggleExpand() {
      this.panelExpanded = !this.dataExpanded;
    },
  },
  model: {
    event: 'modelEvent',
    prop: 'expanded',
  },
};
</script>
