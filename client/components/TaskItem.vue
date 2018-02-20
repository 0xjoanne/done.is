<template>
  <collapse-transition>
    <div
      :class="['task-item__container', { 'active' : selectedTask.id === task.id }]"
      :style="{ borderLeftColor: task.group_color || 'white' }"
      v-if="toggleDoneItem()">
      <flex-box
        class="task-item__content">
        <i class="iconfont icon-drag-vertical task-item__drag"></i>

        <checkbox
          :completed.sync="task.is_done"
          :priority-id="task.priority"
          @toggle-status="updateDoneStatus">
        </checkbox>

        <div
          @click="checkDetails(task)"
          class="task-item__title">
          {{ task.title }}
        </div>

        <div
          @click="checkDetails(task)"
          :class="['task-item__date', { expired : isexpired(task.due_date) }]">
          {{ formatshortdate(task.due_date) }}
        </div>
      </flex-box>
    </div>
  </collapse-transition>
</template>

<script>
import CollapseTransition from 'components/CollapseTransition'
import FlexBox from 'components/Layout/FlexBox'
import Checkbox from 'components/Checkbox'
import { mapState } from 'vuex'
import { formatshortdate, isexpired } from 'libs/formatdate'

export default {
  components: {
    CollapseTransition,
    FlexBox,
    Checkbox
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    formatshortdate,
    isexpired,
    async checkDetails (task) {
      await this.$nextTick()
      setTimeout(async () => {
        const userId = localStorage.getItem('userId')

        const { data } = await this.axios.get('/item/list?userid=' + userId, { params : {
          type: 2,
          parent_id: task.id
        }})

        if (data.error !== 0) {
          this.$message({
            type: 'error',
            message: data.msg,
          })
        } else {
          task.subtasks = data.data
        }

        this.$store.commit('SETTASK', task)
        this.$store.commit('SETDETAILSVISIBILITY', true)
      }, 100)
    },
    async updateDoneStatus () {
      const { data } = await this.axios.put('/item/' + this.task.id, {
        is_done: this.task.is_done,
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-item-summary')
      }
    },
    toggleDoneItem () {
      if (this.activeNavId === '4') {
        if (this.task.is_done) {
          return true
        } else {
          return false
        }
      } else {
        if (this.task.is_done) {
          return false
        } else {
          return true
        }
      }
    }
  },
  computed: mapState({
    selectedTask: state => state.task,
    activeNavId: state => state.navId
  })
}
</script>

<style>
.task-item__container {
  border-left-style: solid;
  border-left-width: 4px;
}

.task-item__container:hover,
.task-item__container.active {
  background: #fbfbfb;
}

.task-item__content {
  height: 60px;
  line-height: 60px;
  padding-right: 20px;
  margin-left: 15px;
  border-bottom: 1px solid #fbfbfb;
  cursor: pointer;
}

.task-item__drag {
  color: #aaa;
  margin-right: 5px;
  /* cursor: move; */
  opacity: 0;
}

/* .task-item__container:hover .task-item__drag {
  opacity: 1;
} */

.task-item__title {
  height: 100%;
  margin: 0 10px;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: auto;
}

.task-item__date {
  font-size: 12px;
  color: rgba(0,0,0,.36);
  flex: none;
}

.task-item__date.expired {
  color: #ea6151;
}
</style>
