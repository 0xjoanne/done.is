<template>
  <flex-box
    :class="['list-item', { active: isActive }]"
    @mouseenter.native="mouseenterListItem"
    @mouseleave.native="mouseleaveListItem">
    <flex-box>
      <i class="iconfont icon-drag-vertical list-item__drag"></i>

      <div class="list-item__color-block">
        <span
          v-if="item.color"
          class="list-item__color"
          :style="{ background: item.color}">
        </span>

        <span
          v-else
          class="list-item__color"
          :style="{ background: '#696969'}">
        </span>
      </div>

      <span
        :title="item.title"
        class="list-item__title">
        {{ item.title }}
      </span>
    </flex-box>

    <div
      v-if="item.tasks.length !== 0 && lengthVisible && !dropdownVisible"
      class="list-item__num">
      {{ item.tasks.length }}
    </div>

    <el-dropdown
      trigger="click"
      placement="bottom"
      class="list-item__dropdown"
      @visible-change="handleVisibleChange"
      v-show="dropdownIconVisible || dropdownVisible"
      @command="handleCommand">
      <i class="el-icon-more"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="edit">
          Edit
        </el-dropdown-item>

        <el-dropdown-item command = "close">
          Close
        </el-dropdown-item>

        <el-dropdown-item command = "delete">
          Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      lengthVisible: true,
      dropdownIconVisible: false,
      dropdownVisible: false
    }
  },
  methods: {
    mouseenterListItem () {
      this.lengthVisible = false
      this.dropdownIconVisible = true
    },
    mouseleaveListItem () {
      this.lengthVisible = true
      this.dropdownIconVisible = false
    },
    handleVisibleChange (show) {
      this.dropdownVisible = show
    },
    handleCommand (command) {
      if (command === 'edit') {
        this.$emit('edit-list', this.item)
      } else if (command === 'close') {

      } else if (command === 'delete') {
        this.$confirm('All tasks of this list will be deleted. Are you sure you want to delete "' + this.item.title + '"?', 'Delete List', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Deleted successfully!'
          })
        }).catch(() => {

        })
      }
    }
  }
}
</script>

<style>
.list-item {
  height: 40px;
  padding: 0 30px 0 14px;
  cursor: pointer;
}

.list-item:hover,
.list-item.active {
  color: white;
  background: #7d82963b;
}

.list-item__drag {
  cursor: move;
  opacity: 0;
}

.list-item:hover .list-item__drag {
  opacity: 1;
  color: #aaa;
}

.list-item__color-block {
  display: inline-block;
  width: 20px;
  text-align: center;
  vertical-align: middle;
}

.list-item__color {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.list-item__title {
  max-width: 140px;
  margin-left: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.list-item__dropdown.el-dropdown {
  color: white;
}

</style>
