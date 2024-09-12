<script setup lang="ts">
import { ref, reactive, onMounted, nextTick ,inject,onBeforeUnmount} from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option = ref({});
const data1 = ref([])
const data2 = ref([])
let state = ref(null)
const getData = () => {
  data1.value = []
  data2.value = []
  state.value.post(`http://8.138.159.230/admin/openapi/bi/deviceCountForCity`)
      .then((res: { data: { data: any; }; }) => {
       let arr = res.data.data
       arr.forEach((item: { city: any; count: any; }) => {
        data1.value.push(item.city)
        data2.value.push(item.count)
       })
       data2.value.reverse();
       setOption();
      })
      .catch(error => {
        console.error(error)
      })
};
const setOption = async (newData: any) => {
  option.value =  {
  xAxis: {
    type: 'value',
    splitLine: {
      show: false // 不显示网格线
    },
    
    axisLine: { show: false }, // 不显示 Y 轴的轴线
    axisTick: { show: false }, // 不显示 Y 轴的刻度线
    axisLabel: { show: true }   // 显示 Y 轴的刻度标签
  },
  yAxis: {
    type: 'category',
    data: data1.value,
    splitLine: {
      show: false // 不显示网格线
    },
    
    axisLine: { show: false }, // 不显示 Y 轴的轴线
    axisTick: { show: false }, // 不显示 Y 轴的刻度线
    axisLabel: { show: true }   // 显示 Y 轴的刻度标签
  },
  legend: {
      textStyle: {
        color: "#B4B4B4",
      },
      top: "0",
    },
    grid: {
      left: "50px",
      right: "40px",
      bottom: "30px",
      top: "20px",
    },
  series: [
    {
      data: data2.value,
      // barGap: '20%',
      // 设置系列内的柱子间距为10px
      barCategoryGap: '10px',
      type: 'bar',
      // showBackground: true,
      //  borderRadius: 5,
      barWidth: 10,
      // barMaxWidth: 10,
      label: {
          normal: {
              show: true,
              position: 'right', // 在柱子顶部显示
              formatter: function (param) {
                  return param.value; // 显示数据值
              },
              textStyle: {
                  color: '#ffffff' // 文本颜色
              }
          }
      },
      itemStyle: {
        barBorderRadius: [0, 50, 50, 0], // 设置柱子顶部圆角大小为10px
          color: new graphic.LinearGradient(0, 1, 1, 0, [
            { offset: 0, color: "#1B6AFF" },
            { offset: 1, color: "#00FFFC" },
          ]),
          
      },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    },
   
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

<style scoped lang="scss"></style>(: any): { value: any; }
