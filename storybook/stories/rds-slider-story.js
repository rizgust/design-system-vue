import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsSliderNotesMD from '../../core/components/rds-slider/rds-slider-notes.md';
import { RdsSlider, RdsSliderSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsSlider', module);
// const storiesExperimental = storiesOf('Experimental/RdsSlider', module);

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
    config: ['label', 'Slider label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  min: {
    group: 'attr',
    type: text,
    config: ['min', '-50'], // consts.CONFIG],
    prop: 'min',
  },
  max: {
    group: 'attr',
    type: text,
    config: ['max', '150'], // consts.CONFIG],
    prop: 'max',
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', '50'], // consts.CONFIG],
    prop: 'value',
  },
  step: {
    group: 'attr',
    type: text,
    config: ['step', '1'], // consts.CONFIG],
    prop: 'step',
  },
  stepMultiplier: {
    group: 'attr',
    type: text,
    config: ['step-multiplier', '10'], // consts.CONFIG],
    prop: 'step-multiplier',
  },
  minLabel: {
    group: 'attr',
    type: text,
    config: ['min-label', 'Min'], // consts.CONFIG],
    prop: 'min-label',
  },
  maxLabel: {
    group: 'attr',
    type: text,
    config: ['max-label', 'Max'], // consts.CONFIG],
    prop: 'max-label',
  },
  vModel: {
    group: 'attr',
    value: 'v-model="modelValue"',
  },
  events: {
    group: 'attr',
    value: '@change="onChange"',
  },
};

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-slider${settings.group.attr}></rds-slider>
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
        data() {
          return {
            modelValue: '45',
          };
        },
        components: { RdsSlider, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('rds-slider - change event'),
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
      notes: { markdown: RdsSliderNotesMD },
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
        <rds-slider-skeleton></rds-slider-skeleton>
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
        components: { RdsSliderSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsSliderNotesMD },
    }
  );
}
