<template>
  <el-dialog
    :title="title"
    :visible.sync="currentVisible"
    width="30%"
    @close="close">
    <el-form
      :model="form"
      status-icon
      ref="listForm"
      :rules="rules">
      <el-form-item prop="title">
        <!-- todo: validate "Duplicated list name" -->
        <el-input
          placeholder="Your list name here..."
          v-model="form.title">
        </el-input>
      </el-form-item>

      <el-form-item
        prop="color"
        class="list-dialog__color-selector">
        <color-selector :value.sync="form.color"></color-selector>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button
        size="medium"
        class="button--default"
        @click="cancel">
        Cancel
      </el-button>

      <el-button
        size="medium"
        type="primary"
        class="button--primary"
        @click="save">
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import ColorSelector from 'components/ColorSelector'

export default {
  components: {
    ColorSelector
  },
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      requried: true
    },
    form: {
      type: Object,
      requried: true
    }
  },
  data () {
    return {
      currentVisible: false,
      rules: {
        title: [
          { required: true, message: 'Please enter list name', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.visible) {
      this.currentVisible = this.visible
    }
  },
  watch: {
    visible (val) {
      this.currentVisible = val
    },
    currentVisible (val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    close () {
      this.$refs['listForm'].clearValidate()
    },
    cancel () {
      this.currentVisible = false
    },
    save () {
      this.$refs['listForm'].validate((valid) => {
        if (valid) {
          this.currentVisible = false
          this.$emit('save')
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
  }
}
</script>

<style>
.list-dialog__color-selector.el-form-item {
  margin-bottom: 0;
}
</style>
