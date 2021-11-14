<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{
          required: true,
          message: '请填写手机号'
        },{
          validator: phoneCheck,
          message: '格式有误，请重新输入'
        }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{
          required: true,
          message: '请填写密码'
        },{
          validator: passwordCheck,
          message: '格式有误，请重新输入'
        }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      // 登录按钮加载中状态
      isLoading: false
    }
  },
  methods: {
    onClickLeft () {
      // go ()用于跳转历史，-1代表后退一个页面，用法类似history.go()
      this.$router.go(-1)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      // 登录成功
      if (data.state === 1) {
        // 登录成功后将数据保存到本地存储中
        this.$store.commit('setUser', data.content)
        // login登录成功的跳转取决于redirect
        // 跳转
        this.$router.push(this.$route.query.redirect || '/')
        // 提示
        this.$toast('登陆成功！')
      } else {
        this.$toast('登录失败！')
      }
      this.isLoading = false
    },
    passwordCheck (value) {
      return /^[a-z0-9A-Z]{6,10}$/.test(value)
    },
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    }
  }
}
</script>

<style lang="scss">
</style>
