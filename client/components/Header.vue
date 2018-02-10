<template>
  <flex-box class="header">
    <div class="header__title">
      All
    </div>

    <flex-box>
      <!-- <div class="header__icon cursor--pointer">
        <el-badge
          :value="msgNum"
          class="header__msg-badge">
          <i class="iconfont icon-bell header__msg-icon"></i>
        </el-badge>
      </div> -->

      <el-dropdown trigger="click">
        <div class="header__profile cursor--pointer">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=100&size=b9999_10000&sec=1510278897&di=a158da35f8b26f484be5619830d8726e&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ae2958ae3c46a801219c774d7171.jpg%40900w_1l_2o_100sh.jpg"
            alt="avatar"
            class="header__profile-avatar">
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="iconfont icon-setting header__profile-icon"></i>
            <span>Settings</span>
          </el-dropdown-item>
          <el-dropdown-item>
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

export default {
  components: {
    FlexBox
  },
  data () {
    return {
      msgNum: 12,
      addInput: ''
    }
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
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin-right: 5px;
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
