<template>
  <div class="task-details">
    <div class="task-details__header-container">
      <flex-box class="task-details__header">
        <checkbox
          :completed.sync="task.completed"
          :priority-id="task.priority_id"
          class="task-details__status">
        </checkbox>

        <flex-box
          justify="flex-start"
          class="task-details__duedate">
          <i class="el-icon-date"></i>
          <span class="task-details__duedate-label">Today, Feb 1</span>
        </flex-box>

        <i
          class="el-icon-delete cursor--pointer"
          @click="delTask">
        </i>
      </flex-box>
    </div>

    <div class="task-details__content">
      <div class="task-details__content-top">
        <el-input
          type="textarea"
          :autosize="true"
          resize="none"
          placeholder="What needs doing?"
          class="task-details__title"
          v-model="task.title"
          @keydown.native="preventEnter">
        </el-input>

        <flex-box
          justify="flex-start"
          class="task-details__tip">
          <list-menu
            :current-list-id.sync="task.group_id"
            class="task-details__tip-item">
          </list-menu>

          <priority-menu
            :current-priority-id.sync="task.priority_id"
            class="task-details__tip-item">
          </priority-menu>
        </flex-box>

        <div class="task-details__desc-container">
          <medium-editor
            :text='task.desc'
            :options="descOptions"
            class="task-details__desc">
          </medium-editor>
        </div>

        <el-input
          placeholder="Press Enter to add subtask"
          v-model="subtaskInput"
          @keyup.enter.native="addSubtask">
          <i slot="prefix" class="el-input__icon el-icon-plus"></i>
        </el-input>
      </div>

      <draggable v-model="task.subtasks" @end="onEndDrag">
        <subtask-item
          v-for="(item, index) in task.subtasks"
          :key="index"
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

EditorExtension(MediumEditor)

export default {
  components: {
    draggable,
    FlexBox,
    Checkbox,
    ListMenu,
    PriorityMenu,
    SubtaskItem,
    MediumEditor
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
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
      }
    }
  },
  methods: {
    preventEnter (e) {
      if (e.keyCode === 13) {
        e.cancelBubble = true
        e.preventDefault()
        e.stopPropagation()
      }
    },
    delTask () {

    },
    addSubtask () {
      if (!this.subtaskInput) {
        return
      }

      const subtaskLength = this.task.subtasks.length
      let newSub = {
        completed: false,
        title: this.subtaskInput,
        index: subtaskLength + 1
      }
      this.task.subtasks.push(newSub)
      this.subtaskInput = ''
    },
    onEndDrag (e) {
      this.$sortable(e, this.task.subtasks)
    }
  }
}
</script>

<style>
.task-details {
  background: #fbfbfb;
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
}

.task-details__duedate-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  margin-left: 5px;
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
