<template>
  <div
    v-click-outside="hideCalendarDropdown"
    class="calendar-dropdown"
    :style="{'left': left + 'px', 'top': top + 'px'}"
    v-if="visible">
    <calendar
      :value="value"
      @select="updateDueDate">
    </calendar>

    <div class="calendar-dropdown__arrow">
    </div>
  </div>
</template>

<script>
import Calendar from 'components/Calendar'

export default {
  components: {
    Calendar
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    value: {
      type: Array,
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
    hideCalendarDropdown () {
      this.$emit('update:visible', false)
    },
    updateDueDate (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>

<style>
.calendar-dropdown {
  z-index: 999;
  background: white;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  position: absolute;
}

.calendar-dropdown__arrow,
.calendar-dropdown__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}

.calendar-dropdown__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}

.calendar-dropdown__arrow:after {
  top: 1px;
  content: '';
  border-width: 6px;
  border-top-width: 0;
  border-bottom-color: white;
  margin-left: -6px;
}
</style>
