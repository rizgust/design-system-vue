<template>
  <rds-feedback-button
    v-if="!hideCopyButton"
    class="rds-code-snippet-inline"
    :class="classes"
    :disabled="disabled"
    :feedback="copyFeedback"
    inline
    :aria-label="feedbackAriaLabel"
    @click="$emit('copy-code')"
    ><slot
  /></rds-feedback-button>
  <span v-else :class="classes"><slot /></span>
</template>

<script>
import RdsFeedbackButton from '../rds-feedback-button/_rds-feedback-button';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsCodeSnippetInline',
  mixins: [carbonPrefixMixin],
  components: {
    RdsFeedbackButton,
  },
  props: {
    copyFeedback: String,
    disabled: Boolean,
    feedbackAriaLabel: String,
    hideCopyButton: Boolean,
  },
  computed: {
    classes() {
      return [`${this.carbonPrefix}--snippet`, `${this.carbonPrefix}--snippet--inline`];
    },
  },
};
</script>
