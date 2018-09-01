<template>
  <div
    v-click-outside="hideTaskPreset"
    class="task-input__container">
    <div class="task-input__title">
      <!-- start with = to create multiple task -->
      <el-input
        :placeholder="placeholder"
        v-model="taskTitle"
        :maxlength="30"
        class="task-input"
        @focus="showTaskPreset"
        @keyup.enter.native="addTask">
      </el-input>

      <i class="iconfont icon-arrow-right task-input__title-icon"></i>
    </div>

    <flex-box
      justify="flex-start"
      class="task-input__preset">
      <flex-box
        class="task-input__preset-item"
        @click.native="toggleCalendar">
        <i
          class="iconfont icon-calendar task-input__preset-icon cursor--pointer">
        </i>

        <span
          class="task-input__preset-label">
          {{ formatdate(due_date) }}
        </span>
      </flex-box>

      <list-menu
        :current-list-id.sync="listId"
        class="task-input__preset-item"
        @get-list-title="getListTitle">
      </list-menu>

      <priority-menu
        :current-priority-id.sync="priority"
        class="task-input__preset-item">
      </priority-menu>
    </flex-box>

    <dropdown
      :visible.sync="showCalendar"
      :left="calendarLeft"
      :top="calendarTop">
      <calendar
        :value.sync="due_date"
        :zero="true"
        @select="selectDate"
        @clear="showCalendar = false"
        @ok="updateDueDate">
      </calendar>
    </dropdown>
  </div>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import ListMenu from 'components/Menu/ListMenu'
import PriorityMenu from 'components/Menu/PriorityMenu'
import Dropdown from 'components/Dropdown'
import Calendar from 'components/Calendar'
import { mapState } from 'vuex'
import { formatdate, zeroPad } from 'libs/formatdate'
import moment from 'moment'

export default {
  components: {
    FlexBox,
    ListMenu,
    PriorityMenu,
    Dropdown,
    Calendar
  },
  data () {
    return {
      taskTitle: '',
      placeholder: 'Add a task to "Inbox", press Enter to save',
      // presetStyle: {
      //   height: '0px',
      //   paddingBottom: '0px'
      // },
      listId: '',
      priority: 4,
      due_date: [],
      showCalendar: false,
      calendarTop: 0,
      calendarLeft: 0,
      selectedDate: []
    }
  },
  methods: {
    formatdate,
    zeroPad,
    hideTaskPreset (e) {
      // this.presetStyle = {
      //   height: '0px',
      //   paddingBottom: '0px'
      // }
    },
    showTaskPreset () {
      // this.presetStyle = {
      //   height: '46px',
      //   paddingBottom: '10px'
      // }
    },
    getListTitle (title) {
      this.$store.commit('SETINPUTLISTTITLE', title)
    },
    toggleCalendar (e) {
      this.showCalendar = !this.showCalendar
      this.calendarLeft = e.target.offsetLeft - 158
      this.calendarTop = e.target.offsetTop + 28
    },
    selectDate (val) {
      this.selectedDate = val
    },
    updateDueDate () {
      if (this.selectedDate.length) {
        this.due_date = this.selectedDate
      } else {
        this.due_date = [
          moment().year(),
          this.zeroPad(moment().month() + 1),
          this.zeroPad(moment().date())
        ]
      }
      this.showCalendar = false
    },
    async addTask () {
      if (!this.taskTitle) {
        return
      }

      const userId = localStorage.getItem('userId')

      let due_date = null
      if (this.due_date.length) {
        due_date = this.due_date.join('-')
      }

      const { data } = await this.axios.post('/item/create', {
        title: this.taskTitle,
        created_by: userId,
        due_date: due_date,
        // group_id: this.listId || null,
        group_id: this.$route.params.group_id, // get from router instead of listId
        priority: this.priority
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        // update task list
        this.$bus.$emit('get-task-list')
        this.$bus.$emit('get-item-summary')
        this.$bus.$emit('get-group-list')

        this.$message({
          type: 'success',
          message: 'Added successfully!'
        })

        // reset task input
        this.taskTitle = ''
        this.due_date = []
        this.listId = ''
        this.priority = 4
      }
    }
  },
  computed: {
    ...mapState({
      activeNavId: state => state.navId,
      activeNavTitle: state => state.navTitle,
      inputListTitle: state => state.inputListTitle
    })
  },
  watch: {
    activeNavId: function (newValue, oldValue) {
      let index = ['1', '2', '3', '4'].indexOf(newValue)
      if (index > -1) {
        this.listId = ''
      } else {
        this.listId = newValue
      }

      if (newValue === '2') {
        this.due_date = [
          moment().year(),
          this.zeroPad(moment().month() + 1),
          this.zeroPad(moment().date())
        ]

        this.placeholder = 'Add a task to "Inbox" on "Today", press Enter to save'
      } else {
        this.due_date = []
      }

    },
    activeNavTitle: function (newValue, oldValue) {
      let index = ['1', '2', '3', '4'].indexOf(this.activeNavId)
      if (index > -1) {
        if (this.activeNavId === '2') {
          this.placeholder = 'Add a task to "Inbox" on "Today", press Enter to save'
        } else {
          this.placeholder = 'Add a task to "Inbox", press Enter to save'
        }
      } else {
        this.placeholder = 'Add a task to "' + newValue + '", press Enter to save'
      }
    },
    inputListTitle: function (newValue, oldValue) {
      this.placeholder = 'Add a task to "' + newValue + '", press Enter to save'
    }
  }
}
</script>

<style>
.task-input__container,
.task-input .el-input__inner {
  background: #fbfbfb;
}

.task-input__container .iconfont {
  font-size: 20px;
}

.task-input__title {
  position: relative;
}

.task-input .el-input__inner {
  border: 0;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  padding: 0 60px;
}

.task-input__title-icon {
  position: absolute;
  top: 20px;
  left: 20px;
}

.task-input__preset {
  padding: 0 0 20px 60px;
  overflow: hidden;
  transition: all .3s;
  height: 46px;
  padding-bottom: 10px;
}

.task-input__preset .iconfont {
  color: #aaa;
}

.task-input__preset-item {
  margin-right: 16px;
}

.task-input__preset-icon {
  margin-right: 8px;
}

.task-input__action-icon:hover {
  color: #434654;
}

</style>
