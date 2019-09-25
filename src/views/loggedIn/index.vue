<template>
  <div class="loggedIn">
    <div class="my-top">
      <!-- 个人信息 -->
      <div class="info">
        <!-- 头像 -->
        <div class="userIcon">
          <img :src="userInfo.photo" alt="">
        </div>
        <div class="infotxt">
          <div class="name">{{userInfo.name}}</div>
          <div class="authentication">申请认证{{userInfo.certi}}</div>
        </div>
        <!-- 阅读时间 -->
        <div class="read">
          <van-icon name="todo-list-o" />
          <div class="text">
            <p>今日阅读</p>
            <p>5分钟</p>
          </div>
        </div>
      </div>
      <!-- 数据 -->
      <ul class="data">
        <li>
          <p>{{userInfo.art_count}}</p>
          <p>动态</p>
        </li>
        <li>
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
      </ul>
    </div>
    <!-- 收藏/历史/作品 -->
    <div class="collect">
      <div>
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
      <div>
        <van-icon name="underway-o" />
        <span>历史</span>
      </div>
      <div>
        <van-icon name="records" />
        <span>作品</span>
      </div>
    </div>
    <!-- 设置列表 -->
    <setupList></setupList>
  </div>
</template>

<script>
import { meInfo } from "@/api/login.js";
import setupList from "@/components/setupList.vue";
export default {
  name: "loggedIn",
  data() {
    return {
      userInfo: []
    };
  },
  async created() {
    let res = await meInfo();
    console.log(res);
    this.userInfo = res.data.data;
  },
  components: {
    setupList
  }
};
</script>

<style lang="less" scoped>
.loggedIn {
  .my-top {
    position: relative;
    width: 100%;
    height: 201px;
    background-color: #3296fa;
    .info {
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      top: 58px;
      left: 0px;
      padding-left: 20px;
      .userIcon {
        float: left;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-right: 15px;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .infotxt {
        float: left;
        .name {
          margin: 13px 0 12px 0;
          font-size: 15px;
          color: #fff;
        }
        .authentication {
          float: left;
          padding: 0 5px;
          height: 16px;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          line-height: 16px;
          color: #3296fa;
          border-radius: 8px;
          background-color: #fff;
        }
      }
      .read {
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        width: 100px;
        height: 40px;
        font-size: 12px;
        color: #fff;
        margin-top: 13px;
        border-radius: 20px 0 0 20px;
        background-color: #3880c8;
        i {
          margin-right: 7px;
          font-size: 18px;
        }
        p {
          margin: 2px 0;
        }
      }
    }
    .data {
      width: 100%;
      position: absolute;
      bottom: 16px;
      display: flex;
      justify-content: space-around;
      li {
        p {
          font-size: 12px;
          color: #fff;
          text-align: center;
          margin: 4px 0;
        }
      }
    }
  }
  .collect {
    width: 100%;
    height: 51px;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 5px solid #f5f7f9;
    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      border-left: 1px solid #edeff3;
      &:first-child {
        border: none;
      }
      span {
        font-size: 14px;
        margin-top: 6px;
      }
      i {
        font-size: 22px;
      }
    }
  }
}
</style>