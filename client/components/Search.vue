<template>
  <flex-box v-click-outside="hideSearch">
    <i
      class="el-icon-search search__icon icon"
      @click="showSearch">
    </i>

    <div
      class="search__input-container"
      :style="searchStyle">
      <el-input
        ref="taskSearch"
        size="small"
        placeholder="Search task"
        v-model="searchInput"
        class="search__input"
        @input.native="search">
      </el-input>

      <i
        class="el-icon-close search__icon search__icon-close"
        v-if="showDeleteIcon"
        @click="clearSearchInput">
      </i>
    </div>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  data () {
    return {
      searchInput: '',
      searchStyle: {
        width: '0px',
        marginLeft: '0px'
      },
      showDeleteIcon: false
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
      if (this.searchInput.length) {
        this.showDeleteIcon = true
      } else {
        this.showDeleteIcon = false
      }
      this.$emit('search', this.searchInput)
    },
    clearSearchInput () {
      this.searchInput = ''
      this.$emit('search', '')
    }
  }
}
</script>

<style>
.search__icon {
  font-size: 16px;
}

.search__input-container {
  overflow: hidden;
  position: relative;
  transition: all .3s;
}

.search__input .el-input__inner {
  border: 0;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding: 0 20px 0 0;
}

.search__icon-close {
  color: #aaa;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 2px;
}
</style>
