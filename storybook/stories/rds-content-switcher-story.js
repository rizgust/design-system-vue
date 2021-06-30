import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsContentSwitcherNotesMD from '../../core/components/rds-content-switcher/rds-content-switcher-notes.md';
import { RdsContentSwitcher, RdsContentSwitcherButton, RdsContentSwitcherContent } from '../../core/';

const storiesDefault = storiesOf('Components/RdsContentSwitcher', module);
// const storiesExperimental = storiesOf('Experimental/RdsContentSwitcher', module);

const exampleIconPath = require('../../core/assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

const preKnobs = {
  initialSelected: {
    group: 'other',
    type: select,
    config: [
      'Initiallly selected',
      {
        'Button Name 1': 0,
        'Button Name 2': 1,
        'Button Name 3': 2,
      },
      0,
      // consts.CONFIG, // fails when used with number in storybook 4.1.4
    ],
    prop: 'selected',
  },
  toggle3: {
    group: 'attr3',
    type: boolean,
    config: ['toggle switcher 3', true],
    prop: 'toggle3',
  },
  disabled3: {
    group: 'attr3',
    type: boolean,
    config: ['disabled 3', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@selected="actionSelected"`,
    inline: true,
  },
  icon: {
    group: 'icon',
    type: boolean,
    config: ['with icon', false],
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
  },
  light: {
    group: 'attr',
    type: boolean,
    config: ['light', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'light',
  },

  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        'small (sm)': 'sm',
        'large (xl)': 'xl',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['events'],
  },
  {
    name: 'icon as path',
    excludes: ['icon'],
    extra: {
      icon: {
        group: 'icon',
        value: `icon="${exampleIconPath}#icon--add--solid"`,
      },
    },
  },
  { name: 'events' },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <rds-content-switcher${settings.group.attr}>
    <rds-content-switcher-button owner-id="csb-1" :selected="isSelected(0)" ${settings.group.icon}>Button Name 1</rds-content-switcher-button>
    <rds-content-switcher-button owner-id="csb-2" :selected="isSelected(1)" ${settings.group.icon}>Button Name 2</rds-content-switcher-button>
    <rds-content-switcher-button owner-id="csb-3" :selected="isSelected(2)" v-if="toggle3" ${settings.group.attr3} ${settings.group.icon}>Button Name 3</rds-content-switcher-button>
  </rds-content-switcher>

  <section style="margin: 10px 0;">
    <rds-content-switcher-content owner-id="csb-1">
      <p>This is the content for option 1</p>
    </rds-content-switcher-content>
    <rds-content-switcher-content owner-id="csb-2">
      <p>This is the content for option 2</p>
    </rds-content-switcher-content>
    <rds-content-switcher-content owner-id="csb-2" >
      <p>This is more content for option 2</p>
    </rds-content-switcher-content>
    <rds-content-switcher-content owner-id="csb-3">
      <p>This is the content for option 3</p>
    </rds-content-switcher-content>
  </section>
    `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        :sv-alt-back="!this.$options.propsData.light"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: {
          RdsContentSwitcher,
          RdsContentSwitcherButton,
          RdsContentSwitcherContent,
          SvTemplateView,
        },
        data() {
          return { toggle: false };
        },
        mounted() {
          setInterval(() => {
            this.toggle = !this.toggle;
          }, 5000);
        },
        props: settings.props,
        computed: {
          isSelected() {
            return index => this.initialSelected === index;
          },
        },
        methods: {
          actionSelected: action('Rds Content Switcher - selected'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsContentSwitcherNotesMD },
    }
  );
}

for (const story of storySet) {
  storiesDefault.add(
    `${story.name} - direct DOM usage`,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <rds-content-switcher${settings.group.attr}>
    <rds-content-switcher-button content-selector=".content-1" :selected="isSelected(0)" ${settings.group.icon}>Button Name 1</rds-content-switcher-button>
    <rds-content-switcher-button content-selector=".content-2" :selected="isSelected(1)" ${settings.group.icon}>Button Name 2</rds-content-switcher-button>
    <rds-content-switcher-button content-selector=".content-3" :selected="isSelected(2)" v-if="toggle3" ${settings.group.attr3} ${settings.group.icon}>Button Name 3</rds-content-switcher-button>
  </rds-content-switcher>

  <section style="margin: 10px 0;">
    <div class="content-1">
      <p>This is the content for option 1</p>
    </div>
    <div class="content-2">
      <p>This is the content for option 2</p>
    </div>
    <div class="content-2" >
      <p>This is more content for option 2</p>
    </div>
    <div class="content-3">
      <p>This is the content for option 3</p>
    </div>
  </section>
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
        components: {
          RdsContentSwitcher,
          RdsContentSwitcherButton,
          SvTemplateView,
        },

        props: settings.props,
        computed: {
          isSelected() {
            return index => this.initialSelected === index;
          },
        },
        methods: {
          actionSelected: action('Rds Content Switcher - selected'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: RdsContentSwitcherNotesMD },
    }
  );
}
