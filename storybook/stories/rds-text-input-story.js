import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsTextInputNotesMD from '../../core/components/rds-text-input/rds-text-input-notes.md';
import { RdsTextInput } from '../../core/';

const storiesDefault = storiesOf('Components/RdsTextInput', module);
// const storiesExperimental = storiesOf('Experimental/RdsTextInput', module);

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
    config: ['label', 'Text input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'value',
    value: val => (val.length ? val : undefined),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  inputType: {
    group: 'attr',
    type: boolean,
    config: ['password type', false],
    prop: 'type',
    value: val => (val ? 'password' : undefined),
  },
  passwordVisible: {
    group: 'attr',
    type: boolean,
    config: ['password visible', false],
    prop: 'password-visible',
  },
  passwordHideLabel: {
    group: 'attr',
    type: text,
    config: ['password hide label', 'Hide password'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'password-hide-label',
  },
  passwordShowLabel: {
    group: 'attr',
    type: text,
    config: ['password-show-label', 'Show password'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'password-show-label',
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'Sample placeholder'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'placeholder',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
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
  warnText: {
    group: 'attr',
    type: text,
    config: ['warn text', ''],
    prop: 'warn-text',
    value: val => (val.length ? val : undefined),
  },
  warnTextSlot: {
    group: 'slots',
    slot: 'warn-text',
    value: 'Some warning e.g. will override previous value',
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot', 'warnTextSlot'],
  },
  { name: 'helper, warn and error slots', excludes: ['vModel', 'events'] },
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
<rds-text-input${settings.group.attr}>${settings.group.slots}
</rds-text-input>
  `;
      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      ref="templateView"
      :sv-alt-back="!this.$options.propsData.light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: 'initial value',
          };
        },
        components: { RdsTextInput, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          onInput: action('rds-text-input - input event'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
      };
    },
    {
      notes: { markdown: RdsTextInputNotesMD },
    }
  );
}
