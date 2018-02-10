<template>
  <el-dropdown
    trigger="click"
    placement="bottom"
    @command="handleCommand"
    class="sort-menu">
    <i class="el-icon-sort"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        command="time"
        :class="['sort-menu__item', { 'active' : currentOrder === 'time' }]">
        <i class="iconfont icon-date-order sort-menu__item-icon"></i>
        <span>By time</span>
      </el-dropdown-item>

      <el-dropdown-item
        command="priority"
        :class="['sort-menu__item', { 'active' : currentOrder === 'priority' }]">
        <i class="iconfont icon-priority-order sort-menu__item-icon"></i>
        <span>By priority</span>
      </el-dropdown-item>

      <el-dropdown-item
        command="list"
        :class="['sort-menu__item', { 'active' : currentOrder === 'list' }]">
        <i class="iconfont icon-menu sort-menu__item-icon"></i>
        <span>By list</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    currentOrder: {
      type: String,
      required: true
    }
  },
  methods: {
    handleCommand (order) {
      this.$emit('update:currentOrder', order)
    }
  }
}
</script>

<style>
.sort-menu.el-dropdown {
  cursor: pointer;
  font-size: 16px;
}

.sort-menu__item.el-dropdown-menu__item {
  padding-right: 30px
}

.sort-menu__item.active {
  color: #66b1ff;
}

.sort-menu__item-icon {
  font-size: 18px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
