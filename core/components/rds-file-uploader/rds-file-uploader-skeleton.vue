<template>
  <div :class="`${carbonPrefix}--form-item`">
    <rds-skeleton-text heading width="100px" />
    <rds-skeleton-text width="225px" :class="`${carbonPrefix}--label-description`" />
    <rds-button-skeleton />
  </div>
</template>

<script>
import RdsSkeletonText from '../rds-skeleton-text/rds-skeleton-text';
import RdsButtonSkeleton from '../rds-button/rds-button-skeleton';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsFileUploaderSkeleton',
  mixins: [carbonPrefixMixin],
  components: {
    RdsSkeletonText,
    RdsButtonSkeleton,
  },
};
</script>
