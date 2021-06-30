import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsRadioButtonNotesMD from '../../core/components/rds-radio-button/rds-radio-button-notes.md';
import { RdsRadioButton, RdsRadioGroup } from '../../core/';

const storiesDefault = storiesOf('Components/RdsRadioButton', module);
// const storiesExperimental = storiesOf('Experimental/RdsRadioButton', module);

const preKnobs = {
  checked1: {
    group: 'attr1',
    type: boolean,
    config: ['radio-1:checked', true], // consts.CONFIG],
    prop: 'checked',
  },
  disabled2: {
    group: 'attr2',
    type: boolean,
    config: ['radio-2:disabled', true], // consts.CONFIG],
    prop: 'disabled',
  },
  hideLabel: {
    group: 'each',
    type: boolean,
    config: ['hideLabel', false], // consts.CONFIG],
    prop: 'hide-label',
  },
  labelLeft: {
    group: 'each',
    type: boolean,
    config: ['label left', false], // consts.CONFIG],
    prop: 'label-left',
  },
  vertical: {
    group: 'attr',
    type: boolean,
    config: ['vertical', false], // consts.CONFIG],
    prop: 'vertical',
  },
  vModel: {
    group: 'each',
    value: `v-model="radioVal"`,
    inline: true,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'events', excludes: ['vModel'] },
  { name: 'vModel', excludes: ['events'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <rds-radio-group ${settings.group.attr}>
    <rds-radio-button name="group-1" label="radio-1" value="value-1" ${settings.group.attr1}${settings.group.each} />
    <rds-radio-button name="group-1" label="radio-2" value="value-2" ${settings.group.attr2}${settings.group.each} />
    <rds-radio-button name="group-1" label="radio-3" value="value-3"${settings.group.each}/>
  </rds-radio-group>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
        <div v-if="${templateString.indexOf('v-model') > 0}">V-Model:
          <input type="radio" value="value-1" v-model="radioVal" group="story">Radio 1</input>
          <input type="radio" value="value-2" v-model="radioVal" group="story">Radio 2</input>
          <input type="radio" value="value-3" v-model="radioVal" group="story">Radio 3</input>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsRadioButton, RdsRadioGroup, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            radioVal: 'value-2',
          };
        },
        methods: {
          actionChange: action('RDS Radio Button - change'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.$children[0].focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.$children[0].blur();
          },
        },
      };
    },
    {
      notes: { markdown: RdsRadioButtonNotesMD },
    }
  );
}
