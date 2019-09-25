<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <form class="my-form">
      <van-cell-group>
        <van-field
          v-model="form.mobile"
          :error-message="errMobile"
          @blur="errMobile = /0?(13|14|15|18)[0-9]{9}/.test(form.mobile) ? '' : '请输入正确手机号'"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="form.code"
          :error-message="errCode"
          @blur="errCode = /^\d{6}$/.test(form.code) ? '' : '请输入6位数验证码'"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <van-button class="btn-login" type="info" @click.prevent="goLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
// 导入storage方法
import { setStorage } from "@/utils/storage/";
export default {
  name: "login",
  data() {
    return {
      // 手机验证
      errMobile: "",
      // 验证码验证
      errCode: "",
      // 双向绑定请求数据
      form: {
        mobile: "13911111111",
        code: "246810"
      }
    };
  },
  methods: {
    async goLogin() {
      if (!/0?(13|14|15|18)[0-9]{9}/.test(this.form.mobile)) {
        this.errMobile = "请输入正确手机号";
      }
      if (!/^\d{6}$/.test(this.form.code)) {
        this.errCode = "请输入6位数验证码";
      }
      if (!this.errMobile && !this.errCode) {
        try {
          let res = await login(this.form);
          this.$router.push("/home");
          setStorage(res.data.data);
          console.log(res);
        } catch (error) {
          this.$toast.fail("手机号或密码错误");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-form {
  padding: 0 15px;
  .btn-login {
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>