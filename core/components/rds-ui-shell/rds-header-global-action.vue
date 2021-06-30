<template>
  <rds-icon-button
    v-on="$listeners"
    :class="[
      `rds-header-global-action`,
      `${carbonPrefix}--header__action`,
      { [`${carbonPrefix}--header__action--active`]: dataActive },
    ]"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    :aria-expanded="active ? 'true' : 'false'"
    @click="gaToggle"
    @focusout="gaFocusout"
    :id="uid"
    :label="label"
    :tipAlignment="tipAlignment"
    :tipPosition="tipPosition"
  >
    <template slot="icon">
      <slot />
    </template>
  </rds-icon-button>
</template>

<script>
import { uidMixin, carbonPrefixMixin } from '../../mixins';
import { RdsIconButton } from '../rds-button';

export default {
  components: { RdsIconButton },
  name: 'RdsHeaderGlobalAction',
  mixins: [uidMixin, carbonPrefixMixin],
  props: {
    active: Boolean,
    ariaControls: String,
    label: { type: String, default: undefined },
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    tipAlignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
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
    };
  },
  watch: {
    expanded() {
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
