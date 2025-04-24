<template>
  <nav class="easycampus-category-nav">
    <ul class="category-list">
      <li class="category-item">
        <span class="icon"><i class="i-campus-mobile"></i></span>
        手机 / 数码 / 电脑
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-clothes"></i></span>
        服饰 / 箱包 / 运动
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-coupon"></i></span>
        技能 / 卡券 / 潮玩
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-baby"></i></span>
        母婴 / 美妆 / 个护
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-home"></i></span>
        家具 / 家电 / 家装
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-toy"></i></span>
        文玩 / 珠宝 / 礼品
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-food"></i></span>
        食品 / 宠物 / 花卉
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-book"></i></span>
        图书 / 游戏 / 音像
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-car"></i></span>
        汽车 / 电动车 / 租房
      </li>
      <li class="category-item">
        <span class="icon"><i class="i-campus-metal"></i></span>
        五金 / 设备 / 农牧
      </li>
    </ul>
  </nav>
</template>

<script >
// 图标可替换为项目实际SVG组件或iconfont
export default{

};
</script>

<style scoped>
.easycampus-category-nav {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 2px 8px 0 rgba(36,70,166,0.04);
  padding: 18px 0 18px 0;
  width: 330px;
  min-width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 26px 0 26px 32px;
  box-sizing: border-box;
}

.category-list {
  list-style: none;
  margin: 0;
  padding: 0 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-item {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #333;
  padding: 7px 0 7px 0;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
  user-select: none;
}
.category-item:hover {
  background: #eaf3ff;
  color: #2446a6;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 22px;
  width: 26px;
  height: 26px;
}
.i-campus-mobile::before { content: "📱"; }
.i-campus-clothes::before { content: "👚"; }
.i-campus-coupon::before { content: "🎫"; }
.i-campus-baby::before { content: "🍼"; }
.i-campus-home::before { content: "🏠"; }
.i-campus-toy::before { content: "💎"; }
.i-campus-food::before { content: "🍔"; }
.i-campus-book::before { content: "📚"; }
.i-campus-car::before { content: "🚗"; }
.i-campus-metal::before { content: "🔧"; }

/* 可替换为SVG图标或iconfont */
</style>