<template>
  <fieldset
    :class="[
      `rds-form-group ${carbonPrefix}--fieldset`,
      {
        [`${carbonPrefix}--fieldset--no-margin`]: noMargin,
      },
    ]"
    :data-invalid="invalid"
  >
    <legend :class="`${carbonPrefix}--label`">
      <slot name="label"></slot>
    </legend>
    <slot name="content"></slot>
    <div v-if="message" :class="`${carbonPrefix}--form__requirements`">
      {{ message }}
    </div>
  </fieldset>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'RdsFormGroup',
  mixins: [carbonPrefixMixin],
  props: {
    noMargin: Boolean,
    invalid: Boolean,
    message: String,
  },
};
</script>
