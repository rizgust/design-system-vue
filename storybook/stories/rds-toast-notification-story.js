import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsToastNotificationNotesMD from '../../core/components/rds-toast-notification/rds-toast-notification-notes.md';
import { RdsToastNotification } from '../../core/';

const storiesDefault = storiesOf('Components/RdsToastNotification', module);
// const storiesExperimental = storiesOf('Experimental/RdsToastNotification', module);

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'title',
  },
  subTitle: {
    group: 'attr',
    type: text,
    config: ['subtitle', 'a subtitle'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'sub-title',
  },
  caption: {
    group: 'attr',
    type: text,
    config: ['caption', 'Time stamp <a href="#">[00:00:00]</a>'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'caption',
  },
  events: {
    group: 'attr',
    value: `@close="doClose"`,
  },
  closeAriaLabel: {
    group: 'attr',
    type: text,
    config: ['close-arial-label', 'Custom close aria label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'close-aria-label',
  },
  lowContrast: {
    group: 'attr',
    type: boolean,
    config: ['Low contrast', false],
    prop: 'low-contrast',
  },
};

const variants = [
  { name: 'default', excludes: ['closeAriaLabel'] },
  { name: 'error', extra: { kind: { group: 'attr', value: 'kind="error"' } } },
  { name: 'info', extra: { kind: { group: 'attr', value: 'kind="info"' } } },
  {
    name: 'success',
    extra: { kind: { group: 'attr', value: 'kind="success"' } },
  },
  {
    name: 'warning',
    extra: { kind: { group: 'attr', value: 'kind="warning"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-toast-notification v-if="visible" ${settings.group.attr}></rds-toast-notification>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other"><button @click="visible = true">Show if hidden</button></template>
    </sv-template-view>
  `;

      return {
        components: { RdsToastNotification, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            visible: true,
          };
        },
        methods: {
          actionClose: action('RDS ToastNotification - close'),
          doClose(ev) {
            this.visible = false;
            this.actionClose(ev);
          },
        },
      };
    },
    {
      notes: { markdown: RdsToastNotificationNotesMD },
      knobs: {
        escapeHTML: false,
      },
    }
  );
}
