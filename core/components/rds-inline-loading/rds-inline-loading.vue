<template>
  <div data-inline-loading :class="`${carbonPrefix}--inline-loading`" role="alert" aria-live="assertive">
    <div
      :class="[
        `${carbonPrefix}--inline-loading__animation`,
        { [`${carbonPrefix}--loading--stop`]: internalState === STATES.ENDING },
      ]"
    >
      <div
        v-show="internalState === STATES.LOADING || internalState === STATES.ENDING"
        :class="`${carbonPrefix}--loading ${carbonPrefix}--loading--small`"
      >
        <rds-loading :description="description" :active="active" small />
      </div>
      <CheckmarkFilled16
        :hidden="internalState !== STATES.LOADED"
        :class="`${carbonPrefix}--inline-loading__checkmark-container`"
      />
      <ErrorFilled16 :hidden="internalState !== STATES.ERROR" :class="`${carbonPrefix}--inline-loading--error`" />
    </div>
    <p :class="`${carbonPrefix}--inline-loading__text`">{{ stateText }}</p>
  </div>
</template>

<script>
import { STATES } from './consts';
import ErrorFilled16 from '@carbon/icons-vue/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';
import { carbonPrefixMixin } from '../../mixins';
import RdsLoading from '../rds-loading/rds-loading.vue';

export default {
  name: 'RdsInlineLoading',
  components: { ErrorFilled16, CheckmarkFilled16, RdsLoading },
  mixins: [carbonPrefixMixin],
  created() {
    this.STATES = STATES;
  },
  props: {
    active: {
      type: Boolean,
      default: undefined,
      validator: val => {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('RdsInlineLoading: active prop deprecated in favour of state prop');
        }
        return true;
      },
    },
    description: { type: String, default: 'Loading' },
    endingText: { type: String, default: 'Load ending...' },
    errorText: { type: String, default: 'Loading data failed.' },
    loadingText: { type: String, default: 'Loading data...' },
    loadedText: { type: String, default: 'Data loaded.' },
    state: {
      type: String,
      default: undefined,
      validator: val => {
        if (Object.keys(STATES).some(state => STATES[state] === val.toLowerCase())) {
          return true;
        } else {
          console.error(`RdsInlineLoading: Valid states are ${JSON.stringify(Object.values(STATES))}`);
          return false;
        }
      },
    },
  },
  computed: {
    internalState() {
      if (this.state !== undefined) {
        return this.state.toLowerCase();
      } else {
        return this.active ? STATES.LOADING : STATES.LOADED;
      }
    },
    stateText() {
      switch (this.internalState) {
        case STATES.LOADED:
          return this.loadedText;
        case STATES.ERROR:
          return this.errorText;
        case STATES.ENDING:
          return this.endingText;
        default:
          return this.loadingText;
      }
    },
  },
};
</script>
