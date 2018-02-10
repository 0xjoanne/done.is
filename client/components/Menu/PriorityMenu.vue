<template>
  <flex-box justify="flex-start">
    <el-dropdown
      trigger="click"
      placement="bottom"
      @command="handleCommand">
      <i
        class="iconfont icon-exclamatory-mark-r priority-menu__icon"
        :style="currentDropdownIconStyle">
      </i>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="1"
          :class="['priority-menu__item', { 'active' : currentPriority === 'High' }]">
          <i class="iconfont icon-number-1 priority-menu__item-icon"></i>
          <span>High</span>
        </el-dropdown-item>

        <el-dropdown-item
          command="2"
          :class="['priority-menu__item', { 'active' : currentPriority === 'Medium' }]">
          <i class="iconfont icon-number-2 priority-menu__item-icon"></i>
          <span>Medium</span>
        </el-dropdown-item>

        <el-dropdown-item
          command="3"
          :class="['priority-menu__item', { 'active' : currentPriority === 'Low' }]">
          <i class="iconfont icon-number-3 priority-menu__item-icon"></i>
          <span>Low</span>
        </el-dropdown-item>

        <el-dropdown-item
          command="4"
          :class="['priority-menu__item', { 'active' : currentPriority === 'None' }]">
          <i class="iconfont icon-number-4 priority-menu__item-icon"></i>
          <span>None</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span
      v-if="labelVisible"
      class="priority-menu__label">
      {{ currentPriority }}
    </span>
  </flex-box>

</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
const priorityMap = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
  4: 'None'
}

const priorityColorMap = {
  1: '#ff0013',
  2: '#ffc200',
  3: '#00b950',
  4: '#aaa'
}

export default {
  components: {
    FlexBox
  },
  props: {
    currentPriorityId: {
      type: String,
      required: true
    },
    dropdownIconStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    labelVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    currentPriority () {
      return priorityMap[this.currentPriorityId]
    },
    currentDropdownIconStyle () {
      let defaultStyle = {
        color: priorityColorMap[this.currentPriorityId]
      }
      return Object.assign(defaultStyle, this.dropdownIconStyle)
    }
  },
  methods: {
    handleCommand (priority) {
      this.$emit('update:currentPriorityId', priority)
    }
  }
}
</script>

<style>
.priority-menu__icon {
  cursor: pointer;
  font-size: 20px;
}

.priority-menu__item.el-dropdown-menu__item {
  padding-right: 30px;
}

.priority-menu__item.active {
  color: #66b1ff;
}

.priority-menu__item-icon {
  font-size: 24px;
  vertical-align: middle;
  margin-right: 5px;
}

.icon-number-1.priority-menu__item-icon {
  color: #ff0013;
}

.icon-number-2.priority-menu__item-icon {
  color: #ffc200;
}

.icon-number-3.priority-menu__item-icon {
  color: #00b950;
}

.icon-number-4.priority-menu__item-icon {
  color: #aaa;
}

.priority-menu__label {
  margin-left: 5px;
}
</style>
