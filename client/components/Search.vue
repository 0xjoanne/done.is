<template>
  <div v-click-outside="hideSearch">
    <i
      class="el-icon-search cursor--pointer search__icon"
      @click="showSearch">
    </i>

    <el-input
      ref="taskSearch"
      size="small"
      placeholder="Search task"
      v-model="searchInput"
      class="search__input"
      :style="searchStyle"
      @keyup.enter="search">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: '',
      searchStyle: {
        width: '0px',
        marginLeft: '0px'
      }
    }
  },
  methods: {
    hideSearch () {
      this.searchStyle = {
        width: '0px',
        marginLeft: '0px'
      }
    },
    showSearch () {
      this.searchStyle = {
        width: '210px',
        marginLeft: '8px'
      }
      this.$refs.taskSearch.focus()
    },
    search () {
      console.log(this.searchInput)
    }
  }
}
</script>

<style>
.search__icon {
  font-size: 16px;
}

.search__input.el-input {
  transition: all .3s;
}

.search__input .el-input__inner {
  border: 0;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding: 0;
}
</style>
