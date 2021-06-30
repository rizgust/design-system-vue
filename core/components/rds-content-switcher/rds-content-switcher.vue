<template>
  <div
    data-content-switcher
    :class="[
      `rds-content-switcher ${carbonPrefix}--content-switcher`,
      {
        [`${carbonPrefix}--content-switcher--light`]: isLight,
        [`${carbonPrefix}--content-switcher--${size}`]: size,
      },
    ]"
    role="tablist"
  >
    <slot></slot>
  </div>
</template>

<script>
import store from './rds-content-switcher-store';
import { carbonPrefixMixin, themeMixin } from '../../mixins';

const toggleContent = (selector, on) => {
  // hide content
  const content = document.querySelectorAll(selector);
  for (const element of content) {
    // element.style.visibility = on;
    if (!on) {
      element.setAttribute('hidden', 'hidden');
    } else {
      element.removeAttribute('hidden');
    }
    element.setAttribute('aria-hidden', `${!on}`);
  }
};

export default {
  name: 'RdsContentSwitcher',
  mixins: [carbonPrefixMixin, themeMixin],
  created() {
    // add these on created otherwise rds:mounted is too late.
    this.$on('rds:open', srcComponent => this.onRdsOpen(srcComponent));
    this.$on('rds:mounted', srcComponent => this.onRdsMount(srcComponent));
    this.$on('rds:beforeDestroy', srcComponent => this.onRdsBeforeDestroy(srcComponent));
  },
  props: {
    size: {
      type: String,
      default: undefined,
      validator: val => ['', 'sm', 'xl'].includes(val),
    },
  },
  data() {
    return {
      store: store,
    };
  },
  methods: {
    switcherButtons() {
      return this.$children.filter(item => item.$_RdsContentSwitcherButton);
    },
    onRdsMount(srcComponent) {
      this.processState(srcComponent, srcComponent.isSelected);
    },
    onRdsBeforeDestroy(srcComponent) {
      let nextOpen;
      if (srcComponent.isSelected) {
        const switcherButtons = this.switcherButtons();

        for (let index in switcherButtons) {
          if (
            switcherButtons[index].$_RdsContentSwitcherButton &&
            switcherButtons[index].buttonId !== srcComponent.buttonId
          ) {
            nextOpen = switcherButtons[index];
            break;
          }
        }
      }
      // unhide content for destroyed srcComponent
      if (srcComponent.ownerId) {
        this.store.remove(srcComponent.ownerId);
      } else {
        toggleContent(srcComponent.contentSelector, true);
      }
      if (nextOpen) {
        setTimeout(() => {
          nextOpen.open();
        }, 1);
      }
    },
    processState(srcComponent, state) {
      const innerProcessState = (component, newState) => {
        if (component.ownerId) {
          this.store.setState(component.ownerId, newState);
        } else {
          toggleContent(component.contentSelector, newState);
        }
      };
      innerProcessState(srcComponent, state);

      if (state) {
        // if opening one button close others
        const switcherButtons = this.switcherButtons();
        for (let index in switcherButtons) {
          if (switcherButtons[index].buttonId !== srcComponent.buttonId) {
            switcherButtons[index].close();
            innerProcessState(switcherButtons[index], false);
          }
        }
      }
    },
    onRdsOpen(srcComponent) {
      this.$emit('selected', srcComponent.ownerId ? srcComponent.ownerId : srcComponent.contentSelector);
      this.processState(srcComponent, true);
    },
  },
};
</script>
