<template>
  <nav :class="`${carbonPrefix}--breadcrumb ${carbonPrefix}--skeleton`" :aria-label="ariaLabel">
    <rds-breadcrumb-item-skeleton></rds-breadcrumb-item-skeleton>
    <rds-breadcrumb-item-skeleton></rds-breadcrumb-item-skeleton>
    <rds-breadcrumb-item-skeleton></rds-breadcrumb-item-skeleton>
  </nav>
</template>

<script>
import RdsBreadcrumbItemSkeleton from './_rds-breadcrumb-item-skeleton';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsBreadcrumbSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    RdsBreadcrumbItemSkeleton,
  },
  props: {
    ariaLabel: { type: String, default: 'breadcrumb' },
  },
};
</script>
