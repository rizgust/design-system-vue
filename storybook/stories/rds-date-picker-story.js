import { storiesOf } from '@storybook/vue';
import { text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsDatePickerNotesMD from '../../core/components/rds-date-picker/rds-date-picker-notes.md';
import { RdsDatePicker } from '../../core/';

const storiesDefault = storiesOf('Components/RdsDatePicker', module);
// const storiesExperimental = storiesOf('Experimental/RdsDatePicker', module);

const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'light',
  },
  dateLabel: {
    group: 'attr',
    type: text,
    config: ['date-label', 'Date label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'date-label',
  },
  dateEndLabel: {
    group: 'attr',
    type: text,
    config: ['date-end-label', 'Date end label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'date-end-label',
  },
  pattern: {
    group: 'attr',
    type: text,
    config: ['pattern', '\\d{12}/\\d{12}/\\d{4}'], // consts.CONFIG],
    prop: 'pattern',
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'mm/dd/yyyy'], // consts.CONFIG],
    prop: 'placeholder',
  },
  calOptions: {
    group: 'attr',
    type: object,
    config: ['calOptions', { dateFormat: 'm/d/Y' }], // consts.CONFIG],
    prop: 'cal-options',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-message', ''], // consts.CONTENT],
    prop: 'invalid-message',
  },
  invalidMessageSlot: {
    group: 'slot',
    slot: 'invalid-message',
    value: 'Invalid message slot overrides the invalid-message prop',
  },
  eventsSimple: {
    group: 'attr',
    value: `@simpleChange="actionSimpleChange"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', '01/01/2020'],
    prop: 'value',
  },
  dateValue: {
    group: 'attr',
    value: `:value="new Date()"`,
  },
  valueRange: {
    group: 'attr',
    type: object,
    config: ['value', { startDate: '01/01/2020', endDate: '10/01/2020' }],
    prop: 'value',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  dateValueRange: {
    group: 'attr',
    value: `:value="{startDate: new Date(), endDate: new Date(2040,11,8)}"`,
  },
  vModelRange: {
    group: 'attr',
    value: `v-model="modelValue2"`,
  },
};

const variants = [
  {
    name: 'default',
    includes: ['light', 'dateLabel', 'pattern', 'placeholder', 'invalidMessage'],
  },
  {
    name: 'invalid message slot',
    includes: ['light', 'dateLabel', 'pattern', 'placeholder', 'invalidMessage', 'invalidMessageSlot'],
  },
  { name: 'minimal', includes: ['eventsSimple'] },
  {
    name: 'short',
    includes: ['eventsSimple'],
    extra: {
      kind: { group: 'attr', value: 'kind="short"' },
      placeholder: { group: 'attr', value: 'placeholder="mm/yy"' },
    },
  },
  {
    name: 'simple',
    includes: ['eventsSimple'],
    extra: { kind: { group: 'attr', value: 'kind="simple"' } },
  },
  {
    name: 'single',
    includes: ['events', 'calOptions', 'invalidMessage', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="single"' } },
  },
  {
    name: 'single vModel',
    includes: ['events', 'calOptions', 'vModel'],
    extra: { kind: { group: 'attr', value: 'kind="single"' } },
  },
  {
    name: 'single using Date',
    includes: ['events', 'calOptions', 'invalidMessage', 'dateValue'],
    extra: { kind: { group: 'attr', value: 'kind="single"' } },
  },
  {
    name: 'range',
    includes: ['events', 'calOptions', 'dateEndLabel', 'valueRange'],
    extra: { kind: { group: 'attr', value: 'kind="range"' } },
  },
  {
    name: 'range using Date',
    includes: ['events', 'calOptions', 'dateEndLabel', 'dateValueRange'],
    extra: { kind: { group: 'attr', value: 'kind="range"' } },
  },
  {
    name: 'range vModel',
    includes: ['events', 'calOptions', 'vModelRange'],
    extra: { kind: { group: 'attr', value: 'kind="range"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      // console.dir(settings);
      // console.dir(settings.calOptions);

      const templateString = `
  <rds-date-picker${settings.group.attr}>${settings.group.slot}
  </rds-date-picker>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        :sv-alt-back="!this.$options.propsData.light"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { RdsDatePicker, SvTemplateView },

        props: settings.props,
        template: templateViewString,
        methods: {
          actionChange: action('Rds Date Picker - change'),
          actionSimpleChange: action('Rds Date Picker - simple change'),
          addDay(which) {
            let splitDate = this.modelValue2[which].split('/');
            let newValue = { ...this.modelValue2 };
            splitDate[1] = 1 + parseInt(splitDate[1]);
            if (splitDate[1] < 10) {
              splitDate[1] = '0' + splitDate[1];
            }
            newValue[which] = splitDate.join('/');
            this.modelValue2 = newValue;
          },
        },
        data() {
          return {
            modelValue: '01/01/2021',
            modelValue2: { startDate: '01/03/2021', endDate: '01/10/2021' },
          };
        },
      };
    },
    {
      notes: { markdown: RdsDatePickerNotesMD },
    }
  );
}
