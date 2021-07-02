import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsTooltipNotesMD from '../../core/components/rds-tooltip/rds-tooltip-notes.md';
import { RdsInteractiveTooltip, RdsTooltip, RdsDefinitionTooltip } from '../../core/';

const storiesDefault = storiesOf('Components/RdsTooltip', module);
// const storiesExperimental = storiesOf('Experimental/RdsTooltip', module);

import Filter16 from '@carbon/icons-vue/es/filter/16';

let preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  label: {
    group: 'content',
    slot: 'label',
    value: `
    Tooltip label
  `,
  },
  trigger: {
    group: 'content',
    slot: 'trigger',
    value: `<Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
  `,
  },
  content: {
    group: 'content',
    slot: 'content',
    value: `
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <button class="bx--button">Clicky one</button>
  `,
  },
  visible: {
    group: 'attr',
    type: boolean,
    config: ['visible', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'visible',
  },
  events: {
    group: 'attr',
    value: `@tooltip-shown="actionShown"
  @tooltip-hidden="actionHidden"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events'] },
  { name: 'minimal', includes: ['content', 'definition', 'term', 'tip'] },
  { name: 'events', includes: ['content', 'visible', 'events'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Interactive tootlip)',
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-interactive-tooltip${settings.group.attr}>${settings.group.content}
</rds-interactive-tooltip>
  `;
      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { RdsInteractiveTooltip, SvTemplateView, Filter16, TimerButton },
        template: templateViewString,
        props: settings.props,
        methods: {
          actionShown: action('RDS Tooltip - shown'),
          actionHidden: action('RDS Tooltip - hidden'),
          doStart() {
            this.$refs.templateView.$slots.component[0].componentInstance.show();
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.hide();
          },
        },
      };
    },
    {
      notes: { markdown: RdsTooltipNotesMD },
    }
  );
}
// /* ----------------------------------------------------- */

preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  tip: {
    group: 'attr',
    type: text,
    config: ['tip', 'This is your tip!'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'tip',
  },
  trigger: {
    group: 'content',
    slot: 'default',
    value: `<svg width="16" height="12" viewBox="0 0 16 12">
  <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
</svg>`,
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Tootlip)',
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-tooltip${settings.group.attr}>${settings.group.content}
</rds-tooltip>
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
        components: { RdsTooltip, SvTemplateView, Filter16 },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsTooltipNotesMD },
    }
  );
}

// /* ----------------------------------------------------- */

preKnobs = {
  alignment: {
    group: 'attr',
    type: select,
    config: [
      'alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'alignment',
  },
  direction: {
    group: 'attr',
    type: select,
    config: [
      'direction',
      {
        Top: 'top',
        Bottom: 'bottom',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'direction',
  },
  definition: {
    group: 'attr',
    type: text,
    config: [
      'definition',
      'Brief description of the dotted, underlined term',
      // consts.CONTENT,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'definition',
  },
  term: {
    group: 'attr',
    type: text,
    config: ['term', 'A term needeing definition'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'term',
  },
};

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name + ' (Definition Tootlip)',
    () => {
      const settings = story.knobs(); // storiesDefault.add(

      // ----------------------------------------------------------------

      const templateString = `
<rds-definition-tooltip${settings.group.attr} />
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
        components: { RdsDefinitionTooltip, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsTooltipNotesMD },
    }
  );
}
