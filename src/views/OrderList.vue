<template>
    <div class="order-layout-root">
      <!-- 顶部header -->
      <Search />
      <div class="order-layout-main">
        <!-- 左侧菜单 -->
        <aside class="order-sidemenu">
          <div class="menu-block">
            <div class="menu-title">我的校园</div>
          </div>
          <div class="menu-block">
            <div class="menu-main">
              <div
                :class="['menu-item', activeMenu === 'buy' && 'active']"
                @click="goMenu('buy')"
              >
                <span class="menu-icon">🛒</span>
                <span>我买到的</span>
              </div>
              <div
                :class="['menu-item', activeMenu === 'sell' && 'active']"
                @click="goMenu('sell')"
              >
                <span class="menu-icon">📦</span>
                <span>我卖出的</span>
              </div>
            </div>
          </div>
          <div class="menu-block">
            <div class="menu-title">我的收藏</div>
          </div>
          <div class="menu-block">
            <div class="menu-title">账户设置</div>
            <div class="menu-sub">
              <div
                :class="['menu-item', activeMenu === 'profile' && 'active']"
                @click="goMenu('profile')"
              >个人资料</div>
              <div
                :class="['menu-item', activeMenu === 'security' && 'active']"
                @click="goMenu('security')"
              >账户与安全</div>
            </div>
          </div>
        </aside>
        <!-- 右侧内容区 -->
        <main class="order-content">
          <!-- 顶部标签栏 -->
          <div class="order-tabbar">
            <div
              v-for="tab in tabs"
              :key="tab.key"
              :class="['order-tab', tab.key === currentTab ? 'active' : '']"
              @click="selectTab(tab.key)"
            >
              {{ tab.label }}
            </div>
          </div>
          <!-- 内容区：插入订单列表、空态等 -->
          <div class="order-content-area">
            <slot>
              <!-- 默认空态 -->
              <div class="order-empty">
                <img class="order-empty-img"
                  src="https://img.alicdn.com/imgextra/i4/O1CN01HUp9rF1kL1L1XemJg_!!6000000004659-2-tps-320-206.png" />
                <div class="order-empty-tip">暂无订单</div>
              </div>
            </slot>
          </div>
        </main>
        <!-- 右侧浮动按钮区 -->
        <div class="order-siderbar">
          <div class="siderbar-btn" @click="goPage('/publish')">
            <span style="font-size:26px;line-height:1;">＋</span>
            <div>发闲置</div>
          </div>
          <div class="siderbar-btn" @click="goPage('/messages')">
            <svg width="24" height="24" viewBox="0 0 24 24" style="margin-bottom:2px;">
              <ellipse cx="12" cy="12" rx="9" ry="8" stroke="#2446a6" stroke-width="2" fill="none"/>
              <ellipse cx="12" cy="12" rx="2" ry="2" fill="#2446a6"/>
            </svg>
            <div>消息</div>
          </div>
          <div class="siderbar-btn" @click="goPage('/feedback')">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <circle cx="11" cy="11" r="9" stroke="#2446a6" stroke-width="2" fill="none"/>
              <path d="M11,7 v4 l3,3" stroke="#2446a6" stroke-width="2" fill="none" />
            </svg>
            <div>反馈</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import Search from "@/components/Search.vue";
  
  const router = useRouter();
  const route = useRoute();
  
  // Tab数据和菜单数据
  const tabs = [
    { key: "all", label: "全部" },
    { key: "pendingPay", label: "待付款" },
    { key: "pendingSend", label: "待发货" },
    { key: "pendingReceive", label: "待收货" },
    { key: "pendingComment", label: "待评价" },
    { key: "refund", label: "退款中" },
  ];
  // 当前高亮tab和菜单
  const currentTab = ref("all");
  // 默认根据路由激活菜单
  const activeMenu = ref("buy");
  
  // 菜单跳转
  function goMenu(menu: string) {
    activeMenu.value = menu;
    switch (menu) {
      case "buy": router.push("/orders/buy"); break;
      case "sell": router.push("/orders/sell"); break;
      case "profile": router.push("/user/profile"); break;
      case "security": router.push("/user/security"); break;
    }
  }
  // Tab切换
  function selectTab(tab: string) {
    currentTab.value = tab;
    // 这里可加请求拉取不同状态订单
  }
  
  // 右侧浮动按钮跳转
  function goPage(path: string) {
    router.push(path);
  }
  </script>
  
  <style scoped>
  /* ...（样式同上，已适配header主色）... */
  .order-layout-root {
      min-height: 100vh;
      background: #f6f8fa;
  }
  .order-layout-main {
      display: flex;
      width: 100%;
      max-width: 1800px;
      min-height: calc(100vh - 60px);
      margin: 0 auto;
      padding: 20px 0 0 0;
      position: relative;
  }
  .order-sidemenu {
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
  .menu-block { margin-bottom: 12px; }
  .menu-title {
      font-size: 16px;
      font-weight: bold;
      color: #212121;
      padding: 6px 32px 6px 24px;
      letter-spacing: 1px;
  }
  .menu-main { display: flex; flex-direction: column; gap: 6px; }
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
  .menu-item.active, .menu-item:hover {
      background: #ffe834;
      color: #2446a6 !important;
      font-weight: 700;
  }
  .menu-icon { font-size: 18px; margin-right: 5px; }
  .menu-sub { margin-left: 14px; display: flex; flex-direction: column; gap: 3px; }
  .order-content {
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
  .order-tabbar {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 4px 0 18px 0;
      border-bottom: 2px solid #f2f2f2;
      margin-bottom: 8px;
      font-size: 17px;
  }
  .order-tab {
      padding: 5px 18px;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      color: #7a7a7a;
      font-weight: 500;
      background: #f7faff;
      transition: background 0.18s, color 0.18s;
      position: relative;
  }
  .order-tab.active, .order-tab:hover {
      color: #2446a6;
      background: #ffe834;
      font-weight: 800;
  }
  .order-content-area {
      min-height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
  }
  .order-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60px;
      color: #212121;
  }
  .order-empty-img {
      width: 180px;
      margin-bottom: 16px;
  }
  .order-empty-tip {
      font-size: 17px;
      font-weight: 500;
      margin-top: 6px;
      color: #222;
  }
  .order-siderbar {
      position: fixed;
      right: 30px;
      top: 130px;
      display: flex;
      flex-direction: column;
      gap: 22px;
      background: transparent;
      z-index: 99;
  }
  .siderbar-btn {
      width: 62px;
      height: 62px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px 0 rgba(36, 70, 166, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      color: #2446a6;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 4px;
      transition: background 0.16s, color 0.16s;
      border: 1.5px solid #f4f5fa;
  }
  .siderbar-btn:hover {
      background: #2446a610;
      color: #1681fd;
  }
  .siderbar-btn div {
      font-size: 13px;
      font-weight: 400;
      color: #222;
      margin-top: 3px;
      letter-spacing: 0.5px;
  }
  </style>