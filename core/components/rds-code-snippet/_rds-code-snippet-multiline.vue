<template>
  <div
    class="rds-code-snippet-multiline"
    :class="[
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--snippet--multi`,
      { [`${carbonPrefix}--snippet--expand`]: expanded, [`${carbonPrefix}--snippet--disabled`]: disabled },
    ]"
    data-code-snippet
  >
    <div :class="[`${carbonPrefix}--snippet-container`]">
      <pre><slot /></pre>
    </div>
    <rds-feedback-button
      v-if="!hideCopyButton"
      :disabled="disabled"
      :feedback="copyFeedback"
      :aria-label="feedbackAriaLabel"
      @click="$emit('copy-code')"
    >
      <Copy16 :class="`${carbonPrefix}--snippet__icon`" />
    </rds-feedback-button>

    <rds-button
      type="button"
      kind="ghost"
      size="small"
      :class="`${carbonPrefix}--snippet-btn--expand`"
      @click="toggleExpand"
    >
      <span :class="`${carbonPrefix}--snippet-btn--text`">{{ expandButtonText }}</span>
      <ChevronDown16 :class="`${carbonPrefix}--icon-chevron--down`" />
    </rds-button>
  </div>
</template>

<script>
import RdsFeedbackButton from '../rds-feedback-button/_rds-feedback-button';
import RdsButton from '../rds-button/rds-button';

import Copy16 from '@carbon/icons-vue/es/copy/16';
import ChevronDown16 from '@carbon/icons-vue/es/chevron--down/16';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsCodeSnippetMultiline',
  mixins: [carbonPrefixMixin],
  components: {
    RdsButton,
    RdsFeedbackButton,
    Copy16,
    ChevronDown16,
  },
  props: {
    copyFeedback: String,
    disabled: Boolean,
    feedbackAriaLabel: String,
    hideCopyButton: Boolean,
    lessText: { type: String, default: 'Show less' },
    moreText: { type: String, default: 'Show more' },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    expandButtonText() {
      return this.expanded ? this.lessText : this.moreText;
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
