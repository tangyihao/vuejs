<template>
  <div class="login">
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input v-model="loginForm.username" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input v-model="loginForm.password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button @click="login" type="button" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
        <div class="link-area"><a @click="register">还没有账号？前往注册</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    login () {
      // 登录
      // 1.判断用户名和密码是否输入
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$toast('请输入用户名和密码')
      } else {
        // 2.发送请求进行登录
        this.$http
          .post('login', this.loginForm)
          .then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.$toast(res.data.msg)
            } else {
              // 3.登录成功
              this.$toast(res.data.msg)
              // 3.1 登录成功之后，需要将用户信息保存到vuex中 user模块里的setUser 这个mutations
              this.$store.commit('user/setUser', res.data.data)
              // 3.2 登录成功之后，需要将用户的登录的session_id保存到loaclStorage里面
              this.$auth.setAuthorization(res.data.data.session_id)
              // 3.3 登录成功之后，需要跳转到我的页面
              this.$router.push('/user')
            }
          })
          .catch(() => {
            this.$toast('登录失败')
          })
      }
    },
    register () {
      this.$router.push('/user/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.mui-input-group {
  margin-top: 10px;
  background-color: transparent;
}
.mui-input-group label {
  width: 22%;
}
.mui-input-row:last-child {
  background: #fff;
}
.mui-input-row {
  margin-top: 20px;
  background: #fff;
}
.mui-input-row label~input,
.mui-input-row label~select,
.mui-input-row label~textarea {
  width: 78%;
}
.link-area {
  display: block;
  margin-top: 25px;
  text-align: center;
}
.mui-content-padded {
  margin-top: 30px;
}
</style>
