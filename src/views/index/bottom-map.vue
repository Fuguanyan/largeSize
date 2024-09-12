<script setup lang="ts">
import { ref, reactive, onMounted, nextTick,inject ,onBeforeUnmount} from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { color } from "echarts";
let data1 = ref([])
let data2 = ref([])
const state = ref(null)
const option = ref({});
const getData = () => {
  data1.value = []
  data2.value = []
    state.value.post(`http://8.138.159.230/admin/openapi/bi/stationRepairCount`)
      .then((res: { data: { data: any; }; }) => {
       let arr = res.data.data.slice(1)
       
      arr.forEach(item => {
        data1.value.push(item.totalCount)
        data2.value.push(item.stationName)
      });
      let a = data2.value
       let b = []
       a.forEach(item => {
         b.push(item.slice(-3)) 
       })
      data2.value = b
       setOption();
      })
      .catch((error: any) => {
        console.error(error)
      })
};
const setOption = async (newData: any) => {
  option.value =  {
  
  xAxis: {
    type: 'category',
    data: data2.value,
    splitLine: {
      show: false // 不显示网格线
    },
    axisLine: { show: false }, // 不显示 X 轴的轴线
    axisTick: { show: false }, // 不显示 X 轴的刻度线
    axisLabel: { show: true } ,
  
  },
  yAxis: {
    type: 'value',
   
    splitLine: {
      show: false // 不显示网格线
    },
    axisLine: { show: false }, // 不显示 Y 轴的轴线
    axisTick: { show: false }, // 不显示 Y 轴的刻度线
    axisLabel: { show: true }   // 显示 Y 轴的刻度标签
    // 其他 yAxis 配置...
  },
  legend: {
     icon:'rect',
      // orient: 'vertical', // 图例的布局朝向，默认是水平布局，'vertical' 表示垂直
      itemWidth: 10, // 图例图形的宽度
      itemHeight: 10, // 图例图形的高度
    textStyle: {
      color: ['#00FFD2'] // 图例文字的颜色
    },
   
    },
    grid: {
      left: "50px",
      right: "0",
      bottom: "30px",
      top: "20px",
    },
  series: [
    {
      
      data: data1.value,
      type: 'line',
    //   smooth: true,
    //    symbol: "circle",
       symbolSize: 10,
      // showBackground: true,
      lineStyle: {
                normal: {
                    type: 'dashed', // 设置为 'dashed' 或 'dotted'
                    color: '#00D7ED',
                    width: 2
                }
            },
     
    }
  ]
};
};
let intervalId;
onMounted(() => {
  state.value = inject('axios')
  getData();
  intervalId = setInterval(getData,70000); 
});
onBeforeUnmount(() => {
      clearInterval(intervalId); // 清除定时器
  });
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
