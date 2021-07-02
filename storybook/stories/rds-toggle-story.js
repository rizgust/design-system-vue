import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsToggleNotesMD from '../../core/components/rds-toggle/rds-toggle-notes.md';
import { RdsToggle, RdsToggleSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsToggle', module);
// const storiesExperimental = storiesOf('Experimental/RdsToggle', module);

let preKnobs = {
  checked: {
    group: 'attr',
    type: boolean,
    config: ['checked', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'checked',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Toggle label'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'small',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  formItem: {
    group: 'attr',
    type: boolean,
    config: ['form-item', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'form-item',
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'hide-label',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
  textLeft: {
    group: 'slots',
    slot: 'text-left',
    value: '0',
  },
  textRight: {
    group: 'slots',
    slot: 'text-right',
    value: '1',
  },
};

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-toggle${settings.group.attr}>${settings.group.slots}
</rds-toggle>
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
        components: { RdsToggle, SvTemplateView, TimerButton },
        props: settings.props,
        data() {
          return {
            modelValue: this.$options.propsData.checked || false,
          };
        },
        methods: {
          actionChange: action('RDS Toggle - change'),
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
      notes: { markdown: RdsToggleNotesMD },
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
      <rds-toggle${settings.group.attr} name="check-1" value="check-1"></rds-toggle>
      <rds-toggle${settings.group.attr} name="check-2" value="check-2"></rds-toggle>
      <rds-toggle${settings.group.attr} name="check-3" value="check-3"></rds-toggle>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <p>This story only demonstrates the array syntax for v-model</p>
        <template slot="component">${templateString}</template>
      </sv-template-view>
     `;

      return {
        components: { RdsToggle, SvTemplateView },
        data() {
          return {
            checks: ['check-3', 'check-2'],
          };
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsToggleNotesMD },
    }
  );
}

// rds-toggle-skeleton

preKnobs = {};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
      <rds-toggle-skeleton></rds-toggle-skeleton>
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
        components: { RdsToggleSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsToggleNotesMD },
    }
  );
}
