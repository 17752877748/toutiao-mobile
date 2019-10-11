<template>
  <van-cell>
    <template slot="title">
      <div class="comment-part">
        <!-- 头像 -->
        <div>
          <img :src="item.aut_photo" alt />
        </div>
        <!-- 中间cell -->
        <van-cell>
          <template slot="title">
            <div>{{item.aut_name}}</div>
            <div>{{item.content}}</div>
            <div>
              <span style="margin-right: 10px;">{{item.pubdate | relvTime}}</span>
              <span @click="goReply">回复({{item.reply_count}})</span>
            </div>
          </template>
        </van-cell>
        <!-- 右边button -->
        <div class="zan" @click="goZan">
          <van-icon
            :class="{icon:true, iszan: item.is_liking}"
            :name="item.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span>{{item.like_count}}</span>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
// 导入对评论的点赞和取消点赞
import { cmtZan, cancelCmtZan } from "@/api/comment.js";
export default {
  props: ["item"],
  methods: {
    // 给父组件传值,弹出层为true,和当前评论的数据
    goReply() {
      this.$emit("reply", {
        replyShow: true,
        item: this.item
      });
    },
    // 对评论点赞或取消点赞
    async goZan() {
      // 判断是否点赞了
      if (this.item.is_liking) {
        // console.log("点赞了");
        let res = await cancelCmtZan(this.item.com_id);
        this.item.like_count--;
        this.item.is_liking = false;
      } else {
        // console.log("没点赞");
        let res = await cmtZan(this.item.com_id);
        this.item.like_count++;
        this.item.is_liking = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comment-part {
  display: flex;
  align-items: center;
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  .zan {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 16px;
      margin-right: 5px;
    }
    .iszan::before {
      color: red;
    }
  }
}
</style>