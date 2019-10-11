<template>
  <div class="profile">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="goSave"
    />

    <!--  -->
    <van-cell-group>
      <van-cell title="头像" is-link @click="photoShow = true">
        <template slot="default">
          <div>
            <img :src="Info.photo" alt />
          </div>
        </template>
      </van-cell>
      <van-cell title="姓名" :value="Info.name" is-link @click="type=1;show = true" />
      <van-cell
        title="性别"
        :value="Info.gender == 0 ? '男' : '女'"
        is-link
        @click="type = 2;show = true"
      />
      <van-cell title="生日" :value="Info.birthday" is-link @click="type = 3;show = true" />
    </van-cell-group>

    <!-- 弹出层 -->
    <van-popup class="popup" v-model="show" position="bottom" :style="{ height: '20%' }">
      <!-- 姓名 -->
      <van-field v-if="type == 1" class="field" v-model="Info.name" />
      <!-- 性别 -->
      <van-picker
        class="picker"
        v-else-if="type == 2"
        :columns="['男','女']"
        :default-index="Info.gender"
        @change="onChange"
      />
      <!-- 年月日 -->
      <van-datetime-picker
        class="datetime"
        v-else
        v-model="currentDate"
        type="date"
        @change="goshijian"
      />
    </van-popup>
    <!-- 头像弹出层 -->
    <van-popup v-model="photoShow" style="width:70%;">
      <van-cell is-link>
        <template slot="title">
          <div class="filebox">
            <span>从相册中选择</span>
            <input type="file" class="file" ref="file" @change="goPhoto" />
          </div>
        </template>
      </van-cell>
      <van-cell title="拍照" is-link />
      <van-cell title="取消" is-link />
    </van-popup>
  </div>
</template>

<script>
import { detailedInfo, setProfile, setPhoto } from "@/api/user.js";
import dayjs from "dayjs";

import { ImagePreview, Dialog } from "vant";

export default {
  name: "profile",
  data() {
    return {
      // 头像弹出层
      photoShow: false,
      // 弹出层
      show: false,
      // 用户信息
      Info: {},
      // 显示哪个弹出层
      type: 1,
      currentDate: ""
    };
  },
  methods: {
    // 性别值改变事件
    onChange(picker, val, index) {
      // console.log(picker, val, index);
      this.Info.gender = index;
    },
    // 生日时间值改变事件
    goshijian() {
      this.Info.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
    },
    // 保存
    async goSave() {
      let res = await setProfile(this.Info);
      // console.log(res);
    },
    // 头像保存
    goPhoto() {
      let read = new FileReader();
      read.readAsDataURL(this.$refs.file.files[0]);
      read.onload = () => {
        // console.log(read.result);
        ImagePreview({
          images: [read.result],
          onClose: () => {
            Dialog.confirm({
              title: "提示",
              message: "是否将此图片保存为头像?"
            })
              .then(async () => {
                // on confirm
                this.Info.photo = read.result;
                let res = await setPhoto(this.$refs.file.files[0]);
                // console.log(res);
                this.photoShow = false;
              })
              .catch(() => {
                // on cancel
                this.$refs.file.value = "";
              });
          }
        });
      };
    }
  },
  async created() {
    let res = await detailedInfo();
    console.log(res);
    this.Info = res.data.data;
    this.currentDate = new Date(this.Info.birthday);
  }
};
</script>

<style lang="less" scoped>
.profile {
  margin-top: 46px;
  img {
    width: 25px;
    height: 25px;
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #3296fa;
    .van-icon,
    .van-nav-bar__text,
    .van-nav-bar__title {
      color: white;
    }
  }
  // 弹出层
  .popup {
    display: flex;
    align-items: center;
    .field {
      border: 1px solid #eee;
    }
    .picker {
      width: 100%;
    }
    .datetime {
      width: 100%;
    }
  }
  // 头像弹出层
  .filebox {
    width: 110%;
    position: relative;
    .file {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>