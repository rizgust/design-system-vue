import { storiesOf } from '@storybook/vue';
import { select } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsAspectRatioNotesMD from '../../core/components/rds-aspect-ratio/rds-aspect-ratio-notes.md';
import { RdsAspectRatio } from '../../core/index';

const storiesDefault = storiesOf('Components/RdsAspectRatio', module);
// const storiesExperimental = storiesOf('Experimental/RdsAspectRatio', module);

const preKnobs = {
  ratio: {
    group: 'attr',
    type: select,
    config: [
      'ratio',
      {
        '16x9': '16x9',
        '9x16': '9x16',
        '2x1': '2x1',
        '1x2': '1x2',
        '4x3': '4x3',
        '3x4': '3x4',
        '1x1': '1x1',
      },
      '1x1',
    ],
    prop: 'ratio',
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
<rds-aspect-ratio${settings.group.attr} style="background: #f7f1ff; padding: 1rem;">
  <div>
      Content ({{ratio}})
      <br/>
      Width based only
  </div>
</rds-aspect-ratio>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">
        ${templateString}
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsAspectRatio, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsAspectRatioNotesMD },
    }
  );
}
