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
    </el-container>

    <!-- add list dialog  -->
    <list-dialog
      title="Add List"
      :visible.sync="addListDialogVisible"
      :form.sync="addListForm"
      @save="saveAddList">
    </list-dialog>

    <list-dialog
      title="Edit List"
      :visible.sync="editListDialogVisible"
      :form.sync="editListForm"
      @save="saveEditList">
    </list-dialog>
  </el-container>
</template>

<script>
import SideNav from 'components/SideNav'
import AppHeader from 'components/Header'
import AppMain from 'components/Main'
import ListDialog from 'components/Dialog/List'

export default {
  components: {
    SideNav,
    AppHeader,
    AppMain,
    ListDialog
  },
  data () {
    return {
      addInput: '',
      addListDialogVisible: false,
      addListForm: {},
      editListDialogVisible: false,
      editListForm: {},
      editingList: null
    }
  },
  methods: {
    addList () {
      this.addListDialogVisible = true
      this.addListForm = {
        title: '',
        color: ''
      }
    },
    saveAddList () {
      this.$message({
        type: 'success',
        message: 'Added successfully!'
      })
    },
    editList (list) {
      this.editListDialogVisible = true
      this.editListForm = {
        title: list.title,
        color: list.color
      }
      this.editingList = list
    },
    saveEditList () {
      this.editingList.title = this.editListForm.title
      this.editingList.color = this.editListForm.color
      this.$message({
        type: 'success',
        message: 'Edited successfully!'
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
</style>
