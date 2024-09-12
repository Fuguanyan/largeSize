<script setup lang="ts">
import { reactive,ref } from "vue";
import dayjs from 'dayjs';
import type {DateDataType} from "./index.d"
import {useSettingStore} from "@/stores/index"
let arr = reactive(['近一周','近一个月','近一季度','近半年','近一年'])
let itemIn = ref(0)
const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing:null,
  time:null
});
const addItem = (e: number) => {
  itemIn.value = e
}
const { setSettingShow} =useSettingStore()
const weekday= ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD");
    dateData.time = dayjs().format("HH:mm:ss");
    // dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};
timeFn()

</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing">
      <div class="zuo_div" :class="{'div-active': itemIn === index }" @click="addItem(index)"  v-for="(item,index) in arr" :key="index">{{ item }}</div>
    </div>
   
    <div class="d-flex jc-center">
      <div class="title">
        <span class="title-text">GHG小谷换电站控制平台</span>
      </div>
    </div>
    <div class="timers">
      <div class="lt_time">{{ dateData.time }}</div>
      <div class="rt_time">
        <span> {{ dateData.dateWeek }}</span>
        <span> {{ dateData.dateDay }}</span>
      </div>
     

      <div class="setting_icon"   @click="setSettingShow(true)">
          <img src="@/assets/img/headers/setting.png" alt="设置">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  // height: 60px;
  // background-image: url("../assets/img/top.png");
  // background-size: cover;
  // background-position: center center;
  // position: relative;
  cursor: pointer;
  margin-bottom: 4px;

  // border: 1px solid red;
  // .guang {
  //   position: absolute;
  //   bottom: -26px;
  //   background-image: url("../assets/img/guang.png");
  //   background-position: 80px center;
  //   width: 100%;
  //   height: 56px;
  // }

  .zuojuxing{
   z-index: 9999;
    display: flex;
    position: absolute;
    top: 35px;
    left: 3%;
    height: 50px;
    line-height: 50px;
    // border: 1px solid red;
    
    .zuo_div {
      margin-right: 35px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      font-size: 16px;
      color: rgba(141, 191, 255, .3);
      text-shadow: 9px 18px 69px rgba(0,0,0,0.17);
      font-style: italic;
      background: linear-gradient(0deg, #FFFFFF 0%);
      // opacity: 0.5;
      -webkit-background-clip: text;
      position: relative;
      // -webkit-text-fill-color: transparent;
      &.div-active {
        font-family: Source Han Sans SC;
        font-weight: 500 !important;
        font-size: 16px !important;
        color: #CDDAFF !important;
        
      }
      &.div-active::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 26px;
        height: 4px;
        background-color: #3168FF;
        border-radius: 2px;
    }
    }
    
  }

  

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .timers {
    position: absolute;
    right: 5px;
    top: 40px;
    font-size: 18px;
    display: flex;
    align-items: center;
    .lt_time {
      font-family: AlibabaPuHuiTiB;
      font-weight: 400;
      font-size: 35px;
      color: #FFFFFF;
      line-height: 38px;
      background: linear-gradient(0deg, #EBF2FF 0%, #B4C1D9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .rt_time {
      margin-left: 10px;
      span {
        font-family: AlibabaPuHuiTiR;
      font-weight: 400;
      font-size: 13px;
      color: #8FA0C0;
      }
      display: flex;
      flex-direction: column;
     
    }
    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  // color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-family: AlibabaPuHuiTiB;
      font-weight: 600;
      font-size: 35px;
      color: #FFFFFF;
      line-height: 38px;
      background: linear-gradient(0deg, #EBF2FF 0%, #B4C1D9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
}
</style>
