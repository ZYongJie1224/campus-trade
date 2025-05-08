<template>
    <div class="sidebar-buttons">
      <div class="sidebar-btn" @click="onPost">
        <span class="icon">＋</span>
        <span class="label">发闲置</span>
      </div>
      <div class="sidebar-btn" @click="onMessage">
        <span class="icon">💬</span>
        <span class="label">消息</span>
      </div>
      <!-- <div class="sidebar-btn" @click="onApp">
        <span class="icon">📱</span>
        <span class="label">APP</span>
      </div> -->
      <div class="sidebar-btn" @click="onFeedback">
        <span class="icon">⟳</span>
        <span class="label">反馈</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import router from "@/router";

  function onPost() {
    // 跳转到发闲置页面
    // alert('发闲置');

    // 可以用router.push('/post') 或弹窗
    router.push({ name: "PostProduct"});
  }
  function onMessage() {
    alert('消息');
  }
  function onApp() {
    alert('APP');
  }
  function onFeedback() {
    alert('反馈');
  }
  </script>
  
  <style scoped>
  .sidebar-buttons {
    position: fixed;
    top: 30%;
    right: 32px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(255,255,255,0.95);
    padding: 16px 8px;
    border-radius: 30px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.09);
  }
  .sidebar-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s;
    padding: 8px 12px;
    border-radius: 8px;
  }
  .sidebar-btn:hover {
    background: #ffe600;
  }
  .icon {
    font-size: 24px;
    margin-bottom: 4px;
  }
  .label {
    font-size: 14px;
    color: #222;
    letter-spacing: 2px;
  }
  </style>