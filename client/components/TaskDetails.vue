<template>
  <div class="task-details">
    <div class="task-details__header-container">
      <flex-box class="task-details__header">
        <checkbox
          :completed.sync="task.is_done"
          :priority-id="task.priority"
          :activePriorityColor="false"
          class="task-details__status"
          @toggle-status="updateDoneStatus">
        </checkbox>

        <flex-box
          justify="flex-start"
          :class="['task-details__duedate', { expired : isexpired(task.due_date), none: typeof task.due_date === 'object' }]"
          @click.native="toggleCalendar">
          <i
            class="el-icon-date icon">
          </i>

          <span
            class="task-details__duedate-label">
            {{ formatdate(task.due_date) }}
          </span>
        </flex-box>

        <i
          class="iconfont icon-restore icon task-details__restore"
          v-if="activeNavId === '6'">
        </i>

        <i
          class="el-icon-delete icon"
          @click="delTask">
        </i>
      </flex-box>
    </div>

    <dropdown
      :visible.sync="showCalendar"
      :left="calendarLeft"
      :top="calendarTop">
      <calendar
        :value.sync="task.due_date_array"
        :zero="true"
        @select="selectDate"
        @clear="clearDueDate"
        @ok="updateDueDate">
      </calendar>
    </dropdown>

    <div class="task-details__content">
      <div class="task-details__content-top">
        <el-input
          type="textarea"
          :autosize="true"
          resize="none"
          placeholder="What needs doing?"
          class="task-details__title"
          v-model="task.title"
          @keydown.native="preventEnter"
          @blur="updateTitle">
        </el-input>

        <flex-box
          justify="flex-start"
          class="task-details__tip">
          <list-menu
            :current-list-id.sync="task.group_id"
            class="task-details__tip-item"
            @update-list="updateList">
          </list-menu>

          <priority-menu
            :current-priority-id.sync="task.priority"
            class="task-details__tip-item"
            @update-priority="updatePriority">
          </priority-menu>
        </flex-box>

        <div class="task-details__desc-container">
          <medium-editor
            :text="task.desc"
            :options="descOptions"
            class="task-details__desc"
            @blur.native="updateDesc">
          </medium-editor>
        </div>

        <el-input
          placeholder="Press Enter to add subtask"
          v-model="subtaskInput"
          @keyup.enter.native="addSubtask">
          <i slot="prefix" class="el-input__icon el-icon-plus"></i>
        </el-input>
      </div>

      <draggable v-model="subtasks" @end="onEndDrag">
        <subtask-item
          v-for="item in subtasks"
          :key="item.id"
          :subtask="item">
        </subtask-item>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import FlexBox from 'components/Layout/FlexBox'
import Checkbox from 'components/Checkbox'
import ListMenu from 'components/Menu/ListMenu'
import PriorityMenu from 'components/Menu/PriorityMenu'
import SubtaskItem from 'components/subtaskItem'
import MediumEditor from 'vue2-medium-editor'
import EditorExtension from 'libs/editor'
import Dropdown from 'components/Dropdown'
import Calendar from 'components/Calendar'
import { mapState } from 'vuex'
import { formatdate, isexpired, zeroPad } from 'libs/formatdate'
import moment from 'moment'
import xss from 'xss'

EditorExtension(MediumEditor)

export default {
  components: {
    draggable,
    FlexBox,
    Checkbox,
    ListMenu,
    PriorityMenu,
    SubtaskItem,
    MediumEditor,
    Dropdown,
    Calendar
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      subtasks: [],
      showCalendar: false,
      calendarTop: 0,
      calendarLeft: 0,
      selectedDate: [],
      subtaskInput: '',
      descOptions: {
        spellcheck: false,
        toolbar: {
          buttons: [{
              name: 'bold',
              contentDefault: '<i class="iconfont icon-editor-b"></i>'
            }, {
              name: 'italic',
              contentDefault: '<i class="iconfont icon-editor-i"></i>'
            }, {
              name: 'underline',
              contentDefault: '<i class="iconfont icon-editor-u"></i>'
            }, {
              name: 'strikethrough',
              contentDefault: '<i class="iconfont icon-editor-s"></i>'
            }, {
              name: 'anchor',
              contentDefault: '<i class="iconfont icon-editor-link"></i>'
            },
            'h2',
            'h3'
          ],
        },
        placeholder: {
          text: 'Description'
        },
        autoLink: true,
        targetBlank: true
      },
    }
  },
  methods: {
    formatdate,
    isexpired,
    zeroPad,
    async updateDoneStatus () {
      if (this.task.is_done) {
        const { data } = await this.axios.put('/item/' + this.task.id, {
          is_done: this.task.is_done,
          done_at: new Date()
        })

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg
          })
        } else {
          this.$bus.$emit('get-item-summary')
        }
      } else {
        const { data } = await this.axios.put('/item/' + this.task.id, {
          is_done: this.task.is_done,
          done_at: null
        })

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg
          })
        } else {
          this.$bus.$emit('get-item-summary')
        }
      }
    },
    // Calendar Events
    toggleCalendar (e) {
      this.showCalendar = !this.showCalendar
      this.calendarLeft = e.target.offsetLeft - 158
      this.calendarTop = e.target.offsetTop + 28
    },
    selectDate (val) {
      this.selectedDate = val
    },
    async clearDueDate () {
      this.task.due_date = []

      const { data } = await this.axios.put('/item/' + this.task.id, {
        due_date: null
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-task-list')
        this.$bus.$emit('get-item-summary')
      }

      this.showCalendar = false
    },
    async updateDueDate () {
      if (this.selectedDate.length) {
        // if user selects a date
        this.task.due_date = this.selectedDate

        const { data } = await this.axios.put('/item/' + this.task.id, {
          due_date: this.task.due_date
        })

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg
          })
        } else {
          this.$bus.$emit('get-task-list')
          this.$bus.$emit('get-item-summary')
        }
      } else {
        // without selecting, default TODAY
        this.task.due_date = [
          moment().year(),
          this.zeroPad(moment().month() + 1),
          this.zeroPad(moment().date())
        ]

        const { data } = await this.axios.put('/item/' + this.task.id, {
          due_date: moment().startOf('date')
        })

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg
          })
        } else {
          this.$bus.$emit('get-task-list')
          this.$bus.$emit('get-item-summary')
        }
      }

      this.showCalendar = false
    },
    async delTask () {
      const { data } = await this.axios.delete('/item/' + this.task.id)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-task-list')
        this.$bus.$emit('get-item-summary')
        // hide task details
        this.$store.commit('SETDETAILSVISIBILITY', false)
        this.$message({
          type: 'success',
          message: 'Deleted successfully!'
        })
      }
    },
    preventEnter (e) {
      if (e.keyCode === 13) {
        e.cancelBubble = true
        e.preventDefault()
        e.stopPropagation()
      }
    },
    async updateTitle () {
      if (!this.task.title) {
        this.task.title = this.taskTitle
        return
      }

      const title = xss(this.task.title)
      const { data } = await this.axios.put('/item/' + this.task.id, {
        title
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$store.commit('SETTASKTITLE', title)
      }
    },
    async updateList (list) {
      if (list === 'Inbox') {
        const { data } = await this.axios.put('/item/' + this.task.id, {
          group_id: null
        })

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg
          })
        } else {
          this.$bus.$emit('get-task-list')
        }
      } else {
        const { data } = await this.axios.put('/item/' + this.task.id, {
          group_id: list.id
        })

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
    async updatePriority (priority) {
      const { data } = await this.axios.put('/item/' + this.task.id, {
        priority: priority
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-task-list')
      }
    },
    async updateDesc (e) {
      let desc = xss(e.target.innerHTML)

      const { data } = await this.axios.put('/item/' + this.task.id, {
        desc: desc
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      }
    },
    async addSubtask () {
      if (!this.subtaskInput) {
        return
      }

      const userId = localStorage.getItem('userId')

      const { data } = await this.axios.post('/item/create', {
        type: 2,
        title: this.subtaskInput,
        created_by: userId,
        due_date: null,
        parent_id: this.task.id
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        // reset task input
        this.subtaskInput = ''

        // update subtask list
        await this.getSubtasks()
      }
    },
    async getSubtasks () {
      const userId = localStorage.getItem('userId')

      const { data } = await this.axios.get('/item/list?userid=' + userId, { params: {
        type: 2,
        parent_id: this.task.id
      }})

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.subtasks = data.data
      }
    },
    onEndDrag (e) {
      this.$sortable(e, this.subtasks, 'subtask')
    },
    async updateSubtaskOrder (item) {
      const { data } = await this.axios.put('/item/' + item.id, {
        order: item.order
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      }
    }
  },
  computed: {
    ...mapState({
      taskTitle: state => state.taskTitle,
      activeNavId: state => state.navId
    })
  },
  watch: {
    task: {
      deep: true,
      handler: function (val) {
        this.subtasks = val.subtasks
      }
    }
  },
  async created () {
    this.$bus.$on('get-subtasks', async () => {
      await this.getSubtasks()
    })
    await this.getSubtasks()

    this.$bus.$on('update-subtask-order', async (item) => {
      await this.updateSubtaskOrder(item)
    })
  }
}
</script>

<style>
.task-details {
  background: #fbfbfb;
  position: relative;
}

/* header */
.task-details__header-container {
  margin: 0 20px;
  border-bottom: 1px solid #E3E3E7;
}

.task-details__header {
  font-size: 16px;
  height: 59px;
}

.task-details__status {
  padding-right: 5px;
  margin-right: 10px;
  border-right: 1px solid #E3E3E7;
}

.task-details__duedate {
  color: #617fde;
  flex: auto;
  cursor: pointer;
}

.task-details__duedate.expired {
  color: #ea6151;
}

.task-details__duedate.none {
  color: rgba(0,0,0,.36);
}

.task-details__duedate-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  margin-left: 8px;
}

.task-details__restore {
  font-size: 20px;
  margin-right: 10px;
}

/* content */
.task-details__content {
  padding-bottom: 50px;
  height: calc(100vh - 125px);
  overflow: scroll;
}

.task-details__content-top {
  padding: 20px;
}

.task-details__title .el-textarea__inner {
  background: none;
  border: none;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  padding: 0;
}

.task-details__tip {
  margin-top: 10px;
}

.task-details__tip,
.task-details__tip .iconfont {
  color: #aaa;
}

.task-details__tip-item {
  margin-right: 10px;
}

.task-details__desc-container {
  margin: 20px 0;
  border-left: 2px solid #617fde;
  padding: 5px 10px;
}

.task-details__desc {
  line-height: 24px;
  cursor: text;
}

</style>
