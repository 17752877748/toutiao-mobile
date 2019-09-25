<template>
  <!-- // 设置列表 -->
  <div class="setupList">
    <!-- 消息通知/实名认证 -->
    <div class="notice-authen">
      <!-- 通知 -->
      <div class="notice">
        <span>消息通知</span>
        <van-icon name="arrow" />
      </div>
      <!-- 认证 -->
      <div class="authentication">
        <span>实名认证</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 反馈,小智,系统设置 -->
    <div class="setups">
      <div class="feedback">
        <span>用户反馈</span>
        <van-icon name="arrow" />
      </div>
      <div class="xz-classmate">
        <span>小智同学</span>
        <van-icon name="arrow" />
      </div>
      <div class="system">
        <span>系统设置</span>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setupList"
};
</script>

<style lang="less" scoped>
.setupList {
  margin-bottom: 52px;
  .notice-authen,
  .setups {
    padding-left: 23px;
    border-bottom: 5px solid #f5f7f9;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 51px;
      padding-right: 15px;
      font-size: 15px;
      border-bottom: 1px solid #edeff3;
    }
    .authentication,
    .system {
      border: 0;
    }
  }
}
</style>