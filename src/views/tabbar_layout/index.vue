<template>
  <div>
    <router-view></router-view>
    <!-- 底部栏 -->
    <van-tabbar v-model="footerBar">
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="chat" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item name="video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item name="user" icon="manager-o" to="/notLogged">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      // 当前点击底部栏
      footerBar: "home"
    };
  }
};
</script>

<style lang="less" scoped>
.van-tabbar--fixed {
  height: 52px;
}
</style>