<template>
  <div v-show="isVisible" class="rds-content-switcher-content">
    <slot></slot>
  </div>
</template>

<script>
import store from './rds-content-switcher-store';

export default {
  name: 'RdsContentSwitcherContent',
  props: {
    ownerId: { type: String, required: true },
  },
  data() {
    return {
      store: store,
    };
  },
  computed: {
    isVisible() {
      return this.store.getState(this.ownerId);
    },
  },
};
</script>
