import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsCheckboxNotesMD from '../../core/components/rds-checkbox/rds-checkbox-notes.md';
import { RdsCheckbox, RdsCheckboxSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsCheckbox', module);
// const storiesExperimental = storiesOf('Experimental/RdsCheckbox', module);

let preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'checkbox'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'checked',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
  mixed: {
    group: 'attr',
    type: boolean,
    config: ['mixed', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'mixed',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'hide-label',
  },
};

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label', 'value'] },
  { name: 'events', includes: ['label', 'hideLabel', 'value', 'events'] },
  { name: 'vModel', includes: ['label', 'hideLabel', 'value', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-checkbox${settings.group.attr}>
</rds-checkbox>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      :sv-alt-back="!this.$options.propsData.light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" value="check-1" v-model="modelValue">
          </label>
          <br>
          <br>
          <span>Checked: {{ modelValue }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsCheckbox, SvTemplateView, TimerButton },
        props: settings.props,
        data() {
          return {
            modelValue: this.$options.propsData.checked || false,
          };
        },
        methods: {
          actionChange: action('RDS Checkbox - change'),
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
      notes: { markdown: RdsCheckboxNotesMD },
    }
  );
}

preKnobs = {
  vModel: {
    group: 'attr',
    value: `v-model="checks"`,
  },
};

variants = [{ name: 'Array v-model', includes: ['vModel'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-checkbox${settings.group.attr} value="check-1" label="check-1">
</rds-checkbox>
<rds-checkbox${settings.group.attr} value="check-2" label="check-2">
</rds-checkbox>
<rds-checkbox${settings.group.attr} value="check-3" label="check-3">
</rds-checkbox>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <p>This story only demonstrates the array syntax for v-model</p>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" value="check-1" v-model="checks">
          </label>
          <label>Check 2:
            <input type="checkbox" value="check-2" v-model="checks">
          </label>
          <label>Check 3:
            <input type="checkbox" value="check-3" v-model="checks">
          </label>
          <br>
          <br>
          <span>Checked: {{ checks }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsCheckbox, SvTemplateView },
        data() {
          return {
            checks: ['check-1', 'check-2'],
          };
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsCheckboxNotesMD },
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

      const templateString = `
        <rds-checkbox-skeleton></rds-checkbox-skeleton>
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
        components: { RdsCheckboxSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsCheckboxNotesMD },
    }
  );
}
