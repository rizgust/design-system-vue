<template>
  <tbody v-if="someExpandingRows" class="rds-data-table-row rds-data-table-row--expandable" :id="uid">
    <rds-data-table-row-inner
      ref="row"
      v-bind="$attrs"
      v-on="$listeners"
      :expanding-row="dataExpandable"
      some-expanding-rows
      @expanded-change="onExpandedChange"
      :expanded="dataExpanded"
    >
      <slot />
    </rds-data-table-row-inner>
    <tr
      v-if="dataExpandable"
      :class="`${carbonPrefix}--expandable-row ${carbonPrefix}--expandable-row--hidden`"
      data-child-row
    >
      <td colspan="999">
        <div :class="`${carbonPrefix}--child-row-inner-container`">
          <slot name="expandedContent" />
        </div>
      </td>
    </tr>
  </tbody>
  <rds-data-table-row-inner v-else ref="row" v-bind="$attrs" v-on="$listeners" class="rds-data-table-row" :id="uid">
    <slot />
  </rds-data-table-row-inner>
</template>

<script>
import RdsDataTableRowInner from './_rds-data-table-row-inner';
import { uidMixin, carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsDataTableRow',
  mixins: [uidMixin, carbonPrefixMixin],
  components: { RdsDataTableRowInner },
  props: {
    expanded: Boolean,
  },
  data() {
    return {
      dataExpandable: false,
      dataSomeExpandingRows: false,
      dataExpanded: this.expanded,
    };
  },
  watch: {
    expanded() {
      if (this.dataExpanded !== this.expanded) {
        this.dataExpanded = this.expanded;
      }
    },
  },
  mounted() {
    // NOTE: this.$slots is not reactive so needs to be managed on updated
    this.dataExpandable = !!this.$slots.expandedContent;
    this.$parent.$emit('rds:mounted', this);
  },
  updated() {
    this.dataExpandable = !!this.$slots.expandedContent;
  },
  beforeDestroy() {
    this.$parent.$emit('rds:beforeDestroy', this);
  },
  computed: {
    expandable() {
      return this.dataExpandable;
    },
    isRdsDataTableRow() {
      return true;
    },
    isChecked: {
      get() {
        return this.$refs.row.dataChecked;
      },
      set(val) {
        this.$refs.row.dataChecked = val;
      },
    },
    isExpanded: {
      get() {
        return this.dataExpanded;
      },
      set(val) {
        this.dataExpanded = val;
      },
    },
    someExpandingRows: {
      get() {
        return this.dataSomeExpandingRows;
      },
      set(val) {
        this.dataSomeExpandingRows = val;

        if (this.$refs.row) {
          this.$refs.row.dataSomeExpandingRows = val;
        }
      },
    },
    value() {
      return this.$refs.row.value;
    },
  },
  methods: {
    onExpandedChange(val) {
      this.dataExpanded = val;
      this.$emit('rds:expanded-change', this);
    },
  },
};
</script>
