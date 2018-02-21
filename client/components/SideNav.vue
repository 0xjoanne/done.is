<template>
  <div class="side-nav">
    <img src="../assets/logo.png" alt="logo" class="side-nav__logo">

    <!-- side nav top -->
    <nav-item
      v-for="(item, index) in navs"
      v-if="index < 5"
      :key="item.id"
      :icon="item.icon"
      :label="item.title"
      :num="item.num"
      :is-active="activeNavId === item.id"
      @click.native="onClickNav(item.title, item.id)">
    </nav-item>

    <div class="divider">
    </div>

    <!-- side nav list -->
    <div class="side-nav__list">
      <flex-box class="side-nav__list-header">
        <span
          class="side-nav__list-title">
          Lists
        </span>

        <i
          class="el-icon-plus side-nav__add-list"
          @click="addList">
        </i>
      </flex-box>

      <draggable v-model="lists" @end="onEndDrag" v-if="lists.length">
        <list-item
          v-for="item in lists"
          :key="item.id"
          :item="item"
          @edit-list="editList"
          :is-active="activeNavId === item.id"
          @click.native="onClickNav(item.title, item.id)">
        </list-item>
      </draggable>

      <div class="side-nav__empty" v-else>
        <i class="iconfont icon-detail"></i>
      </div>
    </div>

    <div class="divider">
    </div>

    <!-- side nav bottom -->
    <nav-item
      v-for="(item, index) in navs"
      v-if="index > 4"
      :key="item.id"
      :icon="item.icon"
      :label="item.title"
      :num="item.num"
      :is-active="activeNavId === item.id"
      @click.native="onClickNav(item.title, item.id)">
    </nav-item>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NavItem from 'components/NavItem'
import ListItem from 'components/ListItem'
import FlexBox from 'components/Layout/FlexBox'
import { mapState } from 'vuex'

export default {
  components: {
    draggable,
    NavItem,
    ListItem,
    FlexBox
  },
  data () {
    return {
      activeTab: 'group',
      navs: [{
        id: '0',
        title: 'All',
        num: 0,
        icon: 'all'
      }, {
        id: '1',
        title: 'Inbox',
        num: 0,
        icon: 'inbox'
      }, {
        id: '2',
        title: 'Today',
        num: 0,
        icon: 'activity'
      }, {
        id: '3',
        title: 'Next 7 Days',
        num: 0,
        icon: '7'
      }, {
        id: '4',
        title: 'Done',
        num: 0,
        icon: 'done'
      }, {
        id: '5',
        title: 'Archive',
        num: 0,
        icon: 'archive'
      }, {
        id: '6',
        title: 'Trash',
        num: 0,
        icon: 'trash'
      }],
      lists: []
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
    async getItemSummary () {
      const userId = localStorage.getItem('userId')
      const { data } = await this.axios.get('/item/summary?userid=' + userId)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        let count = data.data
        this.navs[0].num = count.all
        this.navs[1].num = count.inbox
        this.navs[2].num = count.today
        this.navs[3].num = count.next
        this.navs[4].num = count.done
      }
    },
    onClickNav (title, id) {
      this.$store.commit('SETNAVTITLE', title)
      this.$store.commit('SETNAVID', id)
      this.$store.commit('SETDETAILSVISIBILITY', false)
      this.$store.commit('SETTASK', {})
      this.$bus.$emit('get-task-list')
    },
    addList () {
      this.$emit('add-list')
    },
    editList (list) {
      this.$emit('edit-list', list)
    },
    onEndDrag (e) {
      this.$sortable(e, this.lists, 'group')
    },
    async updateGroupOrder (item) {
      const { data } = await this.axios.put('/group/' + item.id, {
        order: item.order
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      }
    }
  },
  computed: mapState({
    activeNavId: state => state.navId
  }),
  async created () {
    this.$bus.$on('get-group-list', async () => {
      await this.getGroupList()
    })
    await this.getGroupList()

    this.$bus.$on('get-item-summary', async () => {
      await this.getItemSummary()
    })
    await this.getItemSummary()

    this.$bus.$on('update-group-order', async (item) => {
      await this.updateGroupOrder(item)
    })
  }
}
</script>

<style>
.side-nav {
  color: #ccc;
  padding-bottom: 100px;
}

.side-nav__logo {
  padding: 58px 32px 35px;
}

.divider {
  height: 1px;
  background: #696969;
  margin: 30px;
}

.side-nav__list-header {
  padding: 0 30px;
  line-height: 40px;
}

.side-nav__add-list {
  cursor: pointer;
}

.side-nav__add-list:hover {
  color: white;
}

.side-nav__empty {
  text-align: center;
  margin-top: 30px;
  color: #4d5161;
}

.side-nav__empty .iconfont {
  font-size: 90px;
}
</style>
