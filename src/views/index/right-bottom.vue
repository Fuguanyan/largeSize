<script setup lang="ts">
import { rightBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive ,inject,ref,onBeforeUnmount} from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";
import { number } from "echarts";
const c = ref(null);
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  num:'',
  num2:'',
  axios:null,
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3,
    // step:3
  },
  scroll: true,
});
let intervalId;
const getData = () => {
  
  state.axios.post(`http://8.138.159.230/admin/openapi/bi/totalEnergy`)
      .then((res: { data: { data: { energyTotal: any; }[]; }; }) => {
        let arr =  res.data.data
        let a = []
        arr.forEach(item => {
          a.push(item.energyTotal)
        })
        state.num = a[0]
        state.num2 = a[1]

      //  setOption();
      })
      .catch((error: any) => {
        console.error(error)
      })
};

const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});

onMounted(() => {
  state.axios = inject('axios')
  getData();
  intervalId = setInterval(getData,70000); 
});
onBeforeUnmount(() => {
      clearInterval(intervalId); // 清除定时器
    });
</script>

<template>
  <div class="right_bottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }">
   <div class="lf_div">
    <div class="lf_ct">
      <div class="ct_1">
        <span>{{ state.num }}</span>
        <span>mwh</span>
      </div>
      <span style="font-family: Source Han Sans SC;font-weight: 400;font-size: 16px;color: #FFFFFF;">绿电总耗能</span>
    </div>
   </div>
   <div class="lf_div">
    <div class="lf_ct">
      <div class="ct_1">
        <span>{{state.num2}}</span>
        <span>mwh</span>
      </div>
      <span style="font-family: Source Han Sans SC;font-weight: 400;font-size: 16px;color: #FFFFFF;">市电总耗能</span>
    </div>
   </div>
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.right_bottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 252px;
  margin-top: 10px;
  display: flex;
  
  
  .lf_div {
    width: 50%;
    height: 100%;
    background-image: url('/src/assets/img/my/dz.png');
    background-size: cover;
    background-position: center center;
    .lf_ct {
      height: 100%;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding-top: 15px;
      .ct_1 {
        margin-bottom: 15px;
        span:nth-of-type(1) {
          font-family: Source Han Sans SC;
          font-weight: 800;
          font-size: 34px;
          color: #FBFBFB;
        
        }
        span:nth-of-type(2) {
          font-family: Source Han Sans SC;
          font-weight: 400;
          font-size: 16px;
          color: #FFFFFF;
          margin-left: 10px;
        }
      }
    }
  }
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
