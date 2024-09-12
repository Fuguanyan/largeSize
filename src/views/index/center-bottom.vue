<script setup lang="ts">
import { ref, reactive, onMounted, nextTick,inject  } from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { color } from "echarts";
const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const option = ref({});
const getData = () => {
  const axios = inject('axios')
    axios.post(`http://8.138.159.230/admin/openapi/bi/stationCountForCity`)
      .then(res => {
       let arr = res.data.data
       arr.forEach(item => {
        data1.value.push(item.city)
        data2.value.push(item.stationTotal)
       data3.value.push(item.rootTotal)
       })
       setOption();
      })
      .catch(error => {
        console.error(error)
      })
};
const dataList = ref([])
const setOption = async (newData: any) => {
  option.value =  {
  
  xAxis: {
    type: 'category',
    data: data1.value,
    splitLine: {
      show: false // 不显示网格线
    },
    axisLine: { show: false }, // 不显示 Y 轴的轴线
    axisTick: { show: false }, // 不显示 Y 轴的刻度线
    axisLabel: { show: true }   // 显示 Y 轴的刻度标签
   
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
      show: true, // 默认为 true，显示图例
      data: ['总站', '子站'], // 图例的数据，与系列名称对应
      left: 'right', // 图例组件离容器右侧的距离
      top: 'top', // 图例组件离容器顶部的距离
      // orient: 'vertical', // 图例的布局朝向，默认是水平布局，'vertical' 表示垂直
      itemWidth: 10, // 图例图形的宽度
    itemHeight: 10, // 图例图形的高度
    textStyle: {
      color: ['#0066FF','#00FFD2'] // 图例文字的颜色
    }
    },
    grid: {
      left: "50px",
      right: "50px",
      bottom: "30px",
      top: "20px",
    },
  series: [
    {
      name: '总站',
      data: data3.value,
      barCategoryGap: '10px',
      type: 'bar',
      // showBackground: true,
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [50, 50, 0, 0],
       color:'#005AFF'
      },
     
    },
    {
      name: '子站',
      data: data2.value,
      // 设置同一系列中柱子之间的间隔比例，这里是柱子宽度的30%
      barGap: '60%',
      barCategoryGap: '20px',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [50, 50, 0, 0], // 设置柱子顶部圆角大小为10px
          color: new graphic.LinearGradient(0, 1, 1, 0, [
            { offset: 0, color: "#00C5C4" },
            { offset: 1, color: "#C3FFFF" },
          ]),
      },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    },
  ]
};
};

onMounted(() => {

  getData();
});
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
