import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsCodeSnippetNotesMD from '../../core/components/rds-code-snippet/rds-code-snippet-notes.md';
import { RdsCodeSnippet, RdsCodeSnippetSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsCodeSnippet', module);
// const storiesExperimental = storiesOf('Experimental/RdsCodeSnippet', module);

let preKnobs = {
  copyFeedback: {
    group: 'attr',
    type: text,
    config: ['copy feedback', 'Content copied!'],
    prop: 'copy-feedback',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  feedbackAriaLabel: {
    group: 'attr',
    type: text,
    config: ['feedback aria label', 'feedback aria label'],
    prop: 'feedback-aria-label',
  },
  hideCopyButton: {
    group: 'attr',
    type: boolean,
    config: ['Hide and disable copy button', false],
    prop: 'hide-copy-button',
  },
  lessText: {
    group: 'attr',
    type: text,
    config: ['Less text', 'Show less'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'less-text',
  },
  moreText: {
    group: 'attr',
    type: text,
    config: ['More text', 'Show more'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'more-text',
  },
  inlineContent: {
    group: 'content',
    slot: 'default',
    value: 'printf("A short bit of code.");',
  },
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'light',
  },
  wrapText: {
    group: 'attr',
    type: boolean,
    config: ['Wrap code/text', false],
    prop: 'wrap-text',
  },
  content: {
    group: 'content',
    slot: 'default',
    value: `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`,
  },
};

let variants = [
  {
    name: 'default',
    includes: ['inlineContent'],
  },
  {
    name: 'inline',
    includes: ['inlineContent', 'light', 'copyFeedback', 'feedbackAriaLabel', 'hideCopyButton'],
    extra: { kind: { group: 'attr', value: 'kind="inline"', inline: true } },
  },
  {
    name: 'inline (minimal)',
    includes: ['inlineContent'],
    extra: { kind: { group: 'attr', value: 'kind="inline"', inline: true } },
  },
  {
    name: 'multiline',
    excludes: ['inlineContent'],
    extra: { kind: { group: 'attr', value: 'kind="multiline"' } },
  },
  {
    name: 'multiline (minimal)',
    includes: ['content'],
    extra: { kind: { group: 'attr', value: 'kind="multiline"' } },
  },
  {
    name: 'oneline',
    includes: ['inlineContent', 'copyFeedback', 'feedbackAriaLabel', 'light', 'hideCopyButton', 'disabled'],
    extra: { kind: { group: 'attr', value: 'kind="oneline"' } },
  },
  {
    name: 'oneline (minimal)',
    includes: ['inlineContent'],
    extra: { kind: { group: 'attr', value: 'kind="oneline"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      // console.dir(settings);
      const templateString = `
<rds-code-snippet${settings.group.attr}>${settings.group['content'].trim()}</rds-code-snippet>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view ref="view"
      sv-margin
      :sv-alt-back="!this.$options.propsData.light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { RdsCodeSnippet, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsCodeSnippetNotesMD },
    }
  );
}

// rds-code-snippet-skeleton

preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: ['kind', { oneline: 'oneline', multiline: 'multiline' }, 'multiline'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'kind',
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
        <rds-code-snippet-skeleton${settings.group.attr}></rds-code-snippet-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { RdsCodeSnippetSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsCodeSnippetNotesMD },
    }
  );
}
