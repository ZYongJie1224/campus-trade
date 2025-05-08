    <template>
        <div class="user-center-root">
            <Search  @goto="handleGoto"/>
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
                            <!-- <div :class="['menu-item', activeMenu === 'security' && 'active']"
                                @click="activeMenu = 'security'">账户与安全</div> -->
                        </div>
                    </div>
                </aside>
                <!-- 右侧内容区域 -->
                <main class="user-content">
                    <!-- Tab栏（仅订单相关功能下显示） -->
                    <div v-if="['buy', 'sell'].includes(activeMenu)" class="user-tabbar">
                        <div v-for="tab in tabs" :key="tab.key"
                            :class="['user-tab', tab.key === currentTab ? 'active' : '']" @click="currentTab = tab.key">
                            {{ tab.label }}
                        </div>
                    </div>
                    <div class="user-content-area">
                        <!-- 各功能组件，按需引入 -->
                        <OrderBuyList v-if="activeMenu === 'buy'" :tab="currentTab"  mode="buy"/>
                        <OrderSellList v-if="activeMenu === 'sell'" :tab="currentTab" mode="sell"/>
                        <FavList v-if="activeMenu === 'fav'" />
                        <UserProfile v-if="activeMenu === 'profile'" />
                        <UserSecurity v-if="activeMenu === 'security'" />
                    </div>
                </main>
                <!-- 右侧浮动按钮 -->
                <!-- <div class="user-siderbar">
                    <div class="siderbar-btn" @click="showPublish = true">
                        <span style="font-size:26px;">＋</span>
                        <div>发闲置</div>
                    </div>
                    <div class="siderbar-btn" @click="activeMenu = 'messages'">
                        💬<div>消息</div>
                    </div>
                    <div class="siderbar-btn" @click="activeMenu = 'feedback'">
                        ↻<div>反馈</div>
                    </div>
                </div> -->
                <!-- <SideBarButtons /> -->
            </div>
            <PublishDialog v-model="showPublish" />
            <MessagesView v-if="activeMenu === 'messages'" />
            <FeedbackView v-if="activeMenu === 'feedback'" />
        </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import Search from '@/components/Search.vue'
    import SideBarButtons from '@/components/Nav/SideBarButtons.vue'
    // 各功能组件请按需新建/引入
    import OrderBuyList from '@/components/UserCenter/OrderBuyList.vue'
    import OrderSellList from '@/components/UserCenter/OrderSellList.vue'
    import FavList from '@/components/UserCenter/FavList.vue'
    import UserProfile from '@/components/UserCenter/UserProfile.vue'
    //   import OrderBuyList from './OrderBuyList.vue'
    //   import OrderSellList from './OrderSellList.vue'
    //   import FavList from './FavList.vue'
    //   import UserProfile from './UserProfile.vue'
    //   import UserSecurity from './UserSecurity.vue'
    //   import PublishDialog from './PublishDialog.vue'
    // //   import MessagesView from './MessagesView.vue'
    //   import FeedbackView from './FeedbackView.vue'

    function handleGoto(type: string) {
  if (type === 'buy' || type === 'sell' || type === 'fav') {
    activeMenu.value = type
  } else if (type === 'myinfo') {
    activeMenu.value = 'profile'
  }
}
    const activeMenu = ref('buy')
    const currentTab = ref('all')
    const showPublish = ref(false)
    function goto(type: 'buy' | 'sell' | 'fav' | 'myinfo') {
  if (type === 'buy' || type === 'sell' || type === 'fav') {
    activeMenu.value = type
  } else if (type === 'myinfo') {
    activeMenu.value = 'profile'
  }
}
    const tabs = [
        { key: 'all', label: '全部' },
        { key: 'pendingPay', label: '待付款' },
        // { key: 'pendingSend', label: '待发货' },
        { key: 'pendingReceive', label: '待收货' },
        // { key: 'pendingComment', label: '待评价' },
        // { key: 'refund', label: '退款中' },
    ]
    </script>

    <style scoped>
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

    .user-siderbar {
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

    /* 响应式适配 */
    @media (max-width: 900px) {
        .user-center-main {
            flex-direction: column;
            padding: 0;
        }

        .user-sidemenu {
            width: 100%;
            min-height: 0;
            flex-direction: row;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
        }

        .menu-block {
            margin-bottom: 0;
        }

        .menu-title {
            display: none;
        }

        .menu-item {
            padding: 8px 12px;
            font-size: 14px;
            border-radius: 0;
        }

        .menu-sub {
            margin-left: 0;
            gap: 0;
        }

        .user-content {
            padding: 10px 6px;
            min-height: 300px;
            border-radius: 0 0 18px 18px;
        }

        .user-tabbar {
            gap: 10px;
            font-size: 15px;
        }

        .user-tab {
            padding: 4px 7px;
            font-size: 15px;
        }

        .user-siderbar {
            display: none;
        }
    }
    </style>