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
      v-html="subtask.title"
      contenteditable="true"
      @keydown="preventEnter"
      @blur="updateSubtask"
      class="subtask-item__title">
    </div>

    <i
      class="el-icon-delete subtask-item__del subtask-item__icon"
      @click="delSubtask">
    </i>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import xss from 'xss'

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
    async updateSubtask (e) {
      if (!e.target.innerHTML.trim()) {
        e.target.innerHTML = this.subtask.title
        return
      }

      const { data } = await this.axios.put('/item/' + this.subtask.id, {
        title: xss(e.target.innerHTML)
      })
      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      }
    },
    async delSubtask () {
      const { data } = await this.axios.delete('/item/' + this.subtask.id)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-subtasks')
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
