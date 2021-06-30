<template>
  <div
    :class="[
      `rds-breadcrumb-item ${carbonPrefix}--breadcrumb-item`,
      { [`${carbonPrefix}--breadcrumb-item--current`]: activePage },
    ]"
    :aria-current="ariaCurrent"
  >
    <slot></slot>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsBreadcrumbItem',
  mixins: [carbonPrefixMixin],
  props: {
    active: Boolean,
    ariaCurrent: String,
  },
  computed: {
    activePage() {
      return this.active && this.ariaCurrent !== 'page';
    },
  },
};
</script>
