<template>
  <ul
    :class="[
      `${carbonPrefix}--accordion ${carbonPrefix}--skeleton`,
      {
        [`${carbonPrefix}--accordion--${align}`]: align,
        [`${carbonPrefix}--accordion--${size}`]: size,
      },
    ]"
  >
    <rds-accordion-item-skeleton :open="true">
      <rds-skeleton-text width="90%"></rds-skeleton-text>
      <rds-skeleton-text width="80%"></rds-skeleton-text>
      <rds-skeleton-text width="95%"></rds-skeleton-text>
    </rds-accordion-item-skeleton>
    <rds-accordion-item-skeleton></rds-accordion-item-skeleton>
    <rds-accordion-item-skeleton></rds-accordion-item-skeleton>
    <rds-accordion-item-skeleton></rds-accordion-item-skeleton>
  </ul>
</template>

<script>
import RdsSkeletonText from '../rds-skeleton-text/rds-skeleton-text';
import RdsAccordionItemSkeleton from './_rds-accordion-item-skeleton';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsAccordionSkeleton',
  props: {
    align: { type: String, default: 'start', validator: val => ['start', 'end', ''].includes(val) },
    size: {
      type: String,
      default: '',
      validator: val => ['sm', 'xl', ''].includes(val),
    },
  },
  mixins: [carbonPrefixMixin],
  components: {
    RdsSkeletonText,
    RdsAccordionItemSkeleton,
  },
};
</script>
