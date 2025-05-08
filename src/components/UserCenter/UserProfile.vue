<template>
    <div class="user-profile-root">
      <div class="profile-card">
        <!-- 内容区两列：左头像右表单 -->
        <div class="profile-flex">
          <div class="avatar-section">
            <el-avatar
              :src="profile.avatar || defaultAvatar"
              :size="110"
              class="profile-avatar"
            />
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :http-request="uploadAvatar"
              :before-upload="beforeAvatarUpload"
            >
              <el-button class="avatar-btn" size="small">更换头像</el-button>
            </el-upload>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            label-width="70px"
            class="profile-form"
          >
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="profile.username" disabled />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save-btn" @click="submitForm">保存</el-button>
              <el-button @click="fetchProfile">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 统计信息 -->
        <div class="profile-stats">
          <div class="stat-item" v-for="(num, label) in stats" :key="label">
            <div class="stat-num">{{ num }}</div>
            <div class="stat-label">{{ statLabels[label] }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { getUserProfile, updateUserProfile, uploadUserAvatar, getUserStats } from '@/api/modules/user/user'
  
  const defaultAvatar = 'https://img.yzcdn.cn/vant/cat.jpeg'
  
  const profile = reactive({
    id: 0,
    username: '',
    email: '',
    nickname: '',
    avatar: '',
    phone: '',
    gender: 0,
    createTime: ''
  })
  
  const form = reactive({
    nickname: '',
    email: '',
    phone: ''
  })
  
  const rules = {
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
    ]
  }
  
  const formRef = ref()
  const stats = reactive({
    buy: 0,
    sell: 0,
    fav: 0,
    fans: 0,
    follow: 0
  })
  const statLabels = {
    buy: '买到',
    sell: '卖出',
    fav: '收藏',
    fans: '粉丝',
    follow: '关注'
  }
  
  async function fetchProfile() {
    const res = await getUserProfile()
    if (res.code === 200) {
      Object.assign(profile, res.data)
      Object.assign(form, {
        nickname: res.data.nickname,
        email: res.data.email,
        phone: res.data.phone
      })
    } else {
      ElMessage.error(res.message || '获取用户信息失败')
    }
  }
  
  async function fetchStats() {
    const res = await getUserStats()
    if (res.code === 200) Object.assign(stats, res.data)
  }
  
  async function submitForm() {
    await formRef.value.validate()
    const res = await updateUserProfile(form)
    if (res.code === 200) {
      ElMessage.success('修改成功')
      fetchProfile()
    } else {
      ElMessage.error(res.message || '修改失败')
    }
  }
  
  function beforeAvatarUpload(file: File) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) ElMessage.error('头像仅支持 JPG/PNG 格式')
    if (!isLt2M) ElMessage.error('头像大小不能超过 2MB')
    return isJPG && isLt2M
  }
  
  async function uploadAvatar(param: any) {
    const formData = new FormData()
    formData.append('avatar', param.file)
    const res = await uploadUserAvatar(formData)
    if (res.code === 200) {
      ElMessage.success('头像更新成功')
      fetchProfile()
    } else {
      ElMessage.error(res.message || '头像上传失败')
    }
  }
  
  onMounted(() => {
    fetchProfile()
    fetchStats()
  })
  </script>
  
  <style scoped>
  .user-profile-root {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .profile-card {
    width: 100%;
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 8px 40px 0 #eaf3ff;
    padding: 48px 0 36px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .profile-flex {
    /* 撑满一行，内容两列居中，左头像右表单 */
    width: 620px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 34px;
  }
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 140px;
    margin-right: 40px;
  }
  
  .profile-avatar {
    border: 3px solid #eaf3ff;
    box-shadow: 0 2px 10px #eaf3ff80;
    margin-bottom: 18px;
  }
  .avatar-btn {
    background: linear-gradient(90deg, #eaf3ff 0, #1681fd1a 100%);
    color: #1681fd;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    transition: background 0.18s, color 0.18s;
  }
  .avatar-btn:hover, .avatar-btn:focus {
    background: #2446a6;
    color: #fff;
  }
  .profile-form {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .save-btn {
    background: #2446a6;
    color: #fff;
    border-radius: 8px;
    margin-right: 12px;
    border: none;
    font-weight: 600;
  }
  .save-btn:hover, .save-btn:focus {
    background: #1681fd;
    color: #fff;
  }
  .profile-stats {
    display: flex;
    gap: 42px;
    margin-top: 30px;
    width: 620px;
    justify-content: center;
  }
  .stat-item {
    background: #f8fbff;
    border-radius: 16px;
    padding: 12px 18px 8px 18px;
    min-width: 54px;
    text-align: center;
    box-shadow: 0 2px 12px #eaf3ff80;
  }
  .stat-num {
    color: #2446a6;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .stat-label {
    color: #8fa5c8;
    font-size: 13px;
  }
  
  /* 响应式适配 */
  @media (max-width: 900px) {
    .profile-card,
    .profile-flex,
    .profile-stats {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100vw !important;
    }
    .profile-flex {
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
    .avatar-section {
      margin: 0 0 16px 0;
    }
    .profile-form {
      width: 95vw;
      min-width: 0;
    }
    .profile-stats {
      gap: 12px;
      margin-top: 18px;
      flex-wrap: wrap;
    }
  }
  </style>