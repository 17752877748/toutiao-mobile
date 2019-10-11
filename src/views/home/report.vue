<template>
  <van-dialog
    v-model="isShow"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
    :beforeClose="beforeClose"
  >
    <van-cell-group v-show="!jubaoShow">
      <van-cell icon="location-o" title="不喜欢此文章" @click="goHide" />
      <van-cell icon="location-o" title="举报" is-link @click="jubaoShow=true" />
      <van-cell icon="location-o" title="拉黑" @click="goLaHei" />
    </van-cell-group>
    <!--  -->
    <van-cell-group v-show="jubaoShow">
      <van-cell icon="arrow-left" @click="jubaoShow=false" />
      <van-cell
        v-for="(item, i) in jubaoList"
        :key="i"
        icon="location-o"
        :title="item"
        @click="rep(i)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { articleHide, articleLaHei, repArticle } from "@/api/article.js";
export default {
  data() {
    return {
      jubaoShow: false,
      jubaoList: [
        "其他问题",
        "标题夸张",
        "低俗色情",
        "错别字多",
        "旧闻重复",
        "广告软文",
        "内容不实",
        "涉嫌违法犯罪",
        "侵权"
      ]
    };
  },
  props: ["isShow", "art_id", "aut_id", "articleList"],
  model: {
    prop: "isShow",
    event: "change"
  },
  methods: {
    // 点击遮罩层后回调函数
    beforeClose(action, done) {
      this.$emit("change", false);
    },
    // 不喜欢此文章
    async goHide() {
      let res = await articleHide(this.art_id);
      this.$emit("change", false);
      this.articleList.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          this.articleList.splice(index, 1);
          return;
        }
      });
      //   console.log(res);
    },
    // 拉黑
    async goLaHei() {
      try {
        let res = await articleLaHei(this.aut_id);
        for (var i = 0; i < this.articleList.length; i++) {
          if (this.articleList[i].aut_id == this.aut_id) {
            this.articleList.splice(i, 1);
            i--;
          }
        }
        this.$emit("change", false);
      } catch (error) {
        if (error.response.status == 400) {
          this.$toast.fail("你脑子what了？");
          this.$emit("change", false);
        }
      }
    },
    // 举报
    async rep(i) {
      try {
        let res = await repArticle({ target: this.art_id, type: i });
        this.articleList.forEach((item, index) => {
          if (item.art_id == this.art_id) {
            this.articleList.splice(index, 1);
            return;
          }
        });
        this.$toast("举报成功,感谢您的反馈");
        this.$emit("change", false);
      } catch (error) {
        if (error.response.status == 401) {
          this.$notify("请先登录");
          this.$router.push("/login");
        }
        if (error.response.status == 409) {
          this.$notify("此文章已被举报");
        }
      }
      this.jubaoShow = false;
    }
  }
};
</script>

<style>
</style>