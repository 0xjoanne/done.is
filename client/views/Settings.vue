<template>
  <div class="settings__container">
    <el-card class="settings__content">
      <flex-box slot="header" class="settings__header">
        <span>Settings</span>
        <i
          class="el-icon-close cursor--pointer"
          @click="$router.replace('/')">
        </i>
      </flex-box>

      <el-tabs
        tab-position="left"
        class="settings__tabs">
        <el-tab-pane label="Profile">
          <el-form
            :model="profileForm">
            <el-form-item>
              <img
                :src="profileForm.avatar || defaultAvatar"
                alt="avatar"
                class="settings__avatar">
            </el-form-item>

            <el-form-item label="Name">
              <el-input v-model="profileForm.name"></el-input>
            </el-form-item>

            <el-form-item label="Email">
              <el-input v-model="profileForm.email"></el-input>
            </el-form-item>

            <div class="settings__btns">
              <el-button
                size="medium"
                type="primary"
                class="button--primary"
                @click="updateProfile">
                Update
              </el-button>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Password">
          <el-form
            :model="pswForm">
            <el-form-item label="Old Password">
              <el-input v-model="pswForm.old"></el-input>
            </el-form-item>

            <el-form-item label="New Password">
              <el-input v-model="pswForm.new"></el-input>
            </el-form-item>

            <el-form-item label="Confirm New Password">
              <el-input v-model="pswForm.confirm"></el-input>
            </el-form-item>

            <div class="settings__btns">
              <el-button
                size="medium"
                type="primary"
                class="button--primary">
                Update
              </el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'
const defaultAvatar = require('../assets/avatar.png')


export default {
  components: {
    FlexBox
  },
  data () {
    return {
      defaultAvatar,
      profileForm: {},
      pswForm: {}
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
        this.profileForm = data.data
      }
    },
    async updateProfile () {
      const userId = localStorage.getItem('userId')

      const { data } = await this.axios.put('/user/' + userId, {
        name: this.profileForm.name,
        email: this.profileForm.email
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$message({
          type: 'success',
          message: 'Updated successfully!'
        })
      }
    }
  },
  async created () {
    await this.getUserInfo()
  }
}
</script>

<style>
.settings__container {
  background: #fbfbfb;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
}

.settings__content.el-card {
  width: 960px;
  margin: 0 auto;
  box-shadow: none;
  border-radius: 2px;
  color: #434654;
}

.settings__content .el-card__header {
  padding: 25px 20px;
}

.settings__header {
  font-size: 24px;
}

.settings__tabs .el-tabs__item{
  min-width: 150px;
}

.settings__tabs .el-tabs__content {
  padding: 20px 100px;
}

.settings__btns {
  text-align: right;
  margin: 80px 0;
}

.settings__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>
