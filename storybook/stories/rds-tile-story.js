import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsTileNotesMD from '../../core/components/rds-tile/rds-tile-notes.md';
import { RdsTile } from '../../core/';
import { action } from '@storybook/addon-actions';

const storiesDefault = storiesOf('Components/RdsTile', module);
// const storiesExperimental = storiesOf('Experimental/RdsTile', module);

let preKnobs = {
  slotDefault: {
    group: 'slots',
    slot: 'default',
    value: '<h1>Hello</h1><p>This is some tile content.</p>',
  },
  slotBelow: {
    group: 'slots',
    slot: 'below',
    value: `<h2>More</h2>
        <ul>
          <li>This</li>
          <li>is some</li>
          <li>more</li>
          <li>content</li>
        </ul>`,
  },
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false],
    prop: 'light',
  },
  expanded: {
    group: 'attr',
    type: boolean,
    config: ['expanded', false],
    prop: 'expanded',
  },
  selected: {
    group: 'attr',
    type: boolean,
    config: ['selected', false], // consts.CONFIG],
    prop: 'selected',
  },
  href: {
    group: 'attr',
    type: text,
    config: [
      'where to go when clicked',
      'https://github.com/carbon-design-system/carbon-components-vue/blob/main/README.md',
    ],
    prop: 'href',
  },
  tileCollapsed: {
    group: 'attr',
    type: text,
    config: ['Tile collapsed label', ''], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'tile-collapsed-label',
  },
  tileExpanded: {
    group: 'attr',
    type: text,
    config: ['Tile expanded label', ''], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'tile-expanded-label',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
};

let variants = [
  { name: 'default', includes: ['slotDefault', 'light'] },
  {
    name: 'standard',

    includes: ['slotDefault', 'light'],
    extra: { kind: { group: 'attr', value: 'kind="standard"' } },
  },
  {
    name: 'selectable',
    includes: ['slotDefault', 'light', 'selected', 'value'],
    extra: {
      kind: { group: 'attr', value: 'kind="selectable"' },
      ariaLabel: { group: 'attr', value: 'aria-label="custom aria label"' },
    },
  },
  {
    name: 'selectable-event',
    includes: ['slotDefault', 'light', 'events', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="selectable" @change="actionChange"' } },
  },
  {
    name: 'selectable-v-model',
    includes: ['slotDefault', 'light', 'vModel', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="selectable"' } },
  },
  {
    name: 'expandable',
    includes: ['slotDefault', 'light', 'slotBelow', 'expanded', 'tileCollapsed', 'tileExpanded'],
    extra: { kind: { group: 'attr', value: 'kind="expandable"' } },
  },
  {
    name: 'clickable',
    includes: ['slotDefault', 'light', 'href'],
    extra: { kind: { group: 'attr', value: 'kind="clickable" @click="actionClick"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      if (settings.kind === 'selectable') {
        settings.group.attr += `\n  value="value-1"`;
      }

      // ----------------------------------------------------------------

      const templateString = `
<rds-tile${settings.group.attr}>${settings.group.slots}
</rds-tile>
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
        components: { RdsTile, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          actionClick: action('click'),
          actionChange: action('change'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        data() {
          return {
            modelValue: this.$options.propsData.selected || false,
          };
        },
      };
    },
    {
      notes: { markdown: RdsTileNotesMD },
    }
  );
}

preKnobs = {
  vModel: {
    group: 'attr',
    value: `v-model="selectedTiles"`,
  },
};

variants = [{ name: 'selectable-Array v-model', includes: ['vModel'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-tile kind="selectable"${settings.group.attr} value="tile-1"><h1>tile-1"</h1>
</rds-tile>
<rds-tile kind="selectable"${settings.group.attr} value="tile-2"><h1>tile-2"</h1>
</rds-tile>
<rds-tile kind="selectable"${settings.group.attr} value="tile-3"><h1>tile-3"</h1>
</rds-tile>
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
        components: { RdsTile, SvTemplateView },
        data() {
          return {
            selectedTiles: ['tile-1', 'tile-2'],
          };
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsTileNotesMD },
    }
  );
}
