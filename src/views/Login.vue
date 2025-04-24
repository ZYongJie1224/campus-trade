<template>
  <div class="login-wrapper">
    <el-card class="login-card" style="border-radius: 8px; padding: 0px">
      <div class="card-body" style="padding: 0px">
        <div class="login-cover"></div>
        <div class="login-form">
          <div class="form-heading">
            <el-text class="heading-text" size="large" :suffix-icon="Calendar"
              >用户登录</el-text
            >
          </div>
          <div class="login-body">
            <el-form>
              <el-input
                class="username-input"
                type="text"
                placeholder="请输入用户名"
              ></el-input>
              <el-input
                class="password-input"
                type="password"
                placeholder="请输入密码"
              ></el-input>
              <el-button type="primary">登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
import { Calendar, Search } from "@element-plus/icons-vue";
</script>

<style>
.login-body{
    display: flex;
    height: 400px;
}
.password-input {
  height: 80px;
  border: 0px;
  padding: 20px;
  padding-left: 0px;
}
.username-input {
  height: 80px;
  border: 0px;
  padding: 20px;
  padding-left: 0px;
}
.el-text {
  font-size: 25px !;
  color: black !important;
  font-weight: bold;
}
.form-heading {
  display: flex;
}
.el-card__body {
  padding: 0px !important;
}
.login-wrapper {
  min-height: 95vh;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(/assets/login-bg-ZCI0NBQT.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.login-card {
  width: 920px;
  max-width: 100%;
  overflow: hidden;
}
.card-body {
  display: flex;
  padding: 0;
  height: 462px;
}
.login-cover {
  flex: 1;
  padding: 36px 8px;
  box-sizing: border-box;
  background-color: #1681fd;
  background-image: url(/assets/login-img-UOyjM-z2.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  text-align: center;
}
.login-form {
  width: 400px;
  flex-shrink: 0;
  padding: 32px 48px 0;
  box-sizing: border-box;
}
</style>