<template>
  <collapse-transition>
    <div v-if="activeNavId === '4' ? list.content.length : list.content.filter(item => { return item.is_done === false }).length">
      <div class="task-list__header-container cursor--pointer">
        <div
          class="task-list__header"
          @click="toggleListExpansion(list)">
          <i
            class="el-icon-caret-bottom task-list__header-caret"
            :style="{ transform: caretRotate }">
          </i>
          <span>{{ list.title }}</span>
        </div>
      </div>

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
import TaskItem from 'components/TaskItem'
import CollapseTransition from 'components/CollapseTransition'
import { mapState } from 'vuex'

export default {
  components: {
    draggable,
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
      showList: true
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
    onEndDrag (e) {
      console.log(e)
      console.log(this.list)
    }
  },
  computed: mapState({
    activeNavId: state => state.navId
  })
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

</style>
