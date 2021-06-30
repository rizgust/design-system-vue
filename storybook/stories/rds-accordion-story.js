import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';
import TimerButton from '../components/timer-button';

import RdsAccordionNotesMD from '../../core/components/rds-accordion/rds-accordion-notes.md';
import { RdsAccordion, RdsAccordionItem, RdsAccordionSkeleton } from '../../core/';

const storiesDefault = storiesOf('Components/RdsAccordion', module);
// const storiesExperimental = storiesOf('Experimental/RdsAccordion', module);

const preKnobs = {
  align: {
    group: 'attr',
    type: select,
    config: [
      'align',
      {
        default: '',
        start: 'start',
        end: 'end',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'align',
  },
  disabled3: {
    group: 'attr3',
    type: boolean,
    config: ['disabled 3', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        'small (sm)': 'sm',
        'large (xl)': 'xl',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};
const variants = [{ name: 'default' }, { name: 'minimal', includes: [] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
  <rds-accordion @change="actionChange" ref="acc" ${settings.group.attr}>
    <rds-accordion-item :open="open[0]">
      <template slot="title">Section 1 title </template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </rds-accordion-item>
    <rds-accordion-item :open="open[1]">
      <template slot="title">Section 2 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </rds-accordion-item>
    <rds-accordion-item :open="open[2]" ${settings.group.attr3}>
      <template slot="title">Section 3 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </rds-accordion-item>
    <rds-accordion-item :open="open[3]">
      <template slot="title">Section 4 title</template>
      <template slot="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </template>
    </rds-accordion-item>
  </rds-accordion>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call item 1 focus() method" active-label-prefix="Call item 1 blur() method in" />
        <div>
          <p>Open items</p>
          <label>1 <input type="checkbox" v-model="open[0]"></label>
          <label>2 <input type="checkbox" v-model="open[1]"></label>
          <label>3 <input type="checkbox" v-model="open[2]"></label>
          <label>4 <input type="checkbox" v-model="open[3]"></label>
        </div>
        <br/>
        <label>Single open only after on change<input type="checkbox" v-model="oneOnly" /></label>
        <p>Listen for change events and run one of the following lines of code.</p>
        <pre v-highlightjs="snippet">
          <code class="json"></code>
        </pre>
      </template>
    </sv-template-view>
  `;

      return {
        components: { RdsAccordion, RdsAccordionItem, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            open: [false, false, false, false],
            oneOnly: false,
            snippet: `// Directly update the RdsAccordionItem open property
this.open = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);
// Alternatively set the RdsAccordion item state (does not update RdsAccordionItem props)
this.$refs.acc.state = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);`,
          };
        },
        mounted() {
          this.onActionChange = action('RdsAccordion - change');
        },
        methods: {
          actionChange(ev) {
            this.onActionChange(ev);
            if (this.oneOnly) {
              this.open = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);
              // this.$refs.acc.state = this.$refs.acc.state.map((item, index) => index === ev.changedIndex);
            }
          },
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.$children[0].focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.$children[0].blur();
          },
        },
      };
    },
    {
      notes: { markdown: RdsAccordionNotesMD },
    }
  );
}

const templateString = `<rds-accordion-skeleton :align="align" :size="size"></rds-accordion-skeleton>`;

storiesDefault.add(
  'skeleton',
  () => {
    return {
      components: { SvTemplateView, RdsAccordionSkeleton },
      template: `
      <sv-template-view
        sv-margin
        sv-position="center"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `,
      props: {
        align: { default: select('Alignment', { default: '', start: 'start', end: 'end' }, '') },
        size: {
          default: select('Size', { default: '', 'small (sm)': 'sm', 'large (xl)': 'xl' }, ''),
        },
      },
    };
  },
  {
    notes: { markdown: RdsAccordionNotesMD },
  }
);
