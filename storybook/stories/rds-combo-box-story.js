import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsComboBoxNotesMD from '../../core/components/rds-combo-box/rds-combo-box-notes.md';
import { RdsComboBox } from '../../core/';

const storiesDefault = storiesOf('Components/RdsComboBox', module);
// const storiesExperimental = storiesOf('Experimental/RdsComboBox', module);

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: `val-${nameVal}`,
  };
});

const selectFruits = {};
fruits.forEach(item => {
  selectFruits[item.name] = item.label;
});

let preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'light',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Choose an option'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  vModel: {
    group: 'attr',
    value: `v-model="value"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange" @filter="actionFilter"`,
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
  },
  helperTextSlot: {
    group: 'slots',
    slot: 'helper-text',
    value: 'Some helpful text',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'slots',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'ComboBox title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'title',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  autoFilter: {
    group: 'attr',
    type: boolean,
    config: ['auto filter', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'auto-filter',
  },
  userFilter: {
    group: 'misc',
    type: boolean,
    config: ['user filter', false],
    prop: 'userFilter',
  },
  userHighlight: {
    group: 'misc',
    type: boolean,
    config: ['user highlight', false],
    prop: 'userHighlight',
  },
  userFilterOrHighlight: {
    group: 'attr',
    value: `@filter="onFilter" :highlight="highlight"`,
  },
  autoHighlight: {
    group: 'attr',
    type: boolean,
    config: ['auto highlight', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'auto-highlight',
  },
  initialValue: {
    group: 'attr',
    type: select,
    config: [
      'value',
      {
        default: '',
        ...selectFruits,
      },
      '',
      // consts.CONTENT, // fails when used with number in storybook 4.1.4
    ],
    prop: 'value',
  },
};

let variants = [
  {
    name: 'default',
    excludes: [
      'vModel',
      'events',
      'helperTextSlot',
      'invalidMessageSlot',
      'userFilter',
      'userHighlight',
      'userFilterOrHighlight',
    ],
  },
  {
    name: 'user Filter and/or Highlight',
    includes: ['userFilterOrHighlight', 'userFilter', 'userHighlight'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events', 'userFilterOrHighlight', 'userFilter', 'userHighlight'],
  },
  { name: 'events', includes: ['events'] },
  { name: 'vModel', includes: ['vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `<rds-combo-box ${settings.group.attr}
  :options="options">${settings.group.slots}
</rds-combo-box>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    ref="templateView"
    sv-margin
    :sv-alt-back="!this.$options.propsData.light"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
</sv-template-view>
  `;

      return {
        components: {
          RdsComboBox,
          SvTemplateView,
          TimerButton,
        },
        props: settings.props,
        data() {
          return {
            value: '',
            options: fruits,
            highlight: '',
          };
        },
        methods: {
          actionChange: action('RDS ComboBox - change'),
          actionFilter: action('Rds ComboBox - filter'),
          onFilter(filter) {
            let pat = new RegExp(`^${filter}`, 'ui');
            if (this.userFilter) {
              this.options = fruits.filter(opt => pat.test(opt.label)).slice(0);
            }
            if (this.userHighlight && this.options.length > 0) {
              let found = this.options.find(opt => pat.test(opt.label));
              if (found) {
                this.highlight = found.value;
              } else {
                this.highlight = '';
              }
            }
          },
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsComboBoxNotesMD },
    }
  );
}
