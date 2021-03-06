import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../views/sv-template-view/sv-template-view';

import RdsGridNotesMD from '../../core/components/rds-grid/rds-grid-notes.md';
import { RdsGrid, RdsRow, RdsColumn } from '../../core/';

import './rds-grid-story.scss';

const storiesDefault = storiesOf('Components/RdsGrid', module);

const components = { RdsGrid, RdsRow, RdsColumn, SvTemplateView };
const getTemplate = content => `
    <sv-template-view
      sv-margin
      sv-source='${content.trim()}'>
      <template slot="component">
        <div class="rds-grid-story">
          ${content}
        </div>
      </template>
    </sv-template-view>
  `;

storiesDefault.add(
  'Auto-columns',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column><div class="rds-grid-story__preview-col">span 25%</div></rds-column>
    <rds-column><div class="rds-grid-story__preview-col">span 25%</div></rds-column>
    <rds-column><div class="rds-grid-story__preview-col">span 25%</div></rds-column>
    <rds-column><div class="rds-grid-story__preview-col">span 25%</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Condensed grid',
  () => ({
    components,
    template: getTemplate(`
<rds-grid kind="condensed">
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Condensed row',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row kind="condensed">
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Full width grid',
  () => ({
    components,
    template: getTemplate(`
<rds-grid fullWidth>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Row kinds',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">default</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row kind="narrow">
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">narrow</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row kind="condensed">
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">condensed</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Narrow grid',
  () => ({
    components,
    template: getTemplate(`
<rds-grid kind="narrow">
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Narrow row',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row kind="narrow">
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
  <rds-row>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
    <rds-column :sm="1"><div class="rds-grid-story__preview-col">1/4</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Offset',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column :sm="{ span: 1, offset: 3 }"><div class="rds-grid-story__preview-col">small: offset 3</div></rds-column>
    <rds-column :sm="{ span: 2, offset: 2 }"><div class="rds-grid-story__preview-col">small: offset 2</div></rds-column>
    <rds-column :sm="{ span: 3, offset: 1 }"><div class="rds-grid-story__preview-col">small: offset 1</div></rds-column>
    <rds-column :sm="{ span: 4, offset: 0 }"><div class="rds-grid-story__preview-col">small: offset 0</div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);

storiesDefault.add(
  'Responsive',
  () => ({
    components,
    template: getTemplate(`
<rds-grid>
  <rds-row>
    <rds-column :sm="2" :md="4" :lg="6"><div class="rds-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 4 of 8</p>
      <p>large: span 6 of 12</p>
    </div></rds-column>
    <rds-column :sm="2" :md="2" :lg="3"><div class="rds-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></rds-column>
    <rds-column :sm="0" :md="2" :lg="3"><div class="rds-grid-story__preview-col">
      <p>small: span 0 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></rds-column>
  </rds-row>
</rds-grid>
    `),
  }),
  {
    notes: { markdown: RdsGridNotesMD },
  }
);
