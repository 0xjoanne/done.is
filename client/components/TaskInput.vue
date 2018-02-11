<template>
  <div
    v-click-outside="hideTaskPreset"
    class="task-input__container">
    <div class="task-input__title">
      <!-- start with = to create multiple task -->
      <el-input
        :placeholder="placeholder"
        v-model="taskInput"
        class="task-input"
        @focus="showTaskPreset">
      </el-input>

      <i class="iconfont icon-arrow-right task-input__title-icon"></i>
    </div>

    <flex-box
      justify="flex-start"
      class="task-input__preset"
      :style="presetStyle">
      <flex-box class="task-input__preset-item">
        <i class="iconfont icon-calendar task-input__preset-icon"></i>
        <span class="task-input__preset-label">No due date</span>
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
  </div>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import ListMenu from 'components/Menu/ListMenu'
import PriorityMenu from 'components/Menu/PriorityMenu'
import { mapState } from 'vuex'

export default {
  components: {
    FlexBox,
    ListMenu,
    PriorityMenu
  },
  data () {
    return {
      taskInput: '',
      placeholder: 'Add a task to "Inbox", press Enter to save',
      presetStyle: {
        height: '0px',
        paddingBottom: '0px'
      },
      listId: '',
      priority: '4'
    }
  },
  methods: {
    hideTaskPreset () {
      this.presetStyle = {
        height: '0px',
        paddingBottom: '0px'
      }
    },
    showTaskPreset () {
      this.presetStyle = {
        height: '46px',
        paddingBottom: '10px'
      }
    },
    getListTitle (title) {
      this.$store.commit('SETINPUTLISTTITLE', title)
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
    },
    activeNavTitle: function (newValue, oldValue) {
      let index = ['1', '2', '3', '4'].indexOf(this.activeNavId)
      if (index > -1) {
        this.placeholder = 'Add a task to "Inbox", press Enter to save'
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
  color: #ed4630;
  position: absolute;
  top: 20px;
  left: 20px;
}

.task-input__preset {
  padding: 0 0 20px 60px;
  overflow: hidden;
  transition: all .3s;
}

.task-input__preset .iconfont {
  color: #aaa;
}

.task-input__preset-item {
  margin-right: 16px;
}

.task-input__preset-icon {
  margin-right: 8px;
  cursor: pointer;
}

.task-input__action-icon:hover {
  color: #434654;
}

</style>
