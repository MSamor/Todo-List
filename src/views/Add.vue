<template>
  <transition appear enter-active-class="animate__animated animate__fadeInBottomRight">
    <div class="box">
      <van-nav-bar
        title="添加"
        left-text="返回"
        left-arrow
        :fixed="true"
        :placeholder="true"
        @click-left="onClickLeft"
      />
      <div class="form">
        <van-form>
          <transition-group>
            <input type="title" v-model="title" class="title" :key="1" placeholder="任务标题" />
            <input type="text" v-model="message" class="cont" :key="2" placeholder="主要内容" />
            <van-field
              :key="3"
              readonly
              clickable
              name="datetimePicker"
              :value="time"
              label="时间选择"
              placeholder="点击选择时间"
              @click="showPicker = true"
              class="picker"
            />
          </transition-group>
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="month-day"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <!-- <transition appear enter-active-class="animate__animated animate__bounceInUp"> -->
          <div style="margin: 16px;">
            <van-button round block type="info" class="btn" @click="add">提交</van-button>
          </div>
          <!-- </transition> -->
        </van-form>
      </div>
    </div>
  </transition>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      title: "",
      time: "",
      showPicker: false,
      message: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    };
  },
  methods: {
    add() {
      //判断是否为空
      if (this.title == "" || (this.time == "" && this.message == "")) {
        Dialog.alert({
          message: "请输入完整内容！",
          title:"提示"
        })
        return;
      }

      var tempList = [];
      var tempData = {
        title: "",
        time: "",
        message: "",
        color: "#FFFAF0"
      };
      tempData.title = this.title;
      tempData.time = this.time;
      tempData.message = this.message;
      tempList = JSON.parse(window.localStorage.getItem("cardsData"));
      console.log(tempList);
      if (tempList == null) {
        tempList = [];
      }
      tempList.push(tempData);
      window.localStorage.setItem("cardsData", JSON.stringify(tempList));
      Dialog.alert({
          message: "添加成功",
          title:"提示"
        })
      this.title = '',
      this.message = '',
      this.time = ''
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(time) {
      var myDate = new Date(time);
      this.time = `${myDate.getFullYear()}.${myDate.getMonth() +
        1}.${myDate.getDate()}`;
      this.showPicker = false;
    },
    formatter(type, val) {
      if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>
<style lang="less">
.box {
  height: calc(100% -46px);
  width: 100%;
  .form {
    width: 100%;
    .title {
      display: block;
      width: 90%;
      margin: 0 auto;
      height: 3rem;
      border: 0;
      font-size: 1.5rem;
      border: 2px solid pink;
      border-radius: 0.5rem;
      margin-top: 3rem;
      color: rgb(0, 0, 0);
      background-color: pink;
      box-shadow: 0 0 10px pink;
      text-align: center;
      &::-webkit-input-placeholder {
        color: rgb(255, 242, 244);
      }
    }
    .cont {
      text-align: center;
      display: block;
      width: 90%;
      margin: 0 auto;
      height: 18rem;
      border: 0;
      font-size: 1.5rem;
      border: 2px solid pink;
      border-radius: 0.5rem;
      margin-top: 1rem;
      color: powderblue;
      color: rgb(0, 0, 0);
      background-color: pink;
      box-shadow: 0 0 10px pink;
      &::-webkit-input-placeholder {
        color: rgb(255, 242, 244);
      }
    }
    .picker {
      margin-top: 3rem;
    }
    .btn {
      //   position: absolute;
      //   bottom: 1rem;
      width: 80%;
      left: 0;
      right: 0;
      margin: 2rem auto;
    }
  }
}
</style>