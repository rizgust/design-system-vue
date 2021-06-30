<template>
  <li :class="`${carbonPrefix}--side-nav__menu-item`">
    <component
      :is="tagType"
      v-on="$listeners"
      :class="[`${carbonPrefix}--side-nav__link`, { [`${carbonPrefix}--side-nav__link--current`]: active }]"
      v-bind="{ ...$attrs, ...linkProps }"
      role="menuitem"
    >
      <rds-side-nav-link-text>
        <slot />
      </rds-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';
import RdsSideNavLinkText from './_rds-side-nav-link-text';

export default {
  name: 'RdsSideNavMenuItem',
  inheritAttrs: false,
  mixins: [linkMixin, carbonPrefixMixin],
  components: { RdsSideNavLinkText },
  props: {
    active: Boolean,
  },
};
</script>
