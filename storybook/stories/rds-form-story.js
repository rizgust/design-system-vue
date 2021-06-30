import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../views/sv-template-view/sv-template-view';
// import consts from '../utils/consts';
import knobsHelper from '../utils/knobs-helper';

import RdsFormNotesMD from '../../core/components/rds-form/rds-form-notes.md';
import {
  RdsForm,
  RdsFormGroup,
  RdsTextArea,
  RdsTextInput,
  RdsSelect,
  RdsButton,
  RdsRadioButton,
  RdsRadioGroup,
  RdsSelectOptgroup,
  RdsSelectOption,
} from '../../core/';

const storiesDefault = storiesOf('Components/RdsForm', module);
// const storiesExperimental = storiesOf('Experimental/RdsForm', module);

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <rds-form @submit.prevent="actionSubmit">
    <rds-text-input
      label="Example text label"
      helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
      placeholder="Optional placeholder text">
    </rds-text-input>
    <rds-text-area
      label="Example text label"
      helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
      placeholder="Optional placeholder text">
    </rds-text-area>
    <rds-select label="Example select label">
      <rds-select-option disabled selected hidden>Choose an option</rds-select-option>
      <rds-select-optgroup label="Category 1">
        <rds-select-option value="rds-select-option1">rds-select-option 1</rds-select-option>
        <rds-select-option value="rds-select-option2">rds-select-option 2</rds-select-option>
      </rds-select-optgroup>
      <rds-select-optgroup label="Category 2">
        <rds-select-option value="rds-select-option3">rds-select-option 3</rds-select-option>
        <rds-select-option value="rds-select-option4">rds-select-option 4</rds-select-option>
      </rds-select-optgroup>
    </rds-select>
    <rds-button>Submit</rds-button>
  </rds-form>
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
        components: {
          RdsForm,
          RdsButton,
          RdsTextInput,
          RdsTextArea,
          RdsSelect,
          RdsSelectOptgroup,
          RdsSelectOption,
          SvTemplateView,
        },

        template: templateViewString,
        props: settings.props,
        mounted() {
          this.doSubmit = action('rds-form -submit event');
        },
        methods: {
          actionSubmit(ev) {
            // eslint-disable-next-line
            console.dir([].slice.call(ev.target, [0, ev.target.length]));

            this.doSubmit();
          },
        },
      };
    },
    {
      notes: { markdown: RdsFormNotesMD },
    }
  );
}

for (const story of storySet) {
  storiesDefault.add(
    `form-group-${story.name}`,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<rds-form @submit.prevent="actionSubmit">
  <rds-form-group style="style" noMargin invalid message="An optional message">
    <template slot="label">
      FormGroup label-legend
    </template>
    <template slot="content">
      <rds-text-input label="First Name" />
      <rds-text-input label="Last Name" />
      <rds-radio-group>
        <rds-radio-button label="Option 1" value="radio-1" id="radio-1" />
        <rds-radio-button label="Option 2" value="radio-2" id="radio-2" />
        <rds-radio-button label="Option 3" value="radio-3" id="radio-3" />
      </rds-radio-group>
    </template>
  </rds-form-group>
  <rds-button>Submit</rds-button>
</rds-form>`;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: {
          RdsForm,
          RdsFormGroup,
          RdsButton,
          RdsRadioButton,
          RdsRadioGroup,
          RdsTextInput,
          SvTemplateView,
        },

        template: templateViewString,
        props: settings.props,
        computed: {
          style() {
            return { maxWidth: '400px' };
          },
        },
        mounted() {
          this.doSubmit = action('rds-form-group -submit event');
        },
        methods: {
          actionSubmit(ev) {
            // eslint-disable-next-line
            console.dir([].slice.call(ev.target, [0, ev.target.length]));

            this.doSubmit();
          },
        },
      };
    },
    {
      notes: { markdown: RdsFormNotesMD },
    }
  );
}
