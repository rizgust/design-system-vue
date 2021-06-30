<template>
  <td :style="cellStyle">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'RdsDataTableCell',
  props: {
    cellStyle: {},
  },
};
</script>
