<template>
  <van-cell class="bottom-comment">
    <template slot="title">
      <div class="comment-box">
        <van-cell-group class="inpt">
          <van-field
            v-model="msg"
            placeholder="写评论"
            style="background-color: #eee; border-radius: 20px;"
            left-icon="edit"
          />
        </van-cell-group>
        <van-button type="danger" size="small" @click="goSend">发送</van-button>
        <van-icon name="star-o" />
      </div>
    </template>
  </van-cell>
</template>

<script>
// 导入发布评论接口
import { addComment } from "@/api/comment.js";
export default {
  props: ["detailObj", "cmtList", "isReply", "currentItem", "replyList"],
  data() {
    return {
      // 绑定发布评论的input
      msg: ""
    };
  },
  methods: {
    // 发布评论
    async goSend() {
      // 判断是否登录,未登录打回登录
      if (this.$login()) {
        // 判断是否为空,为空return
        if (this.msg.trim() == "") return;
        // 判断是评论文章还是评论回复
        if (this.isReply) {
          let res = await addComment({
            // 当前评论id
            target: this.currentItem.com_id.toString(),
            // 评论内容
            content: this.msg,
            // 当前文章id
            art_id: this.detailObj.art_id
          });
          //   console.log(res);
          this.replyList.unshift(res.data.data.new_obj);
          this.currentItem.reply_count++;
          this.msg = "";
        } else {
          let res = await addComment({
            // 当前文章id
            target: this.detailObj.art_id,
            // 评论内容
            content: this.msg
          });
          //   console.log(res);
          this.cmtList.unshift(res.data.data.new_obj);
          this.msg = "";
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 评论
.bottom-comment {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  .comment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inpt {
    display: flex;
    flex: 1;
  }
  .van-button {
    margin: 0 10px;
  }
}
</style>