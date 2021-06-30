<template>
  <div
    class="rds-tab"
    :id="uid"
    role="tabpanel"
    :aria-labelledby="`${uid}-link`"
    :aria-hidden="!dataSelected ? 'true' : 'false'"
    :hidden="!dataSelected"
  >
    <slot>
      <!-- Content for first tab goes here. -->
    </slot>
  </div>
</template>

<script>
import { uidMixin } from '../../mixins';

export default {
  name: 'RdsTab',
  mixins: [uidMixin],
  props: {
    selected: Boolean,
    disabled: Boolean,
    label: { type: String, required: true },
  },
  data() {
    return {
      dataSelected: this.selected,
    };
  },
  watch: {
    selected() {
      if (this.selected) {
        this.$parent.$emit('rds:selected', this);
      }
    },
    disabled() {
      if (this.disabled) {
        this.$parent.$emit('rds:disabled', this);
      } else {
        this.$parent.$emit('rds:enabled', this);
      }
    },
  },
  computed: {
    internalSelected: {
      get() {
        return this.dataSelected;
      },
      set(val) {
        this.dataSelected = val;
      },
    },
    internalDisabled() {
      return this.disabled;
    },
  },
  mounted() {
    this.$_RdsTab = true; // for use by parent with $children

    this.$parent.$emit('rds:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('rds:beforeDestroy', this);
  },
};
</script>
