<template>
  <div class="side-nav">
    <img src="../assets/logo.png" alt="logo" class="side-nav__logo">

    <!-- side nav top -->
    <nav-item
      v-for="(item, index) in navs"
      v-if="index < 4"
      :key="index"
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
          v-for="(item, index) in lists"
          :key="index"
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
      v-if="index > 3"
      :key="index"
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
        id: '1',
        title: 'Inbox',
        num: 12,
        icon: 'inbox'
      }, {
        id: '2',
        title: 'Today',
        num: 12,
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
      const { data } = await this.axios.get('http://localhost:7001/group/list?userid=' + userId)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.lists = data.data
      }
    },
    onClickNav (title, id) {
      this.$store.commit('SETNAVTITLE', title)
      this.$store.commit('SETNAVID', id)
      this.$store.commit('SETDETAILSVISIBILITY', false)
      this.$store.commit('SETTASK', {})
    },
    addList () {
      this.$emit('add-list')
    },
    editList (list) {
      this.$emit('edit-list', list)
    },
    onEndDrag (e) {
      this.$sortable(e, this.lists)
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
