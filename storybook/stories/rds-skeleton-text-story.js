import { storiesOf } from '@storybook/vue';
import { boolean, text, number } from '@storybook/addon-knobs';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
import knobsHelper from '../utils/knobs-helper';

import RdsSkeletonTextNotesMD from '../../core/components/rds-skeleton-text/rds-skeleton-text-notes.md';
import { RdsSkeletonText } from '../../core/';

const storiesDefault = storiesOf('Components/RdsSkeletonText', module);
// const storiesExperimental = storiesOf('Experimental/RdsSkeletonText', module);

const preKnobs = {
  heading: {
    group: 'attr',
    type: boolean,
    config: ['Skeleton text at a larger size (heading)', false], // consts.CONFIG
    prop: 'heading',
  },
  paragraph: {
    group: 'attr',
    type: boolean,
    config: ['Use multiple lines of text (paragraph)', false], // consts.CONFIG
    prop: 'paragraph',
  },
  lineCount: {
    group: 'attr',
    type: number,
    config: ['The number of lines in a paragraph (lineCount)', 3],
    prop: 'line-count',
  },
  width: {
    group: 'attr',
    type: text,
    config: ['Width (in px or %) of single line of text or max-width of paragraph lines (width)', '100%'], // consts.CONFIG
    prop: 'width',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', excludes: ['heading', 'width', 'paragraph', 'lineCount'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
        <rds-skeleton-text${settings.group.attr}></rds-skeleton-text>
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
        components: { RdsSkeletonText, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: RdsSkeletonTextNotesMD },
    }
  );
}
