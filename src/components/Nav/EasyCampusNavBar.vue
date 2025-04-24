<template>
  <nav class="easycampus-nav-bar">
    <ul class="nav-list">
      <li class="nav-item active">首页</li>
      <li class="nav-item">发现</li>
      <li class="nav-item">活动</li>
      <li class="nav-item">校园服务</li>
      <li class="nav-item">社团</li>
      <li class="nav-item">论坛</li>
      <li class="nav-item">关于</li>
    </ul>
  </nav>
</template>

<script>
// 可根据实际路由和交互替换 active 状态和点击事件
export default{

};
</script>

<style scoped>
.easycampus-nav-bar {
  width: 100vw;
  background: #eaf3ff;
  display: flex;
  justify-content: center;
  border-bottom: 1.5px solid #c8daf7;
  box-sizing: border-box;
  /* 与头部圆角协调 */
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