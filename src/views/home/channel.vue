<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
    <!-- iconX -->
    <van-row>
      <van-col span="8">
        <van-icon name="cross" @click="$emit('change-show', false);" style="font-size: 16px;" />
      </van-col>
    </van-row>
    <!-- 我的频道+编辑按钮 -->
    <van-row>
      <van-col span="12" style="font-size:16px;">我的频道</van-col>
      <van-col span="12" style="text-align: right;">
        <van-button type="warning" size="mini" round plain @click="goEdit">{{isEdit ? "完成" : "编辑" }}</van-button>
      </van-col>
    </van-row>
    <!-- 我的频道按钮 -->
    <van-row gutter="10">
      <van-col span="6" v-for="(item, i) in currentChannel">
        <van-button
          class="my-button"
          :class="{'checked': activeNum == i}"
          color="#f4f5f6"
          size="large"
          @click="$emit('update:activeNum', i)"
        >
          {{item.name}}
          <van-icon name="clear" v-show="isEdit && i != 0" @click.stop="removeIcon(i)" />
        </van-button>
      </van-col>
    </van-row>
    <!-- 频道推荐 -->
    <van-row>
      <van-col span="12" style="font-size:16px;">频道推荐</van-col>
    </van-row>
    <!-- 频道推荐的按钮 -->
    <van-row gutter="10">
      <van-col span="6" v-for="(item, i) in recommendList">
        <van-button class="my-button2" color="#f4f5f6" size="large" :disabled="!isEdit">
          {{item.name}}
          <van-icon name="add" v-show="isEdit" @click="addIcon(item)" />
        </van-button>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
import { channelAll, getChannel, editChannel } from "@/api/channel.js";
import { setChannel } from "@/utils/storage/";
export default {
  name:"channelSon",
  data() { 
    return {
      // 所有频道列表
      allChannel: [],
      // 是否编辑状态
      isEdit: false
    };
  },
  // 是否显示弹出层,当前tab栏下标,当前频道列表
  props: ["show", "activeNum", "currentChannel"],
  model: {
    prop: "show",
    event: "change-show"
  },
  methods: {
    // 移除频道
    removeIcon(i) {
      this.currentChannel.splice(i, 1);
    },
    // 添加频道
    addIcon(item) {
      this.currentChannel.push(item);
    },
    // 编辑/完成
    async goEdit() {
      if (this.isEdit) {
        if (this.$store.state.userInfo) {
          let arr = this.currentChannel.slice(1).map((item, index) => {
            return {
              id: item.id,
              seq: index + 1
            };
          });
          let res = await editChannel(arr);
          console.log(res);
        } else {
          setChannel(this.currentChannel);
        }
      }
      this.isEdit = !this.isEdit;
    }
  },
  async created() {
    // 获取所有频道
    let resAll = await channelAll();
    this.allChannel = resAll.data.data.channels;
    // console.log(resAll);
  },
  computed: {
    // 频道推荐列表
    recommendList() {
      let ids = this.currentChannel.map(item => item.id);
      return this.allChannel.filter(item => !ids.includes(item.id));
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  box-sizing: border-box;
  padding: 15px;
  .van-row {
    margin-bottom: 20px;
    .van-col {
      margin-bottom: 10px;
      .my-button {
        position: relative;
        &.checked {
          .van-button__text {
            color: orangered;
          }
        }
        .van-icon {
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
      .my-button2 {
        position: relative;
        .van-icon {
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
      .van-button__text {
        font-size: 15px;
        color: black;
      }
    }
  }
}
</style>