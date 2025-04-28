<template>
    <el-dialog
      v-model="visible"
      width="700px"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="custom-login-dialog"
      top="50%"
      :modal="true"
      :align-center="true"
      @close="onClose"
    >
      <div class="login-main">
        <!-- 左侧登录表单区 -->
        <div class="login-left">
          <!-- 登录方式切换 -->
          <div class="login-tabs">
            <div
              :class="['tab-item', loginType === 'sms' ? 'active' : '']"
              @click="loginType = 'sms'"
            >
              短信登录
            </div>
            <div
              :class="['tab-item', loginType === 'password' ? 'active' : '']"
              @click="loginType = 'password'"
            >
              密码登录
            </div>
          </div>
          <!-- 横线已隐藏 -->
          <!-- <div class="tab-underline"></div> -->
          <!-- 登录表单内容 -->
          <div class="form-area">
            <template v-if="loginType === 'sms'">
              <div class="field phone-field">
                <span class="phone-prefix">+86</span>
                <input
                  v-model="phone"
                  type="text"
                  maxlength="11"
                  class="input"
                  placeholder="请输入手机号"
                />
              </div>
              <div class="field code-field">
                <input
                  v-model="code"
                  type="text"
                  maxlength="6"
                  class="input"
                  placeholder="请输入验证码"
                />
                <button class="get-code-btn" :disabled="codeCountdown > 0" @click="getCode">
                  {{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}
                </button>
              </div>
            </template>
            <template v-else>
              <div class="field phone-field">
                <span class="phone-prefix">+86</span>
                <input
                  v-model="phone"
                  type="text"
                  maxlength="11"
                  class="input"
                  placeholder="请输入手机号"
                />
              </div>
              <div class="field password-field">
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  placeholder="请输入密码"
                />
              </div>
            </template>
          </div>
          <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
          <button class="login-btn" @click="handleLogin">
            登录
          </button>
        </div>
        <!-- 右侧二维码区 -->
        <div class="login-right">
          <div class="qr-title">手机扫码安全登录</div>
          <div class="qr-area">
            <img class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.taobao.com" alt="二维码" />
          </div>
          <div class="qr-tip">打开闲鱼APP扫码</div>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch, onUnmounted } from 'vue';
  
  const props = defineProps<{ modelValue: boolean; closable?: boolean }>();
  const emit = defineEmits(['update:modelValue', 'login-success', 'login-cancel']);
  
  const visible = ref(props.modelValue);
  watch(() => props.modelValue, v => (visible.value = v));
  watch(visible, v => emit('update:modelValue', v));
  
  const loginType = ref<'sms' | 'password'>('sms');
  const phone = ref('');
  const code = ref('');
  const password = ref('');
  const errorMsg = ref('');
  const codeCountdown = ref(0);
  let timer: any = null;
  
  function getCode() {
    if (!/^1[3-9]\d{9}$/.test(phone.value)) {
      errorMsg.value = '请输入正确的手机号';
      return;
    }
    errorMsg.value = '';
    codeCountdown.value = 60;
    timer = setInterval(() => {
      codeCountdown.value--;
      if (codeCountdown.value <= 0) clearInterval(timer);
    }, 1000);
  }
  
  function handleLogin() {
    errorMsg.value = '';
    if (!/^1[3-9]\d{9}$/.test(phone.value)) {
      errorMsg.value = '请输入正确的手机号';
      return;
    }
    if (loginType.value === 'sms') {
      if (!code.value) {
        errorMsg.value = '请输入验证码';
        return;
      }
      localStorage.setItem('user', JSON.stringify({ phone: phone.value }));
      emit('login-success', { phone: phone.value });
      visible.value = false;
    } else {
      if (!password.value) {
        errorMsg.value = '请输入密码';
        return;
      }
      localStorage.setItem('user', JSON.stringify({ phone: phone.value }));
      emit('login-success', { phone: phone.value });
      visible.value = false;
    }
  }
  
  function onClose() {
    emit('login-cancel');
    visible.value = false;
  }
  
//   onUnmounted(() => {
//     if (timer) clearInterval(timer);
//   });
  </script>
  
  <style scoped>
  .custom-login-dialog :deep(.el-dialog__body) {
    padding: 0 !important;
  }
  .login-main {
    display: flex;
    min-width: 600px;
    max-width: 700px;
    min-height: 420px;
    background: #fff;
    border-radius: 28px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
  .login-left {
    flex: 1.1 1 0;
    padding: 40px 24px 0 32px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ededed;
    min-width: 300px;
    max-width: 340px;
    box-sizing: border-box;
    overflow: visible;
    justify-content: center;
  }
  .login-tabs {
    display: flex;
    gap: 32px;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 500;
    user-select: none;
    justify-content: flex-start;
    margin-left: 2px;
    line-height: 1.1;
    position: relative;
    z-index: 2;
  }
  .tab-item {
    cursor: pointer;
    color: #bdbdbd;
    font-size: 20px;
    font-weight: 500;
    padding: 0 10px;
    transition: color 0.2s, font-size 0.2s;
    line-height: 1.3;
    background: transparent;
  }
  .tab-item.active {
    color: #111;
    font-size: 24px;
    font-weight: 800;
    position: relative;
    z-index: 2;
  }
  /* 横线已隐藏（注释掉，若需彻底移除可直接删除此段） */
  /* .tab-underline { display: none; } */
  
  .form-area {
    margin-top: 28px;
    margin-bottom: 12px;
  }
  .field {
    width: 100%;
    display: flex;
    align-items: center;
    background: #f7f7f7;
    border-radius: 28px;
    padding: 0 0 0 16px;
    margin-bottom: 18px;
    height: 46px;
    font-size: 16px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .phone-field .phone-prefix {
    font-weight: bold;
    color: #222;
    margin-right: 9px;
    min-width: 32px;
    font-size: 15px;
    flex-shrink: 0;
  }
  .input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    flex: 1 1 auto;
    height: 40px;
    line-height: 40px;
    color: #555;
    padding-right: 5px;
    min-width: 0;
  }
  .input::placeholder {
    color: #bbb;
    font-size: 16px;
  }
  .code-field {
    padding-right: 0;
  }
  .get-code-btn {
    border: none;
    background: #fafafa;
    color: #222;
    font-size: 14px;
    border-radius: 0 28px 28px 0;
    height: 38px;
    min-width: 72px;
    margin-right: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .get-code-btn:disabled {
    color: #bdbdbd;
    cursor: not-allowed;
    background: #fafafa;
  }
  .login-btn {
    margin-top: 22px;
    width: 100%;
    background: #ffe834;
    border: none;
    border-radius: 28px;
    height: 48px;
    font-size: 20px;
    font-weight: bold;
    color: #111;
    cursor: pointer;
    transition: background 0.2s;
    letter-spacing: 2px;
    box-shadow: 0 2px 12px #ffe83479;
  }
  .login-btn:hover {
    background: #ffe834d7;
  }
  .error-msg {
    color: #e44d26;
    margin-top: 2px;
    margin-bottom: -9px;
    font-size: 14px;
    text-align: left;
    min-height: 22px;
  }
  .login-right {
    flex: 1 1 0;
    padding: 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 210px;
    max-width: 280px;
    box-sizing: border-box;
    overflow: visible;
    justify-content: center;
    /* 垂直水平居中 */
    height: 100%;
  }
  .qr-title {
    font-size: 19px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 18px;
    margin-top: 0;
    color: #222;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: visible;
  }
  .qr-area {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border-radius: 14px;
    border: 4px solid #f5f5f5;
    margin-bottom: 14px;
    width: 140px;
    height: 140px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .qr-img {
    width: 115px;
    height: 115px;
    object-fit: contain;
    display: block;
  }
  .qr-tip {
    text-align: center;
    font-size: 13px;
    color: #888;
    margin-top: 5px;
    margin-bottom: 0;
    white-space: nowrap;
  }
  .custom-login-dialog :deep(.el-dialog) {
    border-radius: 28px !important;
    /* 居中且自适应高度 */
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
  }
  .custom-login-dialog :deep(.el-dialog__header) {
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
  }
  .custom-login-dialog :deep(.el-dialog__body) {
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
  }
  </style>