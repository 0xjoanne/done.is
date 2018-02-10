<template>
  <flex-box justify="flex-start">
    <el-dropdown
      trigger="click"
      placement="bottom"
      @command="handleCommand">
      <i
        class="iconfont icon-folder1 list-menu__icon"
        :style="currentDropdownIconStyle">
      </i>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="Inbox"
          :class="['list-menu__item', { 'active' : !currentListId }]">
          <i class="iconfont icon-inbox list-menu__item-icon"></i>
          <span>Inbox</span>
        </el-dropdown-item>

        <el-dropdown-item
          v-for="(item, index) in lists"
          :key="index"
          :command="item"
          :class="['list-menu__item', { 'active' : currentListId === item.id }]">
          <i class="iconfont icon-menu list-menu__item-icon"></i>
          <span>{{ item.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span
      v-if="labelVisible"
      class="list-menu__label">
      {{ currentList }}
    </span>

  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  model: {
    prop: 'currentListId'
  },
  props: {
    currentListId: {
      type: String,
      required: true
    },
    lists: {
      type: Array,
      required: true
    },
    dropdownIconStyle: {
      type: Object
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
    currentList () {
      if (this.currentListId) {
        let list = this.lists.filter(item => {return item.id === this.currentListId })
        return list[0].title
      } else {
        return 'Inbox'
      }
    },
    currentDropdownIconStyle () {
      if (this.currentListId) {
        let list = this.lists.filter(item => {return item.id === this.currentListId })
        let defaultStyle = {
          color: list[0].color
        }
        return Object.assign(defaultStyle, this.dropdownIconStyle)
      }
    }
  },
  methods: {
    handleCommand (list) {
      if (list === 'Inbox') {
        this.$emit('update:currentListId', '')
      } else {
        this.$emit('update:currentListId', list.id)
      }
    }
  }
}
</script>

<style>
.list-menu__icon,
.list-menu__item-icon {
  font-size: 20px;
}

.list-menu__icon {
  cursor: pointer;
}

.list-menu__item.el-dropdown-menu__item {
  padding-right: 30px;
}

.list-menu__item.active {
  color: #66b1ff;
}

.list-menu__item-icon {
  vertical-align: middle;
  margin-right: 5px;
}

.list-menu__label {
  margin-left: 5px;
  max-width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
