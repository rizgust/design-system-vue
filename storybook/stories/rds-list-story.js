import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsListNotesMD from '../../core/components/rds-list/rds-list-notes.md';
import { RdsList, RdsListItem } from '../../core/';

const storiesDefault = storiesOf('Components/RdsList', module);
// const storiesExperimental = storiesOf('Experimental/RdsList', module);

const preKnobs = {
  ordered: {
    group: 'attr',
    type: boolean,
    config: ['ordered', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'ordered',
  },
  nested: {
    group: 'nested',
    value: `  <rds-list nested :ordered="orderedInNest">
      <rds-list-item>nested item 1</rds-list-item>
      <rds-list-item>nested item 2</rds-list-item>
      <rds-list-item>nested item 3</rds-list-item>
    </rds-list>
    <rds-list nested>
      <rds-list-item>nested item 1</rds-list-item>
      <rds-list-item>nested item 2</rds-list-item>
      <rds-list-item>nested item 3</rds-list-item>
    </rds-list>`,
  },
  orderedInNest: {
    group: '',
    type: boolean,
    config: ['ordered-nest', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'ordered-nest',
  },
};

const variants = [{ name: 'default', excludes: ['nested', 'orderedInNest'] }, { name: 'nested' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-list${settings.group.attr}>
  <rds-list-item>list item 1${settings.group.nested}
  </rds-list-item>
  <rds-list-item>list item 2</rds-list-item>
  <rds-list-item>list item 3</rds-list-item>
</rds-list>
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
        components: { RdsList, RdsListItem, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsListNotesMD },
    }
  );
}
