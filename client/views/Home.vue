<template>
  <el-container>
    <el-aside width="260px" class="app__aside">
      <side-nav
        @add-list="addList"
        @edit-list="editList">
      </side-nav>
    </el-aside>

    <el-container class="app__main-container">
      <el-header class="app__header">
        <app-header></app-header>
      </el-header>

      <el-main class="app__main">
        <app-main></app-main>
      </el-main>

      <!-- <el-footer class="text-align--center app__footer">
        Copyright © 2018 Done.is
      </el-footer> -->
    </el-container>

    <!-- add list dialog  -->
    <el-dialog
      :title="addListDialogTitle"
      :visible.sync="addListDialogVisible"
      width="30%"
      @close="resetAddListForm">
      <el-form
        :model="addListForm"
        status-icon
        ref="addListForm"
        :rules="rules">
        <el-form-item prop="title">
          <!-- todo: validate "Duplicated list name" -->
          <el-input
            placeholder="Your list name here..."
            v-model="addListForm.title">
          </el-input>
        </el-form-item>

        <el-form-item
          prop="color"
          class="add-list__color-selector">
          <color-selector :value.sync="addListForm.color"></color-selector>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          @click="addListDialogVisible = false">
          Cancel
        </el-button>

        <el-button
          size="medium"
          type="primary"
          @click="saveList">
          Save
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import SideNav from 'components/SideNav'
import AppHeader from 'components/Header'
import AppMain from 'components/Main'
import ColorSelector from 'components/ColorSelector'

export default {
  components: {
    SideNav,
    AppHeader,
    AppMain,
    ColorSelector
  },
  data () {
    return {
      addInput: '',
      addListDialogVisible: false,
      dialogType: 'add',
      addListDialogTitle: 'Add List',
      addListForm: {
        title: '',
        color: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please enter list name', trigger: 'blur' }
        ]
      },
      editingList: null
    }
  },
  methods: {
    resetAddListForm () {
      this.addListForm = {
        title: '',
        color: ''
      }
    },
    showListDialog (title, type) {
      this.addListDialogVisible = true
      this.addListDialogTitle = title
      this.dialogType = type

      // reset form
      this.$nextTick(() => {
        this.$refs['addListForm'].resetFields()
      })

    },
    addList () {
      this.showListDialog('Add List', 'add')
    },
    editList (list) {
      this.showListDialog('Edit List', 'edit')
      this.addListForm = {
        title: list.title,
        color: list.color
      }
      this.editingList = list
    },
    saveList () {
      this.$refs['addListForm'].validate((valid) => {
        if (valid) {
          this.addListDialogVisible = false
          if (this.dialogType === 'add') {

          } else if (this.dialogType === 'edit') {
            this.editingList.title = this.addListForm.title
            this.editingList.color = this.addListForm.color
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style>
.app__aside {
  background: #434654;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}

.app__main-container {
  margin-left: 260px;
}

.app__header {
  background: white;
  height: 65px !important;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
}

.app__main {
  min-height: calc(100vh - 120px);
  padding: 0 !important;
}

.app__footer {
  /*margin: 48px 0 24px 0;*/
  color: rgba(0, 0, 0, 0.45);
}

.add-list__color-selector.el-form-item {
  margin-bottom: 0;
}
</style>
