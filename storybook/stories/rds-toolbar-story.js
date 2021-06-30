import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsToolbarNotesMD from '../../core/components/rds-toolbar/rds-toolbar-notes.md';
import {
  RdsToolbar,
  RdsOverflowMenu,
  RdsOverflowMenuItem,
  RdsRadioButton,
  RdsCheckbox,
  RdsToolbarDivider,
  RdsToolbarOption,
  RdsToolbarSearch,
  RdsToolbarTitle,
  RdsButton,
} from '../../core/';

const storiesDefault = storiesOf('Components/RdsToolbar [Depercated]', module);
// const storiesExperimental = storiesOf('Experimental/RdsToolbar', module);

import Filter16 from '@carbon/icons-vue/es/filter/16';

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
<rds-toolbar>
  <rds-toolbar-search v-model="searchInput"/>

  <rds-overflow-menu class="bx--toolbar-action">
    <template slot="trigger">
      <Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
    </template>
    <rds-toolbar-title title="Filter by" />
    <rds-toolbar-option>
      <rds-checkbox value="filter-1" label="Filter option 1" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-checkbox value="filter-2" label="Filter option 2" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-checkbox value="filter-3" label="Filter option 3" />
    </rds-toolbar-option>
  </rds-overflow-menu>

  <rds-overflow-menu class="bx--toolbar-action">
    <rds-overflow-menu-item primary-focus>Refresh table</rds-overflow-menu-item>
    <rds-toolbar-divider></rds-toolbar-divider>
    <rds-toolbar-title title="ROW HEIGHT" />
    <rds-toolbar-option>
      <rds-radio-button name="row-height" label="Short" value="short" />
    </rds-toolbar-option>
    <rds-toolbar-option>
      <rds-radio-button name="row-height" label="Tall" value="tall" />
    </rds-toolbar-option>
  </rds-overflow-menu>

  <rds-button small>Test</rds-button>
</rds-toolbar>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">Search value: {{searchInput}}</template>
    </sv-template-view>
  `;

      return {
        components: {
          RdsToolbar,
          SvTemplateView,
          RdsButton,
          RdsCheckbox,
          RdsOverflowMenu,
          RdsOverflowMenuItem,
          RdsRadioButton,
          RdsToolbarDivider,
          RdsToolbarOption,
          RdsToolbarTitle,
          RdsToolbarSearch,
          Filter16,
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            searchInput: '',
          };
        },
      };
    },
    {
      notes: { markdown: RdsToolbarNotesMD },
    }
  );
}
