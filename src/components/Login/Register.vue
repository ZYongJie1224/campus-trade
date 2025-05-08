<template>
    <el-dialog
      v-model="visible"
      width="700px"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="custom-register-dialog"
      top="50%"
      :modal="true"
      :align-center="true"
      @close="onClose"
    >
      <div class="register-main">
        <!-- 左侧注册表单区 -->
        <div class="register-left">
          <div class="register-title">注册账号</div>
          <div class="form-area">
            <div class="field">
              <input
                v-model="form.username"
                type="text"
                maxlength="16"
                class="input"
                placeholder="请输入用户名"
              />
            </div>
            <div class="field">
              <input
                v-model="form.nickname"
                type="text"
                maxlength="16"
                class="input"
                placeholder="请输入昵称"
              />
            </div>
            <div class="field">
              <input
                v-model="form.email"
                type="email"
                maxlength="50"
                class="input"
                placeholder="请输入邮箱"
              />
            </div>
            <div class="field">
              <input
                v-model="form.password"
                type="password"
                maxlength="20"
                class="input"
                placeholder="请输入密码"
              />
            </div>
            <div class="field">
              <input
                v-model="form.confirmPassword"
                type="password"
                maxlength="20"
                class="input"
                placeholder="请再次输入密码"
              />
            </div>
            <div class="field">
              <input
                v-model="form.phone"
                type="text"
                maxlength="11"
                class="input"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
          <button class="register-btn" :disabled="loading" @click="handleRegister">
            注册
          </button>
        </div>
        <!-- 右侧二维码区 -->
        <div class="register-right">
          <div class="qr-title">扫码快速注册</div>
          <div class="qr-area">
            <img class="qr-img" src="/static/qr-demo.png" alt="注册二维码" />
          </div>
          <div class="qr-tip">使用易校园APP扫码注册</div>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { regAPI } from '@/api/modules/user/user' // 请根据实际路径调整
  
  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'register-success', 'register-cancel'])
  
  const visible = ref(props.modelValue)
  watch(() => props.modelValue, v => (visible.value = v))
  watch(visible, v => emit('update:modelValue', v))
  
  const form = ref({
    username: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const errorMsg = ref('')
  const loading = ref(false)
  
  function validateEmail(email: string) {
    // 简单邮箱正则
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
  }
  
  async function handleRegister() {
    errorMsg.value = ''
    if (!form.value.username) {
      errorMsg.value = '请输入用户名'
      return
    }
    if (!form.value.nickname) {
      errorMsg.value = '请输入昵称'
      return
    }
    if (!form.value.email) {
      errorMsg.value = '请输入邮箱'
      return
    }
    if (!validateEmail(form.value.email)) {
      errorMsg.value = '邮箱格式不正确'
      return
    }
    if (!form.value.password) {
      errorMsg.value = '请输入密码'
      return
    }
    if (form.value.password.length < 6) {
      errorMsg.value = '密码长度不能少于6位'
      return
    }
    if (form.value.password !== form.value.confirmPassword) {
      errorMsg.value = '两次输入密码不一致'
      return
    }
    if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
      errorMsg.value = '请输入正确的手机号'
      return
    }
    loading.value = true
    try {
      const res = await regAPI({
        username: form.value.username,
        nickname: form.value.nickname,
        email: form.value.email,
        password: form.value.password,
        phone: form.value.phone
      })
      // 假设接口返回 {code: 200, msg: "..."}
      if (res.data && (res.code === 200)) {
        ElMessage.success('注册成功，请登录！')
        emit('register-success', form.value)
        visible.value = false
      } else {
        errorMsg.value = res.data.msg || '注册失败'
      }
    } catch (e: any) {
      errorMsg.value = e?.response?.data?.msg || '注册异常，请重试'
    }
    loading.value = false
  }
  
  function onClose() {
    emit('register-cancel')
    visible.value = false
  }
  </script>
  
  <style scoped>
  .custom-register-dialog :deep(.el-dialog__body) {
    padding: 0 !important;
  }
  .register-main {
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
  .register-left {
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
  .register-title {
    font-size: 24px;
    font-weight: 800;
    color: #222;
    margin-bottom: 36px;
    text-align: center;
    letter-spacing: 2px;
  }
  .form-area {
    margin-bottom: 14px;
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
  .register-btn {
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
  .register-btn[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .register-btn:hover:enabled {
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
  .register-right {
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
  .custom-register-dialog :deep(.el-dialog) {
    border-radius: 28px !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
  }
  .custom-register-dialog :deep(.el-dialog__header) {
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
  }
  .custom-register-dialog :deep(.el-dialog__body) {
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
  }
  </style>