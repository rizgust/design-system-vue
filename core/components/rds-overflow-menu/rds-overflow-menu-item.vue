<template>
  <li
    :class="[
      `rds-overflow-menu-item ${carbonPrefix}--overflow-menu-options__option`,
      {
        [`${carbonPrefix}--overflow-menu-options__option--disabled`]: disabled,
        [`${carbonPrefix}--overflow-menu-options__option--danger`]: danger,
      },
    ]"
    @keydown.esc.prevent="onEsc"
  >
    <button
      type="button"
      :class="`${carbonPrefix}--overflow-menu-options__btn`"
      :data-floating-menu-primary-focus="primaryFocus"
      :disabled="disabled"
      v-on="$listeners"
      @click="onClick"
    >
      <span :class="`${carbonPrefix}--overflow-menu-options__option-content`">
        <slot></slot>
      </span>
    </button>
  </li>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsOverflowMenuItem',
  mixins: [carbonPrefixMixin],
  props: {
    primaryFocus: Boolean,
    disabled: Boolean,
    danger: Boolean,
  },
  methods: {
    onClick() {
      this.$parent.$emit('rds:click');
    },
    onEsc() {
      this.$parent.$emit('rds:close');
    },
  },
};
</script>
