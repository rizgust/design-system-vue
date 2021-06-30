<template>
  <rds-wrapper :tag-type="overlay ? 'div' : ''" class="rds-loading" :class="overlayClasses">
    <div
      data-loading
      :class="{
        'rds-loading': !overlay,
        [`${carbonPrefix}--loading`]: active || stopping,
        [`${carbonPrefix}--loading--stop`]: !active && stopping,
        [`${carbonPrefix}--loading--small`]: small,
      }"
      ref="loading"
    >
      <label :class="`${carbonPrefix}--visually-hidden`">
        {{ description }}
      </label>
      <svg :class="`${carbonPrefix}--loading__svg`" viewBox="0 0 100 100">
        <title>{{ description }}</title>
        <circle v-if="small" :class="`${carbonPrefix}--loading__background`" cx="50%" cy="50%" :r="loadingRadius" />
        <circle :class="`${carbonPrefix}--loading__stroke`" cx="50%" cy="50%" :r="loadingRadius" />
      </svg>
    </div>
  </rds-wrapper>
</template>

<script>
import RdsWrapper from '../rds-wrapper/_rds-wrapper';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsLoading',
  mixins: [carbonPrefixMixin],
  components: { RdsWrapper },
  props: {
    active: { type: Boolean, default: true },
    description: { type: String, default: 'Loading' },
    overlay: Boolean,
    small: Boolean,
  },
  computed: {
    overlayClasses() {
      const classes = [];
      if (this.overlay) {
        if (this.active || this.stopping) {
          classes.push(`${this.carbonPrefix}--loading-overlay`);
        } else {
          classes.push(`${this.carbonPrefix}--loading-overlay--stop`);
        }
      }

      return classes;
    },
    loadingRadius() {
      return this.small ? '42' : '44';
    },
  },
  data() {
    return {
      stopping: false,
    };
  },
  watch: {
    active(val) {
      this.onActiveUpdate(val);
    },
  },
  methods: {
    onEnd(ev) {
      if (ev.animationName === 'rotate-end-p2') {
        this.$refs.loading.removeEventListener('animationend', this.onEnd);

        this.stopping = false;
        this.$emit('loading-end');
      }
    },
    onActiveUpdate(newValue) {
      this.stopping = !newValue;
      if (!newValue) {
        this.$refs.loading.addEventListener('animationend', this.onEnd);
      }
    },
  },
};
</script>
