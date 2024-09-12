<script setup lang="ts">
import { leftBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive,inject } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 1,
  },
  scroll: true,
});
const listArr = reactive(['站点名称','换电','充电','故障','调度车次'])
const getData = () => {
  const axios = inject('axios')
    axios.post(`http://8.138.159.230/admin/openapi/bi/dailyDynamicMonitoring`)
      .then(res => {
       let arr = res.data.data
       let arr3 = []
       arr.forEach(item => {
        item.deviceId = "6c512d754bbcd6d7cd86abce0e0cac58"
       
       })
       let arr2 = arr
       arr3 = [...arr,...arr2]
       state.list = arr3
      })
      .catch(error => {
        console.error(error)
      })
};

const addressHandle = (item: any) => {
  let name = item.provinceName;
  if (item.cityName) {
    name += "/" + item.cityName;
    if (item.countyName) {
      name += "/" + item.countyName;
    }
  }
  return name;
};
const comName = computed(() => {
  if (indexConfig.value.leftBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
onMounted(() => {
  getData();
});
</script>

<template>
   <div class="tab_list"> <div class="tab_item" v-for="item in listArr" :key="item">{{ item }}</div></div>
  <div class="left_boottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }">
   
   
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
    <div class="tab_content">
      <div class="con_item" v-for="(item, i) in state.list">
        <span>{{ item.city}}</span>
        <span>{{ item.charNumber }}</span>
        <span>{{ item.policeNumber }}</span>
         <span>{{ item.replacingNumber}}</span>
       <span>{{ item.trainNumber }}</span>
      </div>
    </div>
      <!-- <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">设备ID：</span>
                <span class="text-content zhuyao doudong wangguan"> {{ item.gatewayno }}</span>
              </div>
              <div class="info">
                <span class="labels">时间：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.createTime }}</span>
              </div>
            </div>

            <span
              class="types doudong"
              :class="{
                typeRed: item.onlineState == 0,
                typeGreen: item.onlineState == 1,
              }"
              >{{ item.onlineState == 1 ? "上线" : "下线" }}</span
            >

            <div class="info addresswrap">
              <span class="labels">地址：</span>
              <span class="text-content ciyao" style="font-size: 12px"> {{ addressHandle(item) }}</span>
            </div>
          </div>
        </li>
      </ul> -->
    </component>
  </div>
</template>

<style scoped lang="scss">
 .tab_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,102,255,0.1);
    border-radius: 2px;
    border: 1px solid rgba(12,68,108,0.61);
    opacity: 0.7;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    .tab_item {
      font-family: Source Han Sans SC;
      font-weight: 400;
      font-size: 16px;
      width: 25%;
      text-align: center;
      color: #7A9BD1;
    }
  }
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 75%;
  .tab_content {
   
    .con_item {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;
      height: 40px;
      border-radius: 2px;
      margin: 3px 0;
      border: 1px solid rgba(12,68,108,0.4);
      span {
        font-family: Source Han Sans SC;
        display: inline-block;
        width: 25%;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
      
      }
    }
  }
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 14px;
    margin: 10px 0;
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

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

    .inner_right {
      position: relative;
      height: 100%;
      width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
</style>
