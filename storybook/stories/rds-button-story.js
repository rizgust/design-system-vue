import { storiesOf } from '@storybook/vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
import knobsHelper from '../utils/knobs-helper';

import RdsButtonNotesMD from '../../core/components/rds-button/rds-button-notes.md';
import { RdsButton, RdsIconButton, RdsButtonSkeleton, RdsButtonSet } from '../../core/';

const storiesDefault = storiesOf('Components/RdsButton', module);
// const storiesExperimental = storiesOf('Experimental/RdsButton', module);
import exampleIconSvg from '../../core/assets/images/example-icon-svg.js';
const exampleIconSvgString = exampleIconSvg.exampleSvgString;
import exampleIconPathSymbol from '../../core/assets/images/example-icons.svg';
import exampleIconPathSvg from '../../core/assets/images/example-icon.svg';
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

let preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: [
      'kind',
      {
        default: '',
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
        ghost: 'ghost',
        danger: 'danger',
        'danger--ghost': 'danger--ghost',
        'danger--tertiary': 'danger--tertiary',
      },
      'primary',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'kind',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        field: 'field',
        'small (sm)': 'sm',
        'large (lg)': 'lg',
        'Extra large (xl)': 'xl',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  content: {
    group: 'slots',
    slot: 'default',
    value: `I am a button`,
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
  },
  iconAlways: {
    group: 'attr',
    prop: 'icon',
    value: () => AddFilled16,
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label for assistive text', 'Icon button'],
    prop: 'label',
  },
  selected: {
    group: 'attr',
    type: boolean,
    config: ['selected', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'selected',
  },
  tipPosition: {
    group: 'attr',
    type: select,
    config: [
      'Tip position',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'tip-position',
  },
  tipAlignment: {
    group: 'attr',
    type: select,
    config: [
      'Tip alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'tip-alignment',
  },
};

let variants = [
  {
    name: 'default',
    excludes: ['iconAlways', 'selected', 'tipPosition', 'tipAlignment', 'label'],
  },
  {
    name: 'icon as SVG path',
    excludes: [
      'size',
      'disabled',
      'icon',
      'iconHref',
      'iconAlways',
      'selected',
      'tipPosition',
      'tipAlignment',
      'label',
    ],
    extra: {
      icon: {
        group: 'attr',
        value: `icon="${exampleIconPathSvg}"`,
      },
    },
  },
  {
    name: 'icon as SVG symbol path',
    excludes: [
      'size',
      'disabled',
      'icon',
      'iconHref',
      'iconAlways',
      'selected',
      'tipPosition',
      'tipAlignment',
      'label',
    ],
    extra: {
      icon: {
        group: 'attr',
        value: `icon="${exampleIconPathSymbol}#icon--add--solid"`,
      },
    },
  },
  {
    name: 'icon as SVG',
    excludes: [
      'size',
      'disabled',
      'icon',
      'iconHref',
      'iconAlways',
      'selected',
      'tipPosition',
      'tipAlignment',
      'label',
    ],
    extra: {
      icon: {
        group: 'attr',
        value: `:icon="exampleIconSvgString"`,
      },
    },
  },
  {
    name: 'minimal',
    excludes: ['size', 'disabled', 'icon', 'iconAlways', 'selected', 'tipPosition', 'tipAlignment', 'label'],
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<rds-button${settings.group.attr}
>${settings.group.slots}
</rds-button>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
        <template slot="other">
          <p>NOTE: Until SVG2 using a non-symbol SVG path with use does not work. Using img tags has styling issues.</p>
          <br />
          <p>Svg String</p>
          <p v-if="exampleIconSvgString" v-text="exampleIconSvgString" />
        </template>
      </sv-template-view>
    `;

      return {
        components: { RdsButton, SvTemplateView },

        methods: {
          actionClick: action('Rds Button - click'),
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return { exampleIconSvgString: story.name === 'icon as SVG' ? exampleIconSvgString : '' };
        },
      };
    },
    {
      notes: { markdown: RdsButtonNotesMD },
    }
  );
}

variants = [
  {
    name: 'icon-only',
    includes: ['kind', 'size', 'disabled', 'label', 'selected', 'tipPosition', 'tipAlignment', 'iconAlways'],
  },
];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<rds-icon-button${settings.group.attr} />
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
        <template slot="other">
          <p>NOTE: Until SVG2 using a non-symbol SVG path with use does not work. Using img tags has styling issues.</p>
        </template>
      </sv-template-view>
    `;

      return {
        components: { RdsIconButton, SvTemplateView },

        methods: {
          actionClick: action('Rds Button - click'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsButtonNotesMD },
    }
  );
}

// rds-button-skeleton

preKnobs = {
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        field: 'field',
        small: 'small',
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

      const templateString = `
        <rds-button-skeleton${settings.group.attr}></rds-button-skeleton>
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
        components: { RdsButtonSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsButtonNotesMD },
    }
  );
}

storiesDefault.add(
  'button-set',
  () => {
    const templateString = `<rds-button-set :stacked="stacked"">
  <rds-button kind="primary">button 1</rds-button>
  <rds-button kind="secondary">button 2</rds-button>
  <rds-button kind="danger">button 3</rds-button>
</rds-button-set>
  `;

    const templateViewString = `
  <sv-template-view
    sv-margin
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
  </sv-template-view>
`;

    return {
      components: { RdsButtonSet, RdsButton, SvTemplateView },
      template: templateViewString,
      props: {
        stacked: { default: boolean('Stacked', false) },
      },
    };
  },
  {
    notes: { markdown: RdsButtonNotesMD },
  }
);
