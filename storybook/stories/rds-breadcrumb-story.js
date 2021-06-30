import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsBreadcrumbNotesMD from '../../core/components/rds-breadcrumb/rds-breadcrumb-notes.md';
import { RdsBreadcrumb, RdsBreadcrumbItem, RdsBreadcrumbSkeleton, RdsLink } from '../../core/';

const storiesDefault = storiesOf('Components/RdsBreadcrumb', module);
// const storiesExperimental = storiesOf('Experimental/RdsBreadcrumb', module);

const preKnobs = {
  ariaLabel: {
    group: 'attr',
    type: text,
    config: ['aria label', 'breadcrumb aria label'],
    prop: 'aria-label',
  },
  noTrailingSlash: {
    group: 'attr',
    type: boolean,
    config: ['No trailing slash', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'no-trailing-slash',
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <rds-breadcrumb${settings.group.attr}>
    <rds-breadcrumb-item>
      <rds-link href="#somewhere">Some text</rds-link>
    </rds-breadcrumb-item>
    <rds-breadcrumb-item>
      <rds-link href="parent">parent-link</rds-link>
    </rds-breadcrumb-item>
    <rds-breadcrumb-item>
      <rds-link href="#" aria-current="page">here</rds-link>
    </rds-breadcrumb-item>
    <rds-breadcrumb-item>
      <input type="text" class="bx--text-input bx--text-input--light" value="name of thing"></input>
    </rds-breadcrumb-item>
  </rds-breadcrumb>
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
        components: { RdsBreadcrumb, RdsBreadcrumbItem, RdsLink, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsBreadcrumbNotesMD },
    }
  );
}

const templateString = `<rds-breadcrumb-skeleton></rds-breadcrumb-skeleton>`;
storiesDefault.add(
  'skeleton',
  () => ({
    components: { SvTemplateView, RdsBreadcrumbSkeleton },
    template: `
      <sv-template-view
        sv-margin
        sv-position="center"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `,
    props: {},
  }),
  {
    notes: { markdown: RdsBreadcrumbNotesMD },
  }
);
