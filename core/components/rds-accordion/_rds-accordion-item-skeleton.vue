<template>
  <li :class="[`${carbonPrefix}--accordion__item`, { [`${carbonPrefix}--accordion__item--active`]: open }]">
    <button disabled type="button" :class="`${carbonPrefix}--accordion__heading`">
      <ChevronRight16 :class="`${carbonPrefix}--accordion__arrow`" />
      <rds-skeleton-text :class="`${carbonPrefix}--accordion__title`"></rds-skeleton-text>
    </button>
    <div :class="`${carbonPrefix}--accordion__content`">
      <slot></slot>
    </div>
  </li>
</template>

<script>
import RdsSkeletonText from '../rds-skeleton-text/rds-skeleton-text';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsAccordionItemSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    ChevronRight16,
    RdsSkeletonText,
  },
  props: {
    open: { type: Boolean, default: false },
  },
};
</script>
