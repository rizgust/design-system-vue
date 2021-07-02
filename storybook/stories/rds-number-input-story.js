import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsNumberInputNotesMD from '../../core/components/rds-number-input/rds-number-input-notes.md';
import { RdsNumberInput, RdsNumberInputSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsNumberInput', module);
// const storiesExperimental = storiesOf('Experimental/RdsNumberInput', module);

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
    config: ['label', 'Text input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'content',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
  },
  helperTextSlot: {
    group: 'content',
    slot: 'helper-text',
    value: 'Some helpful textThis is some helpful text',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  value: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
    value: val => `${val}`,
  },
  numValue: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
  min: {
    group: 'attr',
    type: number,
    config: ['min', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'min',
    value: val => `${val}`,
  },
  numMin: {
    group: 'attr',
    type: number,
    config: ['min', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'min',
  },
  max: {
    group: 'attr',
    type: number,
    config: ['max', 10], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'max',
    value: val => `${val}`,
  },
  numMax: {
    group: 'attr',
    type: number,
    config: ['max', 10], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'max',
  },
  step: {
    group: 'attr',
    type: number,
    config: ['step', 1], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'step',
    value: val => `${val}`,
  },
  numStep: {
    group: 'attr',
    type: number,
    config: ['step', 1], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'step',
  },
  mobile: {
    group: 'attr',
    type: boolean,
    config: ['mobile', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'mobile',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  vModelNum: {
    group: 'attr',
    value: `v-model="modelValueNum"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
};

let variants = [
  {
    name: 'default',
    excludes: [
      'vModel',
      'invalidMessageSlot',
      'helperTextSlot',
      'numValue',
      'vModelNum',
      'numMin',
      'numMax',
      'numStep',
    ],
  },
  {
    name: 'number value',
    excludes: ['vModel', 'invalidMessageSlot', 'helperTextSlot', 'value', 'vModelNum', 'min', 'max', 'step'],
  },
  {
    name: 'helper and invalid slots',
    excludes: ['vModel', 'events', 'numValue', 'vModelNum', 'numMin', 'numMax', 'numStep'],
  },
  { name: 'minimal', includes: ['label'] },
  { name: 'vModel', includes: ['label', 'vModel', 'step', 'mobile', 'events'] },
  { name: 'vModelNum', includes: ['label', 'vModelNum', 'numStep', 'mobile', 'events'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-number-input${settings.group.attr}>${settings.group.content}
</rds-number-input>
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
        components: { RdsNumberInput, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            modelValue: '100',
            modelValueNum: 100,
            storyName: story.name,
          };
        },
        watch: {
          modelValue() {
            let val;
            val = parseFloat(this.modelValue);

            if (isNaN(val)) {
              val = 0;
            }
            this.modelValueNum = val;
          },
          modelValueNum() {
            // NOTE: DELIBERATE USE OF != TO COMPARE this.modelValueNum and this.modelValue
            if (this.modelValue != this.modelValueNum) {
              this.modelValue = '' + this.modelValueNum;
            }
          },
        },
        methods: {
          onInput: action('rds-number-input - input event'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        computed: {
          propStep() {
            return this.$props.step || this.$props.numStep.toString();
          },
        },
      };
    },
    {
      notes: { markdown: RdsNumberInputNotesMD },
    }
  );
}

preKnobs = {};
variants = [{ name: 'skeleton' }];
storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-number-input-skeleton></rds-number-input-skeleton>
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
        components: { RdsNumberInputSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsNumberInputNotesMD },
    }
  );
}
