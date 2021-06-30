<template>
  <li :class="`${carbonPrefix}--side-nav__item`">
    <component
      :is="tagType"
      v-on="$listeners"
      :class="[
        'rds-side-nav-item-link',
        `${carbonPrefix}--side-nav__link`,
        { [`${carbonPrefix}--side-nav__link--current`]: active },
      ]"
      v-bind="{ ...$attrs, ...linkProps }"
    >
      <rds-side-nav-icon v-if="hasNavIcon" small>
        <slot name="nav-icon" />
      </rds-side-nav-icon>
      <rds-side-nav-link-text>
        <slot />
      </rds-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';
import RdsSideNavIcon from './rds-side-nav-icon';
import RdsSideNavLinkText from './_rds-side-nav-link-text';

export default {
  name: 'RdsSideNavLink',
  inheritAttrs: false,
  mixins: [linkMixin, carbonPrefixMixin],
  components: { RdsSideNavIcon, RdsSideNavLinkText },
  props: {
    active: Boolean,
    icon: Object,
  },
  data() {
    return {
      hasNavIcon: false,
    };
  },
  mounted() {
    this.checkSlots();
  },
  updated() {
    this.checkSlots();
  },
  methods: {
    checkSlots() {
      this.hasNavIcon = !!this.$slots['nav-icon'];
    },
  },
};
</script>
