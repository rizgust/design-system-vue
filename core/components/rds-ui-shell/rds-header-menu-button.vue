<template>
  <button
    v-on="$listeners"
    class="rds-header-menu-button"
    :class="[
      `${carbonPrefix}--header__action`,
      `${carbonPrefix}--header__menu-trigger`,
      `${carbonPrefix}--header__menu-toggle`,
      {
        [`${carbonPrefix}--header__action--active`]: dataActive,
        [`${carbonPrefix}--header__menu-toggle__hidden`]: !hasRail,
      },
    ]"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    :aria-expanded="active ? 'true' : 'false'"
    @click="gaToggle"
    @focusout="gaFocusout"
    :id="uid"
  >
    <Close20 v-if="dataActive" />
    <Menu20 v-if="!dataActive" />
  </button>
</template>

<script>
import { uidMixin, carbonPrefixMixin } from '../../mixins';
import Close20 from '@carbon/icons-vue/es/close/20';
import Menu20 from '@carbon/icons-vue/es/menu/20';

export default {
  name: 'RdsHeaderMenuButton',
  mixins: [uidMixin, carbonPrefixMixin],
  components: { Close20, Menu20 },
  props: {
    active: Boolean,
    ariaControls: { type: String, required: true },
  },
  mounted() {
    this.$parent.$emit('rds:panel-control-mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('rds:panel-control-beforeDestroy', this);
  },
  data() {
    return {
      dataActive: this.active,
      hasRail: false,
    };
  },
  watch: {
    active() {
      if (this.active !== this.dataActive) {
        this.gaToggle();
      }
    },
  },
  computed: {
    panelExpanded: {
      get() {
        return this.dataActive;
      },
      set(val) {
        // do not emit 'rds:panel-control-toggle'
        this.dataActive = val;
      },
    },
  },
  methods: {
    gaToggle() {
      this.$el.focus();
      this.$parent.$emit('rds:panel-control-toggle', this);
    },
    gaFocusout(ev) {
      this.$parent.$emit('rds:panel-control-focusout', this, ev);
    },
  },
};
</script>
