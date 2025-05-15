<template>
    <div class="user-center-root">
      <Search />
      <div class="user-center-main">
        <!-- 左侧菜单 -->
        <aside class="user-sidemenu">
          <div class="menu-block">
            <div class="menu-title">我的校园</div>
          </div>
          <div class="menu-block">
            <div class="menu-main">
              <div :class="['menu-item', activeMenu === 'buy' && 'active']" @click="activeMenu = 'buy'">
                <span class="menu-icon">🛒</span>
                我买到的
              </div>
              <div :class="['menu-item', activeMenu === 'sell' && 'active']" @click="activeMenu = 'sell'">
                <span class="menu-icon">📦</span>
                我卖出的
              </div>
            </div>
          </div>
          <div class="menu-block">
            <div class="menu-title">我的收藏</div>
            <div :class="['menu-item', activeMenu === 'fav' && 'active']" @click="activeMenu = 'fav'">收藏列表</div>
          </div>
          <div class="menu-block">
            <div class="menu-title">账户设置</div>
            <div class="menu-sub">
              <div :class="['menu-item', activeMenu === 'profile' && 'active']"
                   @click="activeMenu = 'profile'">个人资料</div>
            </div>
          </div>
        </aside>
        <!-- 右侧内容区域 -->
        <main class="user-content">
          <!-- <UserAvatarCard
            :user="user"
            :statistics="statistics"
            @logout="onLogout"
            @goto="handleGoto"
          /> -->
          <!-- Tab栏（仅订单相关功能下显示） -->
          <div v-if="['buy', 'sell'].includes(activeMenu)" class="user-tabbar">
            <div v-for="tab in tabs" :key="tab.key"
                 :class="['user-tab', tab.key === currentTab ? 'active' : '']"
                 @click="currentTab = tab.key">
              {{ tab.label }}
            </div>
          </div>
          <div class="user-content-area">
            <OrderBuyList v-if="activeMenu === 'buy'" :tab="currentTab" mode="buy"/>
            <OrderSellList v-if="activeMenu === 'sell'" :tab="currentTab" mode="sell"/>
            <FavList v-if="activeMenu === 'fav'" />
            <UserProfile v-if="activeMenu === 'profile'" />
            <UserSecurity v-if="activeMenu === 'security'" />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from "vue-router";
  import Search from '@/components/Search.vue'
  import UserAvatarCard from '@/components/UserAvatarCard.vue'
  import OrderBuyList from '@/components/UserCenter/OrderBuyList.vue'
  import OrderSellList from '@/components/UserCenter/OrderSellList.vue'
  import FavList from '@/components/UserCenter/FavList.vue'
  import UserProfile from '@/components/UserCenter/UserProfile.vue'
//   import UserSecurity from '@/components/UserCenter/UserSecurity.vue'
  
  // 你可以根据实际情况更换 user/statistics 的数据来源
  const user = ref({
    avatarUrl: '',
    nickname: '测试用户',
    userId: 123456
  });
  const statistics = ref({
    fans_count: 100,
    follow_count: 88,
    buyCount: 5,
    sellCount: 3,
    favCount: 12
  });
  
  const activeMenu = ref('buy')
  const currentTab = ref('all')
  const route = useRoute()
  
  onMounted(() => {
    const menu = route.query.menu;
    if (menu === 'buy' || menu === 'sell' || menu === 'fav') {
      activeMenu.value = menu as string
    } else if (menu === 'myinfo') {
      activeMenu.value = 'profile'
    }
  })
  
  function handleGoto(type: string) {
    if (type === 'buy' || type === 'sell' || type === 'fav') {
      activeMenu.value = type
    } else if (type === 'myinfo') {
      activeMenu.value = 'profile'
    }
  }
  function onLogout() {
    alert('已退出登录')
  }
  
  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pendingPay', label: '待付款' },
    { key: 'pendingReceive', label: '待收货' },
  ]
  </script>
  
  <style scoped>
  /* 样式同你之前代码 */
  .user-center-root {
      min-height: 100vh;
      background: #f6f8fa;
  }
  .user-center-main {
      display: flex;
      width: 100%;
      max-width: 1800px;
      min-height: calc(100vh - 60px);
      margin: 0 auto;
      padding: 20px 0 0 0;
      position: relative;
  }
  .user-sidemenu {
      width: 200px;
      background: #f7faff;
      border-radius: 18px;
      margin: 0 16px 0 0;
      padding: 18px 0 0 0;
      box-shadow: 0 2px 16px 0 rgba(36, 70, 166, 0.03);
      min-height: 700px;
      display: flex;
      flex-direction: column;
      gap: 16px;
  }
  .menu-block {
      margin-bottom: 12px;
  }
  .menu-title {
      font-size: 16px;
      font-weight: bold;
      color: #212121;
      padding: 6px 32px 6px 24px;
      letter-spacing: 1px;
  }
  .menu-main {
      display: flex;
      flex-direction: column;
      gap: 6px;
  }
  .menu-item {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #232a3d;
      padding: 10px 32px 10px 30px;
      border-radius: 9px;
      cursor: pointer;
      transition: background 0.17s, color 0.17s;
      font-weight: 500;
      gap: 10px;
  }
  .menu-item.active,
  .menu-item:hover {
      background: #ffe834;
      color: #2446a6 !important;
      font-weight: 700;
  }
  .menu-icon {
      font-size: 18px;
      margin-right: 5px;
  }
  .menu-sub {
      margin-left: 14px;
      display: flex;
      flex-direction: column;
      gap: 3px;
  }
  .user-content {
      flex: 1 1 0;
      min-width: 0;
      background: #fff;
      border-radius: 18px;
      min-height: 700px;
      padding: 16px 32px 20px 36px;
      box-shadow: 0 2px 16px 0 rgba(36, 70, 166, 0.07);
      display: flex;
      flex-direction: column;
  }
  .user-tabbar {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 4px 0 18px 0;
      border-bottom: 2px solid #f2f2f2;
      margin-bottom: 8px;
      font-size: 17px;
  }
  .user-tab {
      padding: 5px 18px;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      color: #7a7a7a;
      font-weight: 500;
      background: #f7faff;
      transition: background 0.18s, color 0.18s;
      position: relative;
  }
  .user-tab.active,
  .user-tab:hover {
      color: #2446a6;
      background: #ffe834;
      font-weight: 800;
  }
  .user-content-area {
      min-height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
  }
  </style>