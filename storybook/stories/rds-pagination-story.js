import { storiesOf } from '@storybook/vue';
import { text, object, number, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsPaginationNotesMD from '../../core/components/rds-pagination/rds-pagination-notes.md';
import { RdsPagination } from '../../core/';

const storiesDefault = storiesOf('Components/RdsPagination', module);
// const storiesExperimental = storiesOf('Experimental/RdsPagination', module);

const preKnobs = {
  backwardsText: {
    group: 'attr',
    type: text,
    config: ['backwards button text', 'Previous page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'backward-text',
  },
  forwardsText: {
    group: 'attr',
    type: text,
    config: ['forwards button text', 'Next page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'forward-text',
  },
  pageNumberLabel: {
    group: 'attr',
    type: text,
    config: ['page number label', 'Page number'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'page-number-label',
  },
  pageSizesLabel: {
    group: 'attr',
    type: text,
    config: ['page sizes label', 'Items per page:'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'page-sizes-label',
  },
  numberOfItems: {
    group: 'attr',
    type: number,
    config: ['Number of items', 103],
    prop: 'number-of-items',
  },
  page: {
    group: 'attr',
    type: number,
    config: ['initial page', 2],
    prop: 'page',
  },
  pageSizes: {
    group: 'attr',
    type: object,
    config: ['Page sizes', { list: [10, { value: 20, selected: true }, 30, 40, 50] }],
    prop: 'page-sizes',
    value: val => val.list,
  },
  disableBackwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable backwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'backwards-button-disabled',
  },
  disabledForwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable forwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'forwards-button-disabled',
  },
  events: {
    group: 'attr',
    value: `@change="onChange"`,
  },
  slots: {
    group: 'slots',
    value: `<template v-slot:range-text="{scope}">From {{scope.start}} to {{scope.end}} out of {{scope.items}}</template>
  <template v-slot:of-n-pages="{scope}">out of {{scope.pages}} pages</template>
  `,
  },
};

const variants = [
  { name: 'default', excludes: ['events', 'slots'] },
  { name: 'slottedFields', excludes: ['events'] },
  { name: 'minimal', includes: ['disabledForwards'] },
  { name: 'events', includes: ['events'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<rds-pagination${settings.group.attr}>${settings.group.slots}</rds-pagination>
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
        components: { RdsPagination, SvTemplateView },

        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('rds-paginationr - change event'),
        },
      };
    },
    {
      notes: { markdown: RdsPaginationNotesMD },
    }
  );
}
