<template>
  <i
    :class="[
      'iconfont',
      completed ? 'icon-checkbox-selected-o' : 'icon-checkbox-o',
      'checkbox',
      completed ? '' : priority
    ]"
    @click="toggleStatus">
  </i>
</template>

<script>
const priorityMap = {
  1: 'high',
  2: 'medium',
  3: 'low',
  4: 'none'
}

export default {
  props: {
    completed: {
      type: Boolean,
      default: false,
      required: true
    },
    priorityId: {
      type: String,
      default: '4'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    toggleStatus () {
      this.$emit('update:completed', !this.completed)
    }
  },
  computed: {
    priority: function () {
      return 'checkbox__' + priorityMap[this.priorityId]
    }
  }
}
</script>

<style>
.checkbox {
  font-size: 24px;
}

.checkbox,
.checkbox__none {
  color: #dcdfe6;
}

.checkbox__high {
  color: #ff0013;
}

.checkbox__medium {
  color: #ffc200;
}

.checkbox__low {
  color: #00b950;
}
</style>
