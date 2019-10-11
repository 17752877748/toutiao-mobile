<template>
  <van-cell>
    <template slot="title">
      <div class="my-author">
        <!-- 头像 -->
        <div>
          <img :src="detailObj.aut_photo" alt />
        </div>
        <!-- 中间cell -->
        <van-cell :title="detailObj.aut_name" :label="detailObj.pubdate | relvTime" />
        <!-- 右边button -->
        <van-button v-if="detailObj.is_followed" size="small" @click="goCancel(detailObj.aut_id)">取关</van-button>
        <van-button v-else size="small" type="primary" @click="goFollow(detailObj.aut_id)">关注</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
// 导入user相关请求
import { follow, cancelFollow } from "@/api/user.js";
export default {
  props: ["detailObj"],
  methods: {
    // 取消关注
    async goCancel(id) {
      if (this.$login()) {
        await cancelFollow(id);
        this.detailObj.is_followed = false;
      }
    },
    // 关注
    async goFollow(id) {
      if (this.$login()) {
        await follow(id);
        this.detailObj.is_followed = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-author {
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>