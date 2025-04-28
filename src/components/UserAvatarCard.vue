<!-- UserAvatarCard.vue -->
<template>
    <div class="user-avatar-hover" @mouseenter="showCard = true" @mouseleave="showCard = false">
      <img :src="user.avatar_url || defaultAvatar" class="avatar" />
      <span class="nickname">{{ user.nickname }}</span>
      <transition name="fade">
        <div
          v-show="showCard"
          class="user-card"
          @mouseenter="showCard = true"
          @mouseleave="showCard = false"
        >
          <div class="card-header">
            <img :src="user.avatar_url || defaultAvatar" class="avatar-big" />
            <div class="nickname-row">
              <span class="nickname-big">{{ user.nickname }}</span>
              <span class="id">ID: {{ user.user_id }}</span>
            </div>
          </div>
          <div class="card-row">
            <span>{{ user.fans_count }} 粉丝</span>
            <span>{{ user.follow_count }} 关注</span>
          </div>
          <div class="card-actions">
            <div class="action-row" @click="goto('buy')">
              <span>我买到的</span>
              <span>{{  statistics?.buyCount ?? 0  }}</span>
            </div>
            <div class="action-row" @click="goto('sell')">
              <span>我卖出的</span>
              <span>{{ statistics.sellCount }}</span>
            </div>
            <div class="action-row" @click="goto('fav')">
              <span>我的收藏</span>
              <span>{{ statistics.favCount }}</span>
            </div>
          </div>
          <div class="card-bottom">
            <button @click="onLogout">退出登录</button>
            <button @click="saveUserInfo">保存登录信息</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  const props = defineProps({
    user: { type: Object, required: true },
    statistics: { type: Object, required: true },
  });
  const emit = defineEmits(["logout"]);
  const showCard = ref(false);
  const defaultAvatar = "https://img1.baidu.com/it/u=4202135782,2291501801&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300";
  
  function goto(type: 'buy' | 'sell' | 'fav') {
    alert('跳转到“' + (type === 'buy' ? '买到的' : type === 'sell' ? '卖出的' : '收藏') + '”页面');
  }
  function onLogout() {
    emit("logout");
  }
  function saveUserInfo() {
    alert("登录信息已保存！");
  }
  </script>
  
  <style scoped>
  .user-avatar-hover {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
  }
  .nickname {
    margin-left: 8px;
    font-weight: 500;
    color: #2446a6;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-card {
    position: absolute;
    top: 42px;
    right: 0;
    width: 270px;
    background: #fff;
    box-shadow: 0 6px 36px 0 rgba(36,70,166,0.13);
    border-radius: 18px;
    z-index: 888;
    padding: 20px 20px 10px 20px;
    min-height: 180px;
    animation: fadeIn .18s;
  }
  @keyframes fadeIn {
    from { opacity:0; transform: translateY(10px);}
    to { opacity:1; transform: none;}
  }
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .avatar-big {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f6f7fb;
  }
  .nickname-row {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .nickname-big {
    font-weight: 700;
    font-size: 20px;
    color: #222;
  }
  .id {
    font-size: 13px;
    color: #999;
  }
  .card-row {
    margin: 12px 0 8px 0;
    display: flex;
    font-size: 14px;
    color: #666;
    gap: 24px;
  }
  .card-actions {
    margin: 10px 0;
    border-radius: 12px;
    background: #f7f8fa;
    padding: 8px 0;
  }
  .action-row {
    display: flex;
    justify-content: space-between;
    padding: 7px 24px;
    font-size: 15px;
    color: #2446a6;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.14s;
  }
  .action-row:hover {
    background: #eaf3ff;
  }
  .card-bottom {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    justify-content: flex-end;
  }
  .card-bottom button {
    background: #2446a6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 5px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: background .16s;
  }
  .card-bottom button:hover {
    background: #476eed;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .16s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>