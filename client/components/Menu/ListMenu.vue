<template>
  <div>
    <el-dropdown
      trigger="click"
      placement="bottom"
      @command="handleCommand">
      <flex-box>
        <i
          class="iconfont icon-folder1 list-menu__icon"
          :style="dropdownIconStyle">
        </i>

        <span
          v-if="labelVisible"
          class="list-menu__label">
          {{ currentList }}
        </span>
      </flex-box>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="Inbox"
          :class="['list-menu__item', { 'active' : !currentListId }]">
          <i class="iconfont icon-inbox list-menu__item-icon"></i>
          <span>Inbox</span>
        </el-dropdown-item>

        <el-dropdown-item
          v-for="(item, index) in lists"
          :key="index"
          :command="item"
          :class="['list-menu__item', { 'active' : currentListId === item.id }]">
          <i class="iconfont icon-menu list-menu__item-icon"></i>
          <span>{{ item.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  model: {
    prop: 'currentListId'
  },
  props: {
    currentListId: {
      validator: function (val) {
        return val === null || typeof val === 'string'
      },
      required: true
    },
    dropdownIconStyle: {
      type: Object
    },
    labelVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      lists: []
    }
  },
  computed: {
    currentList () {
      if (!this.lists.length) {
        return "Inbox"
      }

      if (this.currentListId) {
        let list = this.lists.filter(item => { return item.id === this.currentListId })
        return list[0].title
      } else {
        return 'Inbox'
      }
    }
  },
  methods: {
    async getGroupList () {
      const userId = localStorage.getItem('userId')
      const { data } = await this.axios.get('/group/list?userid=' + userId)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.lists = data.data

      }
    },
    handleCommand (list) {
      if (list === 'Inbox') {
        this.$emit('update:currentListId', '')
        this.$emit('get-list-title', 'Inbox')
      } else {
        this.$emit('update:currentListId', list.id)
        this.$emit('get-list-title', list.title)
      }
    }
  },
  async created () {
    this.$bus.$on('get-group-list', async () => {
      await this.getGroupList()
    })
    await this.getGroupList()
  }
}
</script>

<style>
.list-menu__icon {
  cursor: pointer;
  font-size: 18px;
}

.list-menu__item.el-dropdown-menu__item {
  padding-right: 30px;
}

.list-menu__item.active {
  color: #66b1ff;
}

.list-menu__item-icon {
  vertical-align: middle;
  margin-right: 5px;
  font-size: 20px;
}

.list-menu__label {
  margin-left: 5px;
  max-width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
