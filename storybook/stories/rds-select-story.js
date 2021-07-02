import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsSelectNotesMD from '../../core/components/rds-select/rds-select-notes.md';
import { RdsSelect, RdsSelectOptgroup, RdsSelectOption } from '../../core/';

const storiesDefault = storiesOf('Components/RdsSelect', module);
// const storiesExperimental = storiesOf('Experimental/RdsSelect', module);

const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'light',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'hide-label',
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'inline',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  vModel: {
    group: 'attr',
    value: `v-model="selectValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
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
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events'],
  },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <rds-select${settings.group.attr}>${settings.group.slots}
    <rds-select-option disabled selected hidden>Choose an option</rds-select-option>
    <rds-select-option value="solong">A much longer rds-select-option that is worth having around to check how text flows</rds-select-option>
    <rds-select-optgroup label="Category 1">
      <rds-select-option value="rds-select-option1">rds-select-option 1</rds-select-option>
      <rds-select-option value="rds-select-option2">rds-select-option 2</rds-select-option>
    </rds-select-optgroup>
    <rds-select-optgroup label="Category 2">
      <rds-select-option value="rds-select-option3">rds-select-option 3</rds-select-option>
      <rds-select-option value="rds-select-option4">rds-select-option 4</rds-select-option>
    </rds-select-optgroup>
  </rds-select>
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
        components: { RdsSelect, RdsSelectOption, RdsSelectOptgroup, SvTemplateView, TimerButton },
        props: settings.props,
        data() {
          return {
            selectValue: 'rds-select-option3',
          };
        },
        methods: {
          actionChange: action('RDS Select - change'),
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
      notes: { markdown: RdsSelectNotesMD },
    }
  );
}
