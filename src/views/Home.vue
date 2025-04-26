<template>
  <div class="home">
    <!-- 使用 Search 组件 -->
    <Search />
    <!-- <div class="nav">
      <div class="nav-list">
          <el-carousel height="200px" motion-blur class="images">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
      </div>
    </div> -->
    <EasyCampusNavBar />
    <ShowcaseLayout />
    <div
  v-loading="loading"
  infinite-scroll-immediate="true"
  v-infinite-scroll="loadMore"
  infinite-scroll-delay="1000"
  :infinite-scroll-disabled="loading || !hasMore"
  :infinite-scroll-distance="50"
  class="goods-list"
>
  <ProductCard v-for="(good, index) in goods" :key="index"  />
</div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script lang="ts" setup>
const goods = reactive<ProductDetailVO[]>([]);
let goodsCount = 0;

const loading = ref(false);
const hasMore = ref(true);
const page = ref(1); // 分页页码

// 逻辑部分
const loadMore = async () => {
  if (loading.value || !hasMore.value) return; // 防御
  loading.value = true;
  try {
    const res = await getGoods(page.value);
    if (res.data.length === 0) {
      hasMore.value = false;
      return;
    }
    goods.push(...res.data);
    page.value++;
  } catch (e) {
    // 请求失败时，停止加载，并可选弹窗提示
    hasMore.value = false;
    // 你可以加上 ElMessage.error('加载失败，请稍后重试');
    ElMessage.error('加载失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};


</script>


<script lang="ts">
// 引入 Search 组件
import { getGoods } from "@/api/modules/goods/goods";
import ProductCard from "@/components/Product/ProductCard/ProductCard.vue"
import Search from "@/components/Search.vue";
import EasyCampusNavBar from "@/components/Nav/EasyCampusNavBar.vue"
import EasyCampusCategoryNav from "@/components//Nav/EasyCampusCategoryNav.vue"
import ShowcaseLayout from "@/components/Nav/ShowcaseLayout.vue"
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  components: {
    Search, // 注册 Search 组件
    ProductCard,
    EasyCampusNavBar,
  },

};


</script>

<style>
.home {
  height: auto;
  /* overflow: auto; */
  width: 100%;
  min-width: 1296px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 水平居中子元素 */
  background-color: #f5f5f5;
  /* 添加背景色 */
}
.images{
  height: 350px;
  width: 1396px;
}
.nav {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* 垂直居中 */
  padding-top: 20px;
  height: 350px;
  width: 1396px;
  background-color: #ffffff;
  /* 添加背景色 */
  min-width: 1396px;
  margin: 20px auto;
  /* 水平居中，并添加间距 */
  border-radius: 12px;
  /* 边框圆角 */
  padding: 20px;
  margin-top: 20px;
  /* 添加间距 */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* 边框阴影 */
}

.goods-list {
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  display: flex;
  /* justify-content: center; */
  /* overflow: auto; */
  width: 1369px;
  padding: 20px;
  background-color: #ffffff;
  /* 添加背景色 */
  min-width: 1396px;
  border-radius: 12px;
  /* 边框圆角 */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* 边框阴影 */
  /* margin-top: 20px; 添加间距 */
}
</style>