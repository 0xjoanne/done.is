<template>
  <el-row>
    <el-col :span="14">
      <div class="main-container main-content">
        <flex-box
          justify="flex-end"
          class="main-content__action-bar">
          <search
            v-if="activeNavId !== '6'"
            @search="getTasks"
            class="main-content__search">
          </search>

          <sort-menu
            :currentOrder.sync="currentOrder"
            class="main-content__sort-menu"
            v-if="activeNavId !== '6' && activeNavId !== '5'"
            @update-order="getTasks">
          </sort-menu>

          <i
            class="iconfont icon-clean icon main-content__clean"
            v-if="activeNavId === '6'"
            @click="cleanTrash">
          </i>
        </flex-box>

        <!-- task input  -->
        <task-input v-show="activeNavId !== '5' && activeNavId !== '6'"></task-input>

        <!-- task list  -->
        <div
          v-if="tasks.length"
          class="main-content__task-list"
          :style="{ height: taskListHeight }">
          <div
            v-for="item in tasks"
            :key="item.id">
            <task-list
              :list="item"
              v-if="item.content.length">
            </task-list>
          </div>
        </div>

        <empty-template
          :templateStyle="{ height: 'calc(100vh - 185px)', paddingTop: '25%', background: 'white' }"
          icon="nodata"
          iconFontSize="120px"
          label="Type a task and get it done!"
          v-else>
        </empty-template>
      </div>
    </el-col>

    <!-- main details / right side -->
    <el-col :span="10">
      <task-details
        :task="selectedTask"
        v-if="detailsVisibility">
      </task-details>

      <empty-template
        icon="detail"
        label="Click task title to view details"
        v-else>
      </empty-template>
    </el-col>
  </el-row>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import Search from 'components/Search'
import SortMenu from 'components/Menu/SortMenu'
import TaskInput from 'components/TaskInput'
import TaskList from 'components/TaskList'
import EmptyTemplate from 'components/EmptyTemplate'
import TaskDetails from 'components/TaskDetails'
import { mapState } from 'vuex'
import moment from 'moment'
import { getArrayDate } from 'libs/formatdate'

export default {
  components: {
    FlexBox,
    Search,
    SortMenu,
    TaskInput,
    TaskList,
    EmptyTemplate,
    TaskDetails
  },
  data () {
    return {
      currentOrder: 'time',
      showDetails: false,
      tasks: []
    }
  },
  methods: {
    async getTasksByOrder(order, search) {
      this.tasks = []
      const userId = localStorage.getItem('userId')
      const { data } = await this.axios.get('/item/list?userid=' + userId + '&nav=' + this.activeNavId + '&order=' + order + '&title=' + search)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.tasks = data.data.map(task => {
          task.due_date_array = task.due_date === null ? [] : getArrayDate(task.due_date)
          return task
        })
      }
    },
    async getTasks(search = '') {
      if (this.activeNavId !== '5') {
        await this.getTasksByOrder(this.currentOrder, search)
      } else {
        await this.getTasksByOrder('list', search)
      }
    },
    async cleanTrash () {
      const userId = localStorage.userId
      const { data } = await this.axios.put('/item/clear?userid=' + userId)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-task-list')
      }
    }
  },
  computed: {
    ...mapState({
      selectedTask: state => state.task,
      detailsVisibility: state => state.detailsVisibility,
      activeNavId: state => state.navId
    }),
    taskListHeight () {
      if (this.activeNavId === '5' || this.activeNavId === '6') {
        return 'calc(100vh - 125px)'
      } else {
        return 'calc(100vh - 231px)'
      }
    }
  },
  async created () {
    this.$bus.$on('get-task-list', async () => {
      await this.getTasks()
    })
    await this.getTasks()
  }
}
</script>

<style>
.main-content {
  padding-right: 20px;
}

.main-content__action-bar {
  height: 60px;
  margin-left: 20px;
  border-bottom: 1px solid #fbfbfb;
}

.main-content__search,
.main-content__sort-menu {
  margin-right: 20px;
}

.main-content__clean {
  margin-right: 20px;
}

.main-content__task-list {
  overflow: scroll;
}
</style>
