import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsInlineLoadingNotesMD from '../../core/components/rds-inline-loading/rds-inline-loading-notes.md';
import { RdsInlineLoading, STATES } from '../../core/components/rds-inline-loading';

const storiesDefault = storiesOf('Components/RdsInlineLoading', module);
// const storiesExperimental = storiesOf('Experimental/RdsInlineLoading', module);

const preKnobs = {
  endingText: {
    group: 'attr',
    type: text,
    config: ['ending text', 'Ending...'],
    prop: 'ending-text',
  },
  errorText: {
    group: 'attr',
    type: text,
    config: ['error text', 'Error.'],
    prop: 'error-text',
  },
  loadingText: {
    group: 'attr',
    type: text,
    config: ['loading text', 'Loading...'],
    prop: 'loading-text',
  },
  loadedText: {
    group: 'attr',
    type: text,
    config: ['loaded text', 'Complete.'],
    prop: 'loaded-text',
  },
  state: {
    group: 'attr',
    type: select,
    config: ['Loading state', STATES, STATES.LOADING],
    prop: 'state',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['state'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<rds-inline-loading${settings.group.attr}></rds-inline-loading>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component" ref="component">
        ${templateString}
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsInlineLoading, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsInlineLoadingNotesMD },
    }
  );
}
