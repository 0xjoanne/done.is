<template>
  <div
    class="flexbox__container"
    :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    justify: {
      type: String,
      default: 'space-between'
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    style () {
      return {
        justifyContent: this.justify,
        alignItems: this.align
      }
    }
  }
}
</script>

<style>
.flexbox__container {
  display: flex;
}
</style>
