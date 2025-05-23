<template>
  <header class="easycampus-header">
    <div class="header-inner">
      <div class="logo" @click="backhome">校园集市</div>
      <div class="search-area-outer">
        <div class="search-area">
          <input v-model="searchText" class="search-input" placeholder="请输入你想要的内容" @keyup.enter="onSearch" />
          <button class="search-btn" @click="onSearch">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#fff" stroke-width="2" />
              <line x1="17" y1="17" x2="22" y2="22" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
            搜索
          </button>
        </div>
      </div>
      <div class="user-action">
        <UserAvatarCard v-if="user" :user="user" :statistics="statistics" @logout="onLogout" @goto="goto" />
        <template v-else>
          <span class="action-item" @click="showLogin = true">
            <svg class="user-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#2446a6" stroke-width="2" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#2446a6" stroke-width="2" />
            </svg>
            登录
          </span>
          <span class="action-item" @click="showRegister = true">
            <svg class="register-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#2446a6" stroke-width="2" />
              <path d="M19 21v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v2" stroke="#2446a6" stroke-width="2" />
              <line x1="16" y1="11" x2="16" y2="19" stroke="#2446a6" stroke-width="2" />
              <line x1="8" y1="11" x2="8" y2="19" stroke="#2446a6" stroke-width="2" />
            </svg>
            注册
          </span>
        </template>

        <span class="action-item" @click="userCenter">
          <svg class="order-icon" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="7" width="14" height="12" rx="2" stroke="#2446a6" stroke-width="2" />
            <path d="M9 3h6v4H9V3z" stroke="#2446a6" stroke-width="2" />
          </svg>
          订单
        </span>
      </div>
    </div>
    <Login v-model="showLogin" :closable="true" @login-success="onLoginSuccess" @login-cancel="onLoginCancel" />
    <Register v-model="showRegister" :closable="true" @register-success="onRegisterSuccess"
      @register-cancel="onRegisterCancel" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Login from "./Login/Login.vue";
import UserAvatarCard from "./UserAvatarCard.vue";
import Register from "./Login/Register.vue";
const searchText = ref("");
const showLogin = ref(false);
const showRegister = ref(false);

const user = ref<any>(null);
const statistics = ref<any>(null);
const router = useRouter();

function backhome() {
  router.push({ path: "/" });
}

function goto(type: string) {
  router.push({ path: "/UserCenter", query: { menu: type } });
}
function userCenter() {
  router.push("/UserCenter")
}
function onRegisterSuccess() {
  showRegister.value = false;
  showLogin.value = true;
}
function onRegisterCancel() {
  showRegister.value = false;
}
function onSearch() {
  if (!user.value) {
    showLogin.value = true;
    return;
  }
  if (!searchText.value.trim()) {
    alert("请输入搜索内容");
    return;
  }
  router.push({ path: "/search", query: { keyword: searchText.value.trim() } });
}
function onLoginSuccess() {
  const userStr = localStorage.getItem('user');
  const statStr = localStorage.getItem('user_statistics');
  user.value = userStr ? JSON.parse(userStr) : null;
  statistics.value = statStr ? JSON.parse(statStr) : null;
  showLogin.value = false;
}
function onLoginCancel() { }
function onLogout() {
  user.value = null;
  statistics.value = null;
  localStorage.removeItem("user");
  localStorage.removeItem("user_statistics");
  localStorage.removeItem("token");
}
onMounted(() => {
  try {
    const userStr = localStorage.getItem('user');
    const statStr = localStorage.getItem('user_statistics');
    user.value = userStr ? JSON.parse(userStr) : null;
    statistics.value = statStr ? JSON.parse(statStr) : null;
  } catch (e) { }
});
</script>

<style scoped>
/* 保持原样式 */
.easycampus-header {
  min-width: 99vw;
  background: #eaf3ff;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 12px 0 rgba(36, 70, 166, 0.06);
}

.header-inner {
  width: 100%;
  max-width: 1720px;
  min-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 48px;
  height: 84px;
  border-radius: 0 0 18px 18px;
  gap: 36px;
  position: relative;
}

.logo {
  font-size: 38px;
  font-weight: bold;
  color: #2446a6;
  letter-spacing: 2px;
  margin-right: 42px;
  font-family: '黑体', Arial, sans-serif;
  user-select: none;
  flex-shrink: 0;
  line-height: 1;
  text-shadow: 0 1px 0 #fff, 0 2px 8px #d3e2ff;
}

.search-area-outer {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}

.search-area {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #2446a6;
  border-radius: 36px;
  box-sizing: border-box;
  height: 50px;
  min-width: 500px;
  max-width: 800px;
  width: 70%;
  box-shadow: 0 2px 8px rgba(36, 70, 166, 0.05);
  transition: box-shadow 0.18s;
}

.search-area:focus-within {
  box-shadow: 0 4px 18px 0 rgba(36, 70, 166, 0.12);
  border-color: #476eed;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  background: transparent;
  padding: 0 20px;
  height: 48px;
  color: #2446a6;
  border-radius: 36px 0 0 36px;
  transition: background 0.18s;
}

.search-input::placeholder {
  color: #9bb9e6;
  opacity: 1;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background: #2446a6;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 0 32px 32px 0;
  height: 42px;
  margin: 4px 6px 4px 0;
  padding: 0 24px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: none;
}

.search-btn:hover,
.search-btn:focus {
  background: #476eed;
}

.search-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  vertical-align: middle;
}

.user-action {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #2446a6;
  font-size: 15px;
  font-weight: 500;
  margin-left: auto;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.0);
  padding: 0 4px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.2s, background 0.18s;
  line-height: 1;
  border-radius: 8px;
  padding: 6px 12px;
}

.action-item:hover,
.action-item:focus {
  color: #1a307d;
  background: #e0eaff;
}

.register-icon {
  width: 18px;
  height: 18px;
  stroke: #2446a6;
  margin-right: 2px;
}

.user-icon,
.order-icon {
  width: 18px;
  height: 18px;
  stroke: #2446a6;
  margin-right: 2px;
}

@media (max-width: 1100px) {
  .header-inner {
    padding: 0 10px;
    min-width: 0;
    height: 76px;
  }

  .search-area {
    min-width: 120px;
    max-width: 100vw;
    margin: 0 8px;
    width: 100%;
  }

  .logo {
    font-size: 30px;
    margin-right: 10px;
  }
}
</style>