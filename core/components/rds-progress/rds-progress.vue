<template>
  <ul
    data-progress
    data-progress-current
    :class="[`rds-progress ${carbonPrefix}--progress`, { [`${carbonPrefix}--progress--vertical`]: vertical }]"
  >
    <slot>
      <rds-progress-step
        v-for="(step, index) in steps"
        :key="`step:${index}`"
        :label="step"
        :complete="initialStep > index"
        ref="steps"
      />
    </slot>
  </ul>
</template>

<script>
import RdsProgressStep from './rds-progress-step';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'RdsProgress',
  mixins: [carbonPrefixMixin],
  components: {
    RdsProgressStep,
  },
  props: {
    initialStep: { type: Number, default: 0 },
    steps: Array,
    vertical: Boolean,
  },
  created() {
    // add these on created otherwise rds:mounted is too late.
    this.$on('rds:completed', srcComponent => this.onRdsCompleted(srcComponent));
    this.$on('rds:mounted', srcComponent => this.onRdsMount(srcComponent));
    this.$on('rds:beforeDestroy', srcComponent => this.onRdsBeforeDestroy(srcComponent));
  },
  computed: {
    state() {
      return () => {
        console.warn('RdsProgress: method deprecated');
        return;
      };
    },
  },
  methods: {
    onRdsMount() {
      this.processState();
    },
    onRdsBeforeDestroy() {
      this.processState();
    },
    onRdsCompleted() {
      this.processState();
    },
    processState() {
      const steps = this.$children.filter(child => child.$_RdsProgressStep);
      let newStep = -1;
      for (let i = 0; i < steps.length; i++) {
        if (!steps[i].complete && newStep < 0) {
          newStep = i;
          steps[i].internalState = 0;
        } else {
          steps[i].internalState = newStep < 0 ? 1 : -1;
        }
      }
    },
    getCurrent() {
      console.warn('RdsProgress: method deprecated');
    },
    getSteps() {
      console.warn('RdsProgress: method deprecated');
    },
    setCurrent() {
      console.warn('RdsProgress: method deprecated');
    },
  },
};
</script>
