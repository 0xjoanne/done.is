<template>
  <collapse-transition>
    <div
      :class="['task-item__container', { 'active' : selectedTask.id === task.id }]"
      :style="{ borderLeftColor: task.color }"
      v-if="!task.completed">
      <flex-box
        class="task-item__content">
        <i class="iconfont icon-drag-vertical task-item__drag"></i>

        <checkbox
          :completed.sync="task.completed"
          :priority-id="task.priority_id">
        </checkbox>

        <div
          @click="checkDetails(task)"
          class="task-item__title">
          {{ task.title }}
        </div>

        <div
          @click="checkDetails(task)"
          class="task-item__date">
          {{ task.created_at }}
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
    checkDetails (task) {
      this.$store.commit('SETTASK', task)
      this.$store.commit('SETDETAILSVISIBILITY', true)
    }
  },
  computed: mapState({
    selectedTask: state => state.task
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
</style>
