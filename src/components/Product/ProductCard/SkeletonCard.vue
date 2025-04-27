<!-- 新增的骨架屏组件 SkeletonCard.vue -->
<template>
    <div class="good-card skeleton-card">
      <div class="good-img skeleton-anim"></div>
      <div class="good-content">
        <div class="title skeleton-line skeleton-anim"></div>
        <div class="tags skeleton-line skeleton-anim"></div>
        <div class="good-price skeleton-line skeleton-anim"></div>
        <div class="upload-user">
          <div class="skeleton-avatar skeleton-anim"></div>
          <div class="user-name skeleton-line skeleton-anim" style="width: 60px;"></div>
          <div class="is-q skeleton-line skeleton-anim" style="width: 54px;"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // 无需props
  </script>
  
  <style scoped>
  .good-card.skeleton-card {
    display: flex;
    margin: 10px;
    width: 248px;
    height: 418px;
    border-radius: 25px;
    flex-direction: column;
    background: #f3f3f3;
  }
  
  .skeleton-anim {
    background: linear-gradient(90deg, #ededed 25%, #f3f3f3 37%, #ededed 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.2s infinite linear;
  }
  
  .good-img {
    padding: 0px 2px 0px 2px;
    border-radius: 25px;
    height: 240px;
    width: 240px;
    margin-bottom: 16px;
  }
  
  .skeleton-line {
    height: 18px;
    border-radius: 8px;
    margin: 8px 0;
  }
  .title.skeleton-line {
    width: 80%;
    height: 24px;
  }
  .tags.skeleton-line,
  .good-price.skeleton-line {
    width: 60%;
    height: 16px;
  }
  
  .upload-user {
    display: flex;
    align-items: center;
    padding: 5px 0 0 5px;
    gap: 12px;
  }
  .skeleton-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e0e0e0;
  }
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  </style>