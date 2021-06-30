<template>
  <header :class="`rds-header ${carbonPrefix}--header`" data-header>
    <slot />
    <div v-if="hasGlobalHeader" :class="`${carbonPrefix}--header__global`">
      <slot name="header-global" />
    </div>
    <slot name="left-panels" />
    <slot name="right-panels" />
  </header>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsHeader',
  mixins: [carbonPrefixMixin],
  created() {
    // add these on created otherwise rds:mounted is too late.
    this.$on('rds:panel-control-mounted', this.onRdsPanelControlMounted);
    this.$on('rds:panel-control-beforeDestroy', this.onRdsPanelControlBeforeDestroy);
    this.$on('rds:panel-control-toggle', this.onRdsPanelControlToggle);
    this.$on('rds:panel-control-focusout', this.onRdsPanelControlFocusout);
    this.$on('rds:panel-mounted', this.onRdsPanelMounted);
    this.$on('rds:panel-beforeDestroy', this.onRdsPanelBeforeDestroy);
    this.$on('rds:panel-focusout', this.onRdsPanelFocusout);
  },
  data() {
    return {
      panelControllers: [],
      panels: [],
      hasGlobalHeader: false,
    };
  },
  mounted() {
    // NOTE: this.$slots is not reactive so needs to be managed on updated
    this.hasGlobalHeader = !!this.$slots['header-global'];
  },
  updated() {
    this.hasGlobalHeader = !!this.$slots['header-global'];
  },
  computed: {
    isRdsHeader() {
      return true;
    },
  },
  methods: {
    hasRail(_ctrl, _panel) {
      let panel = _panel;
      let ctrl = _ctrl;
      if (ctrl) {
        panel = this.panels.find(item => item.id === ctrl.ariaControls);
      } else {
        if (panel) {
          ctrl = this.panelControllers.find(item => item.ariaControls === panel.id);
        }
      }
      if (ctrl) {
        ctrl.hasRail = !!(panel && ctrl) && panel.rail;
      }
    },
    onRdsPanelControlMounted(srcComponent) {
      this.panelControllers.push(srcComponent);
      this.hasRail(srcComponent);
    },
    onRdsPanelControlBeforeDestroy(srcComponent) {
      const index = this.panelControllers.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panelControllers.splice(index, 1);
      }
    },
    onRdsPanelControlToggle(srcComponent, force) {
      const foundIndex = this.panels.findIndex(item => item.id === srcComponent.ariaControls);
      if (foundIndex > -1) {
        const newValue = force !== undefined ? force : !srcComponent.panelExpanded;

        for (let index in this.panels) {
          this.panels[index].panelExpanded = false;
        }
        for (let index in this.panelControllers) {
          this.panelControllers[index].panelExpanded = false;
        }

        srcComponent.panelExpanded = newValue;
        this.panels[foundIndex].panelExpanded = newValue;
      }
    },
    onRdsPanelControlFocusout(srcComponent, srcEvent) {
      const found = this.panels.find(item => item.id === srcComponent.ariaControls);

      if (found && !found.rail && found.$el !== srcEvent.relatedTarget && !found.$el.contains(srcEvent.relatedTarget)) {
        // close when not a rail
        this.onRdsPanelControlToggle(srcComponent, false);
      }
    },
    onRdsPanelMounted(srcComponent) {
      this.panels.push(srcComponent);
      srcComponent.headerEmbedded = true;
      this.hasRail(undefined, srcComponent);
    },
    onRdsPanelBeforeDestroy(srcComponent) {
      const index = this.panels.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panels.splice(index, 1);
      }
    },
    onRdsPanelFocusout(srcComponent, srcEvent) {
      const found = this.panelControllers.find(item => item.ariaControls === srcComponent.id);
      if (
        srcComponent.$el !== srcEvent.relatedTarget &&
        !srcComponent.$el.contains(srcEvent.relatedTarget) &&
        found &&
        found.$el !== srcEvent.relatedTarget
      ) {
        this.onRdsPanelControlToggle(found, false);
      }
    },
  },
};
</script>
