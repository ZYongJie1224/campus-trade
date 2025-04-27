<template>
  <el-card
    class="good-card"
    shadow="hover"
    style="border-radius: 25px; border: 0px"
  >
    <el-image
      class="good-img"
      :src="productMainImg || require('@/assets/logo.png')"
      alt=""
    ></el-image>
    <div class="good-content">
      <div class="title">
        <el-text class="good-title" truncated line-clamp="2">
          <el-image
            class="is-home"
            :src="productMainImg || require('@/assets/logo.png')"
          ></el-image>
          {{ productTitle }}
        </el-text>
      </div>
      <div class="tags">{{ categoryName }}</div>
      <div class="good-price">
        <span class="mark">¥</span>
        <span class="price">{{ productPrice }}</span>
        <span class="want">{{ wants }}人想要</span>
      </div>
      <div class="upload-user">
        <el-avatar shape="circle" size="small" :src="avatarUrl"></el-avatar>
        <span class="user-name">{{ nickname }}</span>
        <el-tag class="is-q" type="success" v-if="isVerified == 1">已认证用户</el-tag>
        <el-tag class="is-q" type="primary" v-else>普通用户</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ProductDetailVO } from './config';

const props = defineProps<ProductDetailVO>()
</script>
<style>
.is-q {
  margin-right: 15px;
  margin-left: auto;
  text-align: right;
  color: #1f1f1f;
  font-size: 15px;
  padding: 3px 0 0 5px;
}
.user-name {
  color: #1f1f1f;
  font-size: 15px;
  padding: 3px 0 0 5px;
}
.upload-user {
  display: flex;
  padding: 5px 0 0 5px;
}
.want {
  font-size: 10px;
  padding: 0 0 0 10px;
}
.price {
  color: #ff4f24;
  font-size: 30px;
  font-weight: bold;
  padding: 0 0 0 5px;
}
.mark {
  color: #ff4f24;
  font-size: 20px;
  font-weight: bold;
}
.good-price {
  text-align: left;
  padding: 15px 0px 0px 5px;
}
.tags {
  text-align: left;
  color: #606266;
  padding: 5px 0px 0px 5px;
}
.is-home {
  height: 20px;
  width: 40px;
}
.el-text {
  text-overflow: ellipsis !important;
  font-size: 20px !important;
  font-weight: 500 !important;
  color: #1f1f1f;
  /* display: inline-block !important; */
  white-space: pre-wrap !important;
  /* height: 100px !important; */
  word-wrap: break-word !important;
}
.good-title {
  /* height: 100px !important; */
  /* min-height: 100px; */
  text-align: left;
  /* display: inline-block; */
  width: 240px;
  padding: 5px 0px 5px 5px !important;
  /* white-space: normal; */
}
.good-card {
  display: flex;
  margin: 10px;
  width: 248px;
  height: 418px;
  border-radius: 25px;
  flex-direction: column;
}
.good-img {
  padding: 0px 2px 0px 2px;
  border-radius: 25px;
  height: 240px;
  height: 240px;
}
.good-content {
  flex-direction: column;
  display: flex;
}
.title {
  text-overflow: ellipsis;
  /* height: 100px; */
  display: flex;
}
</style>