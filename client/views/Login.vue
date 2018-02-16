<template>
  <el-row>
    <el-col :xs="0" :sm="12" :md="12" :lg="14" :xl="14" class="login__intro">
      <img src="../assets/logo.png" alt="logo" class="login__logo">
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
      <div class="login__container">
        <el-tabs v-model="activeTab" class="login__tab">
          <el-tab-pane label="SIGN IN" name="signin">
            <el-form :model="loginForm" class="login__form">
              <el-form-item label="EMAIL">
                <el-input
                  v-model="loginForm.email">
                </el-input>
              </el-form-item>

              <el-form-item label="PASSWORD">
                <el-input
                  type="password"
                  v-model="loginForm.psw">
                </el-input>
              </el-form-item>

              <el-form-item class="text-align--right">
                <a href="#" class="color--gray">Forgot password?</a>
              </el-form-item>

              <el-button
                class="btn--red login__btn"
                @click="login">
                SIGN IN
              </el-button>

              <!-- <el-button>
                SIGN IN WITH GOOGLE
              </el-button> -->
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="SIGN UP" name="signup">
            <el-form :model="signupForm" class="login__form">
              <el-form-item label="NAME">
                <el-input
                  v-model="signupForm.name">
                </el-input>
              </el-form-item>

              <el-form-item label="EMAIL">
                <el-input
                  v-model="signupForm.email">
                </el-input>
              </el-form-item>

              <el-form-item label="PASSWORD">
                <el-input
                  type="password"
                  v-model="signupForm.psw">
                </el-input>
              </el-form-item>

              <el-form-item label="">
                <el-checkbox v-model="signupForm.agreeTerm">
                  Agree to <a href="#">Term of Service</a>
                </el-checkbox>
              </el-form-item>

              <el-button
                class="btn--red"
                @click="signup">
                SIGN UP
              </el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import FlexBox from 'components/Layout/FlexBox'

export default {
  components: {
    FlexBox
  },
  data () {
    return {
      activeTab: 'signin',
      loginForm: {
        email: '',
        psw: '',
        remember: true
      },
      signupForm: {
        name: '',
        email: '',
        psw: '',
        agreeTerm: true
      }
    }
  },
  methods: {
    async login () {
      const { data } = await this.axios.post('http://localhost:7001/user/login', {
        email: this.loginForm.email,
        password: this.loginForm.psw
      })

      if (data.error !== 0) {
        this.$message({
          type: 'error',
          message: data.msg
        })
      } else {
        this.$store.commit('SETUSERID', data.data)
        localStorage.setItem('userId', data.data)
        this.$router.replace('/')
      }
    },
    async signup () {
      if (this.signupForm.agreeTerm) {
        const { data } = await this.axios.post('http://localhost:7001/user/create', {
          name: this.signupForm.name,
          email: this.signupForm.email,
          password: this.signupForm.psw
        })

        if (data.error !== 0) {
          if (data.msg === 'email must be unique') {
            this.$message({
              type: 'error',
              message: 'The email is token.'
            })
          }
        } else {
          this.$store.commit('SETUSERID', data.data.id)
          localStorage.setItem('userId', data.data.id)
          this.$router.replace('/')
        }
      } else {
        console.log("don't agree term")
      }
    }
  },
  created () {
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.$router.replace('/')
    }
  }
}
</script>

<style>
.login__intro {
  height: 100vh;
  background: #434654;
  position: relative;
  text-align: center;
}

.login__intro-icon {
  font-size: 200px;
  color: #fbfbfb;
  display: inline-block;
  margin-top: calc(50vh - 109px)
}

.login__logo {
  position: absolute;
  left: 50px;
  bottom: 50px;
}

.login__container {
  width: 60%;
  margin: 100px auto 0;
}

.login__tab .el-tabs__header{
  margin-bottom: 50px;
}

.login__tab .el-tabs__item {
  font-size: 22px;
  font-weight: normal;
  color: #ccc;
  transition: all .5s;
}

.login__tab .el-tabs__item:hover,
.login__tab .el-tabs__item.is-active {
  color: #434654;
}

.login__tab .el-tabs__active-bar {
  background-color: #ed4630;
}

.login__tab .el-tabs__nav-wrap:after {
  display: none;
}

.login__form .el-form-item__label{
  font-size: 13px;
}

.login__form .el-input__inner {
  background: #fbfbfb;
}

/*.login__btn.el-button {
  margin: 22px 0 5px;
}*/
</style>
