import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsStructuredListNotesMD from '../../core/components/rds-structured-list/rds-structured-list-notes.md';
import {
  RdsStructuredList,
  RdsStructuredListData,
  RdsStructuredListHeading,
  RdsStructuredListItem,
} from '../../core/';

const storiesDefault = storiesOf('Components/RdsStructuredList', module);
// const storiesExperimental = storiesOf('Experimental/RdsStructuredList', module);

const preKnobs = {
  condensed: {
    group: 'attr',
    type: boolean,
    inline: true,
    config: ['condensed', false], // consts.CONFIG],
    prop: 'condensed',
  },
  noWrap: {
    group: 'data',
    type: boolean,
    inline: true,
    config: ['Prevent wrapping', false], // consts.CONFIG],
    prop: 'no-wrap',
  },
  vModel: {
    group: 'checksSelectable',
    inline: true,
    value: 'v-model="listVal"',
  },
  events: {
    group: 'attr',
    inline: true,
    value: '@change="actionChange"',
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events', 'selectable'] },
  { name: 'minimal', includes: [] },
  { name: 'selectable with events', includes: ['selectable', 'events'] },
  { name: 'selectable with vModel', includes: ['selectable', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      let templateString = '';
      let isVModel = story.name.indexOf('vModel') > -1;
      let isSelectable = story.name.startsWith('selectable');

      templateString = `
  <rds-structured-list${isSelectable ? ' selectable' : ''}${settings.group.attr}>
    <template slot="headings">
      <rds-structured-list-heading>Heading 1</rds-structured-list-heading>
      <rds-structured-list-heading>Heading 2</rds-structured-list-heading>
      <rds-structured-list-heading>Heading 3</rds-structured-list-heading>
    </template>
    <template slot="items">
      <rds-structured-list-item${isSelectable ? ' name="group-1" value="value-1" ' : ''}${
        isVModel && isSelectable ? settings.group.checksSelectable : ' checked'
      }>
        <rds-structured-list-data>Item_1</rds-structured-list-data>
        <rds-structured-list-data>Item_1</rds-structured-list-data>
        <rds-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</rds-structured-list-data>
      </rds-structured-list-item>
      <rds-structured-list-item${isSelectable ? ' name="group-1" value="value-2" ' : ''}${
        settings.group.checksSelectable
      }>
        <rds-structured-list-data>Item_2</rds-structured-list-data>
        <rds-structured-list-data>Item_2</rds-structured-list-data>
        <rds-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</rds-structured-list-data>
      </rds-structured-list-item>
      <rds-structured-list-item${isSelectable ? ' name="group-1" value="value-3" ' : ''}${
        settings.group.checksSelectable
      }>
      <rds-structured-list-data>Item_3</rds-structured-list-data>
        <rds-structured-list-data>Item_3</rds-structured-list-data>
        <rds-structured-list-data${
          settings.group.data
        }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</rds-structured-list-data>
      </rds-structured-list-item>
    </template>
  </rds-structured-list>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          Selected value ''{{listVal}}''
          <input type="radio" value="value-1" v-model="listVal" group="story">Radio 1</input>
          <input type="radio" value="value-2" v-model="listVal" group="story">Radio 2</input>
          <input type="radio" value="value-3" v-model="listVal" group="story">Radio 3</input>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: {
          RdsStructuredList,
          RdsStructuredListItem,
          RdsStructuredListHeading,
          RdsStructuredListData,
          SvTemplateView,
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            listVal: 'value-3',
          };
        },
        methods: {
          actionChange: action('Structured list - change'),
        },
      };
    },
    {
      notes: { markdown: RdsStructuredListNotesMD },
    }
  );
}
