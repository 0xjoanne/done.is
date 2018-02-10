<template>
  <div class="side-nav">
    <img src="../assets/logo.png" alt="logo" class="side-nav__logo">

    <!-- side nav top -->
    <div class="side-nav__top">
      <nav-item
        v-for="(item, index) in navs"
        :key="index"
        :icon="item.icon"
        :label="item.title"
        :num="item.num">
      </nav-item>
    </div>

    <div class="divider">
    </div>

    <!-- side nav bottom -->
    <div class="side-nav__bottom">
      <flex-box class="side-nav__bottom-header">
        <span
          class="side-nav__bottom-title">
          Lists
        </span>

        <i
          class="el-icon-plus side-nav__add-list"
          @click="addList">
        </i>
      </flex-box>

      <draggable v-model="lists" @end="onEndDrag">
        <list-item
          v-for="(item, index) in lists"
          :key="index"
          :item="item"
          @edit-list="editList">
        </list-item>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NavItem from 'components/NavItem'
import ListItem from 'components/ListItem'
import FlexBox from 'components/Layout/FlexBox'

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
        title: 'Inbox',
        num: 12,
        icon: 'inbox'
      }, {
        title: 'Today',
        num: 12,
        icon: 'activity'
      }, {
        title: 'Next 7 Days',
        num: 0,
        icon: '7'
      }, {
        title: 'Done',
        num: 0,
        icon: 'done'
      }],
      lists: [{
        title: 'Test Test Test TestTestTestTest',
        index: 1,
        color: '#1890FF',
        tasks: [{
          title: '测试1'
        }, {
          title: '测试2'
        }, {
          title: '测试1'
        }, {
          title: '测试2'
        }, {
          title: '测试1'
        }]
      }, {
        title: 'Work',
        index: 3,
        color: '#FFD422',
        tasks: [{
          title: '测试1'
        }]
      }, {
        title: 'Happy',
        index: 5,
        color: '',
        tasks: []
      }, {
        title: 'Test Test Test TestTestTestTest',
        index: 7,
        color: '#FF67A6',
        tasks: [{
          title: '测试1'
        }, {
          title: '测试2'
        }, {
          title: '测试1'
        }, {
          title: '测试2'
        }, {
          title: '测试1'
        }]
      }]
    }
  },
  methods: {
    addList () {
      this.$emit('add-list')
    },
    editList (list) {
      this.$emit('edit-list', list)
    },
    onEndDrag (e) {
      this.$sortable(e, this.lists)
    }
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

.side-nav__top .iconfont {
  font-size: 20px;
}

.side-nav__bottom-header {
  padding: 0 30px;
  line-height: 40px;
}

.side-nav__add-list {
  cursor: pointer;
}

.side-nav__add-list:hover {
  color: white;
}
</style>
