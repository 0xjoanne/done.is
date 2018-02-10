<template>
  <el-row class="overflow--hidden">
    <el-col :span="14">
      <div class="main-container main-content">
        <flex-box
          justify="flex-end"
          class="main-content__action-bar">
          <search></search>

          <sort-menu
            :currentOrder.sync="currentOrder"
            class="main-content__sort-menu">
          </sort-menu>
        </flex-box>

        <!-- task input  -->
        <task-input></task-input>

        <!-- task list  -->
        <div
          v-for="(item, index) in tasks"
          :key="index">
          <task-list
            :list="item"
            v-if="item.content.length">
          </task-list>
        </div>
      </div>
    </el-col>

    <!-- main details / right side -->
    <el-col :span="10">
      <task-details
        :task="selectedTask"
        v-if="detailsVisibility">
      </task-details>

      <empty-detail v-else></empty-detail>
    </el-col>
  </el-row>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import Search from 'components/Search'
import SortMenu from 'components/Menu/SortMenu'
import TaskInput from 'components/TaskInput'
import TaskList from 'components/TaskList'
import EmptyDetail from 'components/EmptyDetail'
import TaskDetails from 'components/TaskDetails'
import { mapState } from 'vuex'

export default {
  components: {
    FlexBox,
    Search,
    SortMenu,
    TaskInput,
    TaskList,
    EmptyDetail,
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
          completed: false,
          desc: '',
          priority_id: '1',
          group_id: '',
          subtasks: []
        }, {
          id: 2,
          index: 2,
          title: 'Hello world Hello world Hello world Hello world Hello world Hello world Hello world',
          color: '#FFAC2A',
          created_at: 'Yesterday',
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
          completed: false,
          desc: '',
          priority_id: '2',
          group_id: '1',
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

  },
  computed: mapState({
    selectedTask: state => state.task,
    detailsVisibility: state => state.detailsVisibility
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
}

.main-content__sort-menu {
  margin: 0 20px 0 15px;
}
</style>
