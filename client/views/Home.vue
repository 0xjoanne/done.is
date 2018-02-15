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
      editingList: null,
      editingListColor: ''
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
    async saveAddList () {
      const userId = localStorage.getItem('userId')

      const { data } = await this.axios.post('http://localhost:7001/group/create', {
        title: this.addListForm.title,
        color: this.addListForm.color,
        created_by: userId
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-group-list')
        this.$message({
          type: 'success',
          message: 'Added successfully!'
        })
      }
    },
    editList (list) {
      this.editListDialogVisible = true
      this.editListForm = {
        title: list.title,
        color: list.color
      }
      this.editingList = list
      this.editingListColor = list.color
    },
    async saveEditList () {
      const groupid = this.editingList.id

      const { data } = await this.axios.put('http://localhost:7001/group/' + groupid, {
        title: this.editListForm.title,
        color: this.editListForm.color
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$bus.$emit('get-group-list')

        if (this.editListForm.color !== this.editingListColor) {
          this.$bus.$emit('get-task-list')
        }

        this.$message({
          type: 'success',
          message: 'Edited successfully!'
        })
      }
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
