import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsLinkNotesMD from '../../core/components/rds-link/rds-link-notes.md';
import { RdsLink } from '../../core/';
import { action } from '@storybook/addon-actions';

const storiesDefault = storiesOf('Components/RdsLink', module);
// const storiesExperimental = storiesOf('Experimental/RdsLink', module);

const preKnobs = {
  href: {
    group: 'attr',
    type: text,
    config: ['href', 'javascript:void(0)'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'href',
  },
  to: {
    group: 'attr',
    type: text,
    config: ['to', 'javascript:void(0)'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'to',
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false],
    prop: 'inline',
  },
};

const variants = [
  { name: 'a', excludes: ['to'] },
  { name: 'router-link', excludes: ['href'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-link${settings.group.attr}>
  Link
</rds-link>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">
        <div>
        Lorem ipsum dolor sit amet.
        ${templateString}
        Consectetur adipiscing elit.
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsLink, SvTemplateView },

        template: templateViewString,
        props: settings.props,
        methods: {
          actionClick: action('Click event'),
        },
      };
    },
    {
      notes: { markdown: RdsLinkNotesMD },
    }
  );
}
