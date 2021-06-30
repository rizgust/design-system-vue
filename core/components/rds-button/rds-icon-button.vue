<template>
  <button
    :aria-pressed="kind === 'ghost' && selected"
    class="rds-button"
    :class="[
      ...buttonClassOpts({ iconOnly: true }),
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${tipPosition || 'bottom'}`,
      `${carbonPrefix}--tooltip--align-${tipAlignment || 'center'}`,
    ]"
    v-on="inputListeners"
    type="button"
  >
    <span :class="`${carbonPrefix}--assistive-text`">{{ label }}</span>
    <slot name="icon">
      <RdsSvg v-if="icon || iconHref" :svg="icon || iconHref" :class="`${carbonPrefix}--btn__icon`" />
    </slot>
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import { carbonPrefixMixin } from '../../mixins';
import RdsSvg from '../rds-svg/_rds-svg';

export default {
  name: 'RdsIconButton',
  mixins: [buttonMixin, carbonPrefixMixin],
  components: { RdsSvg },
  props: {
    label: { type: String, default: undefined },
    selected: Boolean,
    tipPosition: {
      type: String,
      default: 'bottom',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    tipAlignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
  },
};
</script>
