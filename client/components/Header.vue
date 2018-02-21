<template>
  <flex-box class="header">
    <div class="header__title">
      {{ activeNav }}
    </div>

    <flex-box>
      <!-- <div class="header__icon cursor--pointer">
        <el-badge
          :value="msgNum"
          class="header__msg-badge">
          <i class="iconfont icon-bell header__msg-icon"></i>
        </el-badge>
      </div> -->

      <el-dropdown
        trigger="click"
        @command="handleCommand">
        <div class="header__profile cursor--pointer">
          <img
            :src="user.avatar || defaultAvatar"
            alt="avatar"
            class="header__profile-avatar">
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="settings">
            <i class="iconfont icon-setting header__profile-icon"></i>
            <span>Settings</span>
          </el-dropdown-item>

          <el-dropdown-item command="logout">
            <i class="iconfont icon-logout header__profile-icon"></i>
            <span>Log out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </flex-box>
  </flex-box>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
import { mapState } from 'vuex'
const defaultAvatar = require('../assets/avatar.png')
export default {
  components: {
    FlexBox
  },
  data () {
    return {
      defaultAvatar,
      msgNum: 12,
      addInput: '',
      user: {}
    }
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const { data } = await this.axios.get('/user/list?userid=' + userId)

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.user = data.data
      }
    },
    handleCommand (command) {
      if (command === 'settings') {
        this.$router.replace('/settings')
      } else if (command === 'logout') {
        localStorage.setItem('userId', '')
        this.$router.replace('/login')
      }
    }
  },
  computed: mapState({
    activeNav: state => state.navTitle
  }),
  async created () {
    this.$bus.$on('get-user-info', async () => {
      await this.getUserInfo()
    })
    await this.getUserInfo()
  }
}
</script>

<style>
.header {
  height: 100%;
  overflow: hidden;
}

.header__title {
  font-size: 24px;
  font-weight: 400;
}

.header__icon:hover,
.header__profile:hover {
  background: #e6f7ff;
}

.header__icon {
  padding: 24px 12px;
}

.header__msg-icon {
  font-size: 17px;
  color: rgba(0, 0, 0, 0.65);
  position: relative;
  top: -2px;
}

.header__profile {
  height: 100%;
  padding: 20px 12px;
  margin-left: 8px;
}

.header__profile-icon {
  color: rgba(0, 0, 0, 0.65);
  margin-right: 5px;
  vertical-align: middle;
}

.el-dropdown-menu__item:not(.is-disabled):hover .header__profile-icon {
  color: #66b1ff;
}

.header__profile-avatar {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
</style>
