<template>
  <collapse-transition>
    <div v-if="taskListVisible">
      <flex-box
        class="task-list__header-container cursor--pointer"
        @mouseenter.native="mouseenterTaskList"
        @mouseleave.native="mouseleaveTaskList">
        <div
          class="task-list__header"
          @click="toggleListExpansion(list)">
          <i
            class="el-icon-caret-bottom task-list__header-caret"
            :style="{ transform: caretRotate }">
          </i>
          <span>{{ list.title }}</span>
        </div>

        <el-dropdown
          trigger="click"
          placement="bottom"
          class="task-list__dropdown"
          @visible-change="handleVisibleChange"
          v-show="dropdownIconVisible || dropdownVisible"
          @command="handleCommand">
          <i
            class="el-icon-more">
          </i>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command = "unarchive">
              Unarchive
            </el-dropdown-item>

            <el-dropdown-item command = "delete">
              Delete
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </flex-box>

      <collapse-transition>
        <div
          class="task-list__content"
          v-if="showList">
          <!-- <draggable v-model="list.content" :options="{ group:'task' }" @end="onEndDrag">
            <task-item
              v-for="(item, index) in list.content"
              :key="index"
              :task="item">
            </task-item>
          </draggable> -->

          <task-item
            v-for="item in list.content"
            :key="item.id"
            :task="item">
          </task-item>
        </div>
      </collapse-transition>
    </div>
  </collapse-transition>
</template>

<script>
import draggable from 'vuedraggable'
import FlexBox from 'components/Layout/FlexBox'
import TaskItem from 'components/TaskItem'
import CollapseTransition from 'components/CollapseTransition'
import { mapState } from 'vuex'

export default {
  components: {
    draggable,
    FlexBox,
    TaskItem,
    CollapseTransition
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      caretRotate: 'rotate(0)',
      showList: true,
      dropdownIconVisible: false,
      dropdownVisible: false
    }
  },
  methods: {
    toggleListExpansion (list) {
      this.showList = !this.showList
      if (this.showList) {
        this.caretRotate = 'rotate(0)'
      } else {
        this.caretRotate = 'rotate(-90deg)'
      }
    },
    mouseenterTaskList () {
      if (this.activeNavId === '5') {
        this.dropdownIconVisible = true
      }
    },
    mouseleaveTaskList () {
      this.dropdownIconVisible = false
    },
    handleVisibleChange (show) {
      this.dropdownVisible = show
    },
    handleCommand (command) {
      if (command === 'unarchive') {
        this.unarchiveList()
      } else if (command === 'delete') {
        this.deleteList()
      }
    },
    async unarchiveList () {
      const { data } = await this.axios.put('/group/' + this.list.group_id + '/unarchive')

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
          message: 'Unarchived successfully!'
        })
      }
    },
    deleteList () {
      this.$confirm('All tasks of this list will be deleted. Are you sure you want to delete "' + this.list.title + '"?', 'Delete List', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.confirmDelete()
      }).catch(() => {

      })
    },
    async confirmDelete () {
      const { data } = await this.axios.delete('/group/' + this.list.group_id)

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
    },
    onEndDrag (e) {
      console.log(e)
      console.log(this.list)
    }
  },
  computed: {
    ...mapState({
      activeNavId: state => state.navId
    }),
    taskListVisible () {
      if (this.activeNavId === '4') {
        return this.list.content.filter(item => { return item.is_done === true }).length
      } else {
        return this.list.content.filter(item => { return item.is_done === false }).length
      }
    }
  }
}
</script>

<style>
.task-list__header-container:hover {
  background: #fbfbfb;
}

.task-list__header {
  margin-left: 20px;
  height: 60px;
  line-height: 60px;
  color: #aaa;
  border-bottom: 1px solid #fbfbfb;
}

.task-list__content,
.task-list__header-caret {
  transition: all .3s;
}

.task-list__header-caret{
  margin-right: 5px;
  font-size: 16px;
}

.task-list__dropdown {
  margin-right: 20px;
}

.task-list__dropdown.el-dropdown {
  color: #aaa;
}
</style>
