<template>
  <nav class="easycampus-nav-bar">
    <ul class="nav-list">
      <li
        v-for="item in navList"
        :key="item.navId"
        class="nav-item"
        :class="{ active: item.navRoute === activeRoute }"
        @click="handleNavClick(item)"
      >
        {{ item.navName }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetchMainNavigation } from '@/api/modules/nav/navigation';
const navList = ref([]);
const router = useRouter();
const route = useRoute();
const activeRoute = ref(route.path);

const handleNavClick = (item) => {
  activeRoute.value = item.navRoute;
  if (item.navRoute && item.navRoute !== route.path) {
    router.push(item.navRoute);
  }
};

onMounted(async () => {
  try {
    const { data } = await fetchMainNavigation();
    navList.value = data.data;
    console.log(data.data)
  } catch (e) {
    // 失败可提示，也可用默认
    navList.value = [
      { navId: 1, navName: "首页", navRoute: "/" },
      { navId: 2, navName: "发现", navRoute: "/explore" },
      { navId: 3, navName: "活动", navRoute: "/activity" },
      { navId: 4, navName: "校园服务", navRoute: "/service" },
      { navId: 5, navName: "社团", navRoute: "/club" },
      { navId: 6, navName: "论坛", navRoute: "/forum" },
      { navId: 7, navName: "关于", navRoute: "/about" }
    ];
  }
});
</script>

<style scoped>
.easycampus-nav-bar {
  width: 100vw;
  background: #eaf3ff;
  display: flex;
  justify-content: center;
  border-bottom: 1.5px solid #c8daf7;
  box-sizing: border-box;
  border-radius: 0 0 16px 16px;
  min-width: 1000px;
}

.nav-list {
  display: flex;
  gap: 38px;
  list-style: none;
  margin: 0;
  padding: 0 0 2px 0;
  height: 54px;
  align-items: center;
}

.nav-item {
  color: #2446a6;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 24px;
  border-radius: 22px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  letter-spacing: 1px;
  user-select: none;
}

.nav-item:hover,
.nav-item.active {
  background: #2446a6;
  color: #fff;
}
</style>