<template>
  <div class="notLogged">
    <!-- 顶部未登录 -->
    <div class="my-top">
      <div class="headPic">
        <van-icon name="graphic" />
      </div>
    </div>
    <!-- 收藏/历史 -->
    <div class="collect">
      <div class="left-box">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div class="right-box">
        <van-icon name="underway-o" />
        <span>历史</span>
      </div>
    </div>
    <!-- 设置列表 -->
    <setupList></setupList>
  </div>
</template>

<script>
import setupList from "@/components/setupList.vue";
import { getStorage } from "@/utils/storage/";
import { meInfo } from "@/api/login.js";
export default {
  components: {
    setupList
  },
  async created() {
    let data = await getStorage();
    // console.log(data);
    if (data.token !== "") {
      this.$router.push("/loggedIn");
    }
  }
};
</script>

<style lang="less" scoped>
.notLogged {
  .my-top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 201px;
    background-color: #3296fa;
    .headPic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background-color: #fff;
      i {
        font-size: 34px;
        color: blue;
      }
    }
  }
  .collect {
    width: 100%;
    height: 51px;
    padding: 10px 0;
    border-bottom: 5px solid #f5f7f9;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 49.85%;
      height: 100%;
      span {
        font-size: 14px;
        margin-top: 6px;
      }
      .van-icon {
        font-size: 22px;
      }
    }
    .left-box {
      float: left;
    }
    .right-box {
      float: left;
      border-left: 1px solid #edeff3;
    }
  }
}
</style>