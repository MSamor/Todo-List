<template>
  <div id="app">
    <van-nav-bar title="备忘录" :fixed="true" :placeholder="true" @click-left="onClickLeft" />
    <div class="my-swipe">
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        @slideChangeTransitionEnd="handerAnimate"
        @slideChangeTransitionStart="handerAnimateStart"
      >
        <swiper-slide class="swiper-item" v-for="(item,index) in list" :key="index">
          <div class="cont" :style="'background-color:'+item.color">
            <transition appear enter-active-class="animate__animated animate__rotateInUpLeft">
              <p v-if="show">{{item.title}}</p>
            </transition>
            <transition appear enter-active-class="animate__animated animate__rotateInUpLeft">
              <div v-if="show" class="content">{{item.message}}</div>
            </transition>
            <transition appear enter-active-class="animate__animated animate__rotateInUpLeft">
              <div v-if="show" class="time">{{item.time}}</div>
            </transition>
            <transition appear leave-active-class="animate__animated animate__zoomOutUp">
              <van-button
                v-if="showBtn"
                class="btn"
                color="linear-gradient(to right, #FFE4E1, #F08080)"
                @click="del(index)"
              >已完成</van-button>
            </transition>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <van-button type="info" class="add" to="/add">+</van-button>
    <router-view />
  </div>
</template>
<script>
// import { Toast } from "vant";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { Dialog } from "vant";
export default {
  data() {
    return {
      showSwiperItem: true,
      showBtn: true,
      show: true,
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        effect: "coverflow",
        slidesPerView: 1,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: false
        }
      },
      list: []
    };
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem("cardsData"));
    console.log(this.list);
    if (this.list.length == 0) {
      this.list = [
        {
          title: "请添加",
          time: "",
          color: "#FFFFF0"
        }
      ];
      this.showBtn = false;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    del(e) {
      this.showBtn = false;
      setTimeout(() => {
        this.list.splice(e, 1);
        this.showBtn = true;
        window.localStorage.setItem("cardsData", JSON.stringify(this.list));
      }, 1000);
    },
    onSwipeLeft() {
      alert("huadong");
    },
    onClickLeft() {
      Dialog.confirm({
        title: "提示",
        message: "确认退出吗？"
      })
        .then(() => {
          window.open("about:blank", "_self").close();
        })
        .catch(() => {
          // on cancel
        });
    },
    handerAnimate() {
      setTimeout(() => {
        this.show = true;
      }, 0);
    },
    handerAnimateStart() {
      this.show = false;
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
};
</script>
<style lang="less">
#app {
  height: 100vh;
  .my-swipe {
    font-size: 20px;
    .swiper-item {
      height: calc(100vh - 46px);
      .cont {
        border-radius: 20px;
        margin: 1rem 2rem;
        height: calc(100vh - 6.5rem);
        overflow: hidden;
        box-shadow: 0 0 20px rgb(192, 192, 192);
        p {
          text-align: center;
          color: rgb(255, 159, 191);
        }
        .content {
          color: rgb(228, 139, 255);
          margin-left: 1rem;
          font-size: 5rem;
        }
        .time {
          position: absolute;
          font-size: 16px;
          bottom: 1rem;
          color: rgb(197, 197, 197);
          margin-left: 1rem;
        }
        .btn {
          position: absolute;
          bottom: 3rem;
          margin: auto;
          left: 0;
          right: 0;
          width: 10rem;
        }
      }
    }
  }
  .add {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    right: 5px;
    z-index: 2;
    font-size: 30px;
  }
}
</style>
