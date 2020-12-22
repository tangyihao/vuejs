<template>
  <div class="login">
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input v-model="regForm.username" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input v-model="regForm.password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
        <div class="mui-input-row">
          <label>确认</label>
          <input v-model="regForm.rePassword" type="password" class="mui-input-clear mui-input" placeholder="请再次输入密码">
        </div>
        <div class="mui-input-row">
          <label>邮箱</label>
          <input v-model="regForm.email" type="text" class="mui-input-clear mui-input" placeholder="请输入邮箱">
        </div>
      </form>
      <div class="mui-content-padded">
        <button @click="reg" type="button"
        class="mui-btn mui-btn-block mui-btn-primary btnAdd">注册</button>
        <p>注册成功之后用户可以登录</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      regForm: {
        username: '',
        password: '',
        rePassword: '',
        email: ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    reg () {
      // 1.判断用户是否已经输入帐号，密码，重复密码，邮箱
      if (this.regForm.username === '') {
        this.$toast('帐号不能为空')
        return
      }
      if (this.regForm.password === '') {
        this.$toast('密码不能为空')
        return
      }
      if (this.regForm.rePassword === '') {
        this.$toast('确认密码不能为空')
        return
      }
      if (this.regForm.email === '') {
        this.$toast('邮箱不能为空')
        return
      }
      // 2.判断用户两次输入的密码是否一致
      if (this.regForm.password !== this.regForm.rePassword) {
        this.$toast('两次密码输入必须一致')
        return
      }
      // 3.发送请求给后台接口完成注册操作
      // console.log('验证成功')
      this.$http.post('register', this.regForm).then(res => {
        if (res.data.code === 0) {
          this.$toast(res.data.msg)
        } else {
          // 注册成功,立即登录
          // 3.1 将注册的用户信息保存到vuex
          this.$store.commit('user/setUser', res.data.data)
          // 3.2 将注册的用户的session_id保存到localStorage
          this.$auth.setAuthorization(res.data.data.session_id)
          // 3.3 弹窗提示用户注册成功
          this.$toast(res.data.msg)
          // 3.2 完成注册之后跳转到 我的 页面（/user）
          this.$router.push('/user')
        }
      }).catch(() => {
        this.$toast('注册失败')
      })
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
