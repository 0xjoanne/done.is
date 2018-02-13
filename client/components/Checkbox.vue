<template>
  <i
    :class="[
      'iconfont',
      completed ? 'icon-checkbox-selected-o' : 'icon-checkbox-o',
      'checkbox',
      completed || !activePriorityColor ? '' : priority
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
    },
    activePriorityColor: {
      type: Boolean,
      default: true
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
  cursor: pointer;
}

.checkbox,
.checkbox__none {
  color: #ccc;
}

.checkbox__high {
  color: #ea6151;
}

.checkbox__medium {
  color: #ffc200;
}

.checkbox__low {
  color: #00b950;
}
</style>
