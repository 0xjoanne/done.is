<template>
  <el-row>
    <el-col :span="14">
      <div class="main-container main-content">
        <flex-box
          justify="flex-end"
          class="main-content__action-bar">
          <search v-if="activeNavId !== '6'"></search>

          <sort-menu
            :currentOrder.sync="currentOrder"
            class="main-content__sort-menu"
            v-if="activeNavId !== '6'">
          </sort-menu>

          <i
            class="iconfont icon-clean icon main-content__clean"
            v-if="activeNavId === '6'"
            @click="cleanTrash">
          </i>
        </flex-box>

        <!-- task input  -->
        <task-input v-if="activeNavId !== '5' && activeNavId !== '6'"></task-input>

        <!-- task list  -->
        <div v-if="tasks.length">
          <div
            v-for="(item, index) in tasks"
            :key="index">
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
      tasks: [{
        title: 'TODAY',
        content: [{
          id: 1,
          index: 1,
          title: 'Test to do',
          color: '#94D050',
          created_at: 'Today',
          due_date: [2018, 2, 12],
          completed: false,
          desc: '',
          priority_id: '1',
          group_id: '10',
          subtasks: []
        }, {
          id: 2,
          index: 2,
          title: 'Hello world Hello world Hello world Hello world Hello world Hello world Hello world',
          color: '#FFAC2A',
          created_at: 'Yesterday',
          due_date: [2018, 2, 11],
          completed: true,
          desc: '',
          priority_id: '4',
          group_id: '',
          subtasks: []
        }, {
          id: 3,
          index: 3,
          title: 'Hello world',
          color: '#FFD422',
          created_at: 'Feb 22',
          due_date: [2018, 2, 22],
          completed: false,
          desc: '',
          priority_id: '2',
          group_id: '',
          subtasks: []
        }]
      }, {
        title: 'YESTERDAY',
        content: [{
          id: 4,
          index: 4,
          title: 'Test to do',
          color: '#1890FF',
          created_at: 'Today',
          due_date: [2018, 2, 12],
          completed: false,
          desc: '',
          priority_id: '3',
          group_id: '',
          subtasks: []
        }, {
          id: 5,
          index: 5,
          title: 'Hello world',
          color: '#41D9C7',
          created_at: 'Feb 22',
          due_date: [2018, 2, 22],
          completed: false,
          desc: '',
          priority_id: '2',
          group_id: '',
          subtasks: []
        }, {
          id: 6,
          index: 6,
          title: 'Test to do',
          color: '#A5C5C1',
          created_at: 'Today',
          due_date: [2018, 2, 12],
          completed: false,
          desc: '',
          priority_id: '4',
          group_id: '',
          subtasks: []
        },{
          id: 7,
          index: 7,
          title: 'Test to do',
          color: '#BD988C',
          created_at: 'Today',
          due_date: [2018, 2, 12],
          completed: false,
          desc: '',
          priority_id: '4',
          group_id: '',
          subtasks: []
        },{
          id: 8,
          index: 8,
          title: 'Test to do',
          color: '#FF67A6',
          created_at: 'Today',
          due_date: [2018, 2, 12],
          completed: false,
          desc: '',
          priority_id: '4',
          group_id: '',
          subtasks: []
        }, {
          id: 9,
          index: 9,
          title: 'Hello world',
          color: '#8543E0',
          created_at: 'Feb 22',
          due_date: [2018, 2, 22],
          completed: false,
          desc: '',
          priority_id: '4',
          group_id: '',
          subtasks: []
        }]
      }]
    }
  },
  methods: {
    cleanTrash () {

    }
  },
  computed: mapState({
    selectedTask: state => state.task,
    detailsVisibility: state => state.detailsVisibility,
    activeNavId: state => state.navId
  })
}
</script>

<style>
.main-container {
  height: calc(100vh - 65px);
  overflow: scroll;
}

.main-content {
  padding-right: 20px;
}

.main-content__action-bar {
  height: 60px;
  margin-left: 20px;
  border-bottom: 1px solid #fbfbfb;
}

.main-content__sort-menu {
  margin: 0 20px 0 15px;
}

.main-content__clean {
  margin-right: 20px;
}
</style>
