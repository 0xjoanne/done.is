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

    <!-- <div
      v-if="item.tasks.length !== 0 && lengthVisible && !dropdownVisible"
      class="list-item__num">
      {{ item.tasks.length }}
    </div> -->

    <el-dropdown
      trigger="click"
      placement="bottom"
      class="list-item__dropdown"
      @visible-change="handleVisibleChange"
      v-show="dropdownIconVisible || dropdownVisible"
      @command="handleCommand">
      <i
        class="el-icon-more"
        @click="openDropdown">
      </i>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="edit">
          Edit
        </el-dropdown-item>

        <el-dropdown-item command = "archive">
          Archive
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
    openDropdown (e) {
      e.stopPropagation()
    },
    handleVisibleChange (show) {
      this.dropdownVisible = show
    },
    handleCommand (command) {
      if (command === 'edit') {
        this.editList()
      } else if (command === 'archive') {
        this.archiveList()
      } else if (command === 'delete') {
        this.deleteList()
      }
    },
    editList () {
      this.$emit('edit-list', this.item)
    },
    archiveList () {
      this.$confirm('All tasks of this list will be displayed in "Archive". Are you sure you want to archive "' + this.item.title + '"?', 'Archive List', {
        confirmButtonText: 'Archive',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.confirmArchive()
      }).catch(() => {

      })
    },
    async confirmArchive () {
      const { data } = await this.axios.put('/group/' + this.item.id + '/archive')

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-group-list')
        this.$bus.$emit('get-task-list')
        this.$message({
          type: 'success',
          message: 'Archived successfully!'
        })
      }
    },
    deleteList () {
      this.$confirm('All tasks of this list will be deleted. Are you sure you want to delete "' + this.item.title + '"?', 'Delete List', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.confirmDelete()
      }).catch(() => {

      })
    },
    async confirmDelete () {
      const { data } = await this.axios.delete('/group/' + this.item.id)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-group-list')
        this.$bus.$emit('get-task-list')
        this.$message({
          type: 'success',
          message: 'Deleted successfully!'
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
