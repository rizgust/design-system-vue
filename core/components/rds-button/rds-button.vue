<template>
  <button class="rds-button" :class="buttonClassOpts()" v-on="inputListeners" role="button">
    <slot></slot>

    <RdsSvg v-if="icon || iconHref" :svg="icon || iconHref" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import buttonMixin from './button-mixin';
import { carbonPrefixMixin } from '../../mixins';
import RdsSvg from '../rds-svg/_rds-svg';

export default {
  name: 'RdsButton',
  mixins: [buttonMixin, carbonPrefixMixin],
  components: { RdsSvg },
};
</script>
