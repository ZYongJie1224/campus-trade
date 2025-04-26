<template>
    <div class="product-detail">
      <!-- 顶部横幅 -->
      <Search />
  
      <!-- 主内容区域 -->
      <main class="main-content">
        <!-- 左：卖家信息和图片/视频区 -->
        <aside class="media-list">
          <div
            v-for="(img, idx) in images"
            :key="idx"
            class="thumb"
            :class="{active: idx === currentImage}"
            @click="currentImage = idx"
          >
            <img :src="img" />
          </div>
        </aside>
  
        <!-- 中：大图或视频 -->
        <section class="media-viewer">
          <video
            v-if="isVideo(currentImage)"
            controls
            :src="videos[0]"
            class="main-media"
          ></video>
          <img
            v-else
            :src="images[currentImage]"
            class="main-media"
          />
        </section>
  
        <!-- 右：商品信息 -->
        <aside class="product-info">
          <div class="price">
            <span class="price-main">¥35</span>
            <span class="price-tip">闲鱼币抵1.75元</span>
          </div>
          <div class="views">
            132人想要 | 2784浏览
          </div>
          <div class="desc">
            皮皮虾这个季节开始上膘了，熟发 包肥！需要的来感兴趣的话“我想要”和我私聊吧~
          </div>
          <div class="actions">
            <button class="wanna">我想要</button>
            <button class="buy">立即购买</button>
            <button class="fav">收藏</button>
          </div>
        </aside>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Search from '@/components/Search.vue'
  
  const images = [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg'
  ]
  const videos = [
    'https://example.com/video.mp4'
  ]
  // 默认选中第一个图片
  const currentImage = ref(0)
  
  function isVideo(idx) {
    // 假设第一个是视频，后面是图片
    return idx === 0 && videos.length > 0
  }
  </script>
  
  <style scoped>
  .product-detail {
    background: #f9fafb;
    min-height: 100vh;
    font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  }
  .header {
    background: #ffe600;
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: 70px;
    font-size: 24px;
    font-weight: bold;
  }
  .logo { font-size: 40px; letter-spacing: 2px; font-family: '黑体', Arial; }
  .search-bar {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .search-bar input {
    width: 300px;
    height: 36px;
    border-radius: 18px;
    border: none;
    padding: 0 16px;
    margin-right: 8px;
  }
  .search-bar button {
    height: 36px;
    border-radius: 18px;
    border: none;
    background: #000;
    color: #fff;
    padding: 0 16px;
    font-size: 16px;
  }
  .user-menu {
    min-width: 100px;
    text-align: right;
    font-size: 18px;
  }
  .main-content {
    display: flex;
    margin: 32px auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px #eee;
    width: 1400px;
    min-height: 600px;
    padding: 32px;
  }
  .media-list {
    width: 100px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-right: 32px;
  }
  .thumb {
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    width: 80px;
    height: 80px;
    background: #f4f4f4;
  }
  .thumb.active {
    border-color: #ffe600;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .media-viewer {
    flex: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-media {
    width: 400px;
    height: 500px;
    object-fit: cover;
    border-radius: 12px;
    background: #eee;
  }
  .product-info {
    flex: 1;
    margin-left: 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-width: 350px;
  }
  .price {
    font-size: 32px;
    font-weight: bold;
    color: #f60;
    display: flex;
    align-items: baseline;
    gap: 16px;
  }
  .price-tip {
    background: #ffe6a0;
    color: #ff4c00;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 6px;
  }
  .views {
    color: #999;
    margin: 12px 0;
  }
  .desc {
    font-size: 18px;
    color: #333;
    margin: 16px 0 24px 0;
  }
  .actions {
    display: flex;
    gap: 12px;
    margin-top: 12px;
  }
  .actions button {
    border: none;
    border-radius: 22px;
    padding: 12px 32px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.1s;
  }
  .actions .wanna {
    background: #ffe600;
    color: #222;
  }
  .actions .buy {
    background: #333;
    color: #fff;
  }
  .actions .fav {
    background: #fff;
    color: #333;
    border: 1px solid #eee;
  }
  </style>