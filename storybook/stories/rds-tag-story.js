import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsTagNotesMD from '../../core/components/rds-tag/rds-tag-notes.md';
import { RdsTag, RdsTagSkeleton } from '../../core/';

import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const storiesDefault = storiesOf('Components/RdsTag', module);
// // const storiesExperimental = storiesOf('Experimental/RdsTag', module);

let preKnobs = {
  clearAriaLabel: {
    group: 'attr',
    type: text,
    config: ['Clear aria label', 'Custom clear filter'], // consts.CONTENT],
    prop: 'clear-aria-label',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
  },
  kind: {
    group: 'attr',
    type: select,
    config: [
      'Tag kind',
      ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast'],
      'gray',
    ],
    prop: 'kind',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I am a tag'], // consts.CONTENT],
    prop: 'label',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        small: 'sm',
        default: '',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};

let variants = [
  {
    name: 'standard',
    excludes: ['clearAriaLabel'],
  },
  {
    name: 'filter',
    excludes: ['clearAriaLabel'],
    extra: { kind: { group: 'attr', value: 'filter @remove="onRemove"' } },
  },
  {
    name: 'filter clear aria label',
    extra: { kind: { group: 'attr', value: 'filter @remove="onRemove"' } },
  },
  {
    name: 'interactive',
    excludes: ['clearAriaLabel'],
    extra: { kind: { group: 'attr', value: '@click="onClick"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-tag${settings.group.attr}></rds-tag>
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
        components: { RdsTag, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          onClick: action('Interactive as clicked'),
          onRemove: action('Filter remove event'),
        },
      };
    },
    {
      notes: { markdown: RdsTagNotesMD },
    }
  );
}

preKnobs = {
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        small: 'sm',
        default: '',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};
variants = [{ name: 'skeleton' }];
storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<rds-tag-skeleton${settings.group.attr}></rds-tag-skeleton>
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
        components: { RdsTagSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsTagNotesMD },
    }
  );
}
