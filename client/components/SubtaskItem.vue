<template>
  <flex-box
    align="flex-start"
    class="subtask-item">
    <i class="iconfont icon-drag-vertical subtask-item__drag subtask-item__icon"></i>

    <el-checkbox
      v-model="subtask.is_done"
      class="subtask-item__checker">
    </el-checkbox>

    <div
      contenteditable="true"
      @keyup.enter="saveSubtask"
      @blur="checkSubtask"
      class="subtask-item__title">
      {{ subtask.title }}
    </div>

    <i
      class="el-icon-delete subtask-item__del subtask-item__icon"
      @click="delSubtask">
    </i>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  props: {
    subtask: {
      type: Object,
      required: true
    }
  },
  components: {
    FlexBox
  },
  data () {
    return {
      completed: false,
      title: 'hello world'
    }
  },
  methods: {
    saveSubtask () {

    },
    delSubtask () {

    },
    checkSubtask (event) {
      if (!event.srcElement.innerHTML.trim()) {
        console.log('empty')
      }
    }
  }
}
</script>

<style>
.subtask-item {
  padding-right: 20px;
}

.subtask-item__checker {
  margin-top: 13px;
}

.subtask-item__title {
  width: 100%;
  min-height: 41px;
  line-height: 24px;
  padding: 8px 0;
  margin: 0 5px 0 10px;
  word-wrap: break-word;
  overflow: hidden;
  border-bottom: 1px solid #E3E3E7;
}

.subtask-item__icon {
  color: #aaa;
  opacity: 0;
}

.subtask-item__del {
  margin-top: 14px;
  cursor: pointer;
}

.subtask-item__drag {
  cursor: move;
  margin: 14px 2px 0;
}

.subtask-item:hover .subtask-item__del,
.subtask-item:hover .subtask-item__drag {
  opacity: 1;
}
</style>
