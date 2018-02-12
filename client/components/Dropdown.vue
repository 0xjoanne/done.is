<template>
  <div
    v-click-outside="hideDropdown"
    class="dropdown"
    :style="{'left': left + 'px', 'top': top + 'px'}"
    v-if="visible">

    <slot></slot>

    <div class="dropdown__arrow"></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  methods: {
    hideDropdown () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style>
.dropdown {
  z-index: 9999;
  background: white;
  padding: 20px 10px 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  position: absolute;
}

.dropdown__arrow,
.dropdown__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}

.dropdown__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}

.dropdown__arrow:after {
  top: 1px;
  content: '';
  border-width: 6px;
  border-top-width: 0;
  border-bottom-color: white;
  margin-left: -6px;
}
</style>
