<template>
  <component
    :class="classes"
    :disabled="disabled"
    :is="theComponent"
    v-bind="$attrs"
    @copy-code="onCopyCode"
    :copy-feedback="copyFeedback"
    :feedback-aria-label="feedbackAriaLabel"
    :hideCopyButton="hideCopyButton"
    :wrap-text="wrapText"
  >
    <code ref="code"><slot /></code>
    <!-- textarea cannot be fully hidden for clipboard to work -->
    <textarea
      class="rds-code-snippet__clippy"
      style="position: absolute; left: -9999px; max-width: 0; opacity: 0; overflow: hidden;"
      aria-hidden="true"
      ref="clippy"
    ></textarea>
  </component>
</template>

<script>
import RdsCodeSnippetInline from './_rds-code-snippet-inline';
import RdsCodeSnippetMultiline from './_rds-code-snippet-multiline';
import RdsCodeSnippetOneline from './_rds-code-snippet-oneline';
import { carbonPrefixMixin, themeMixin } from '../../mixins';

export default {
  name: 'RdsCodeSnippet',
  inheritAttrs: false,
  mixins: [carbonPrefixMixin, themeMixin],
  components: {
    RdsCodeSnippetInline,
    RdsCodeSnippetMultiline,
    RdsCodeSnippetOneline,
  },
  props: {
    disabled: Boolean,
    feedbackAriaLabel: { type: String, default: 'Copy code' },
    copyFeedback: { type: String, default: 'Copied!' },
    hideCopyButton: Boolean,
    kind: {
      type: String,
      default: 'oneline',
      validator: value => ['inline', 'multiline', 'oneline'].includes(value),
    },
    wrapText: Boolean,
  },
  computed: {
    classes() {
      return [
        `rds-code-snippet`,
        {
          [`${this.carbonPrefix}--snippet--light`]: this.isLight,
          [`${this.carbonPrefix}--snippet--no-copy`]: this.hideCopyButton,
          [`${this.carbonPrefix}--snippet--wraptext`]: this.wrapText,
        },
      ];
    },
    theComponent() {
      switch (this.kind) {
        case 'inline':
          return 'RdsCodeSnippetInline';
        case 'multiline':
          return 'RdsCodeSnippetMultiline';
        default:
          return 'RdsCodeSnippetOneline';
      }
    },
  },
  methods: {
    onCopyCode() {
      // copy to clipboard
      this.$refs.clippy.value = this.$refs.code.innerText;
      this.$refs.clippy.select();
      document.execCommand('copy');
    },
  },
};
</script>
