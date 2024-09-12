<script setup lang="ts">
import { ref, reactive, onMounted, nextTick ,inject} from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { color } from "echarts";
const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const data4 = ref([])
const data5 = ref([])

const option = ref({});
const getData = () => {
  const axios = inject('axios')
    axios.post(`http://8.138.159.230/admin/openapi/bi/policeCountForStation`,{
      data:{queryTimeType:0}
    })
      .then(res => {
       let arr = res.data.data
       console.log(arr,'arr')
       arr.forEach((item,index) => {
        data1.value.push(item.stationName)
 
       })
       let a = data1.value
       let b = []
       a.forEach(item => {
         b.push(item.slice(-3)) 
       })
      data1.value = b
       setOption();
      })
      .catch(error => {
        console.error(error)
      })
};
const setOption = async (newData: any) => {
  option.value =  {
    responsive: true,
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
    min: 0, // Y 轴最小值
    max: 300, // Y 轴最大值，可以设置一个比数据最大值更大的数值来放大视图
    scale: true, // 启用值域缩放
    splitLine: {
      show: false // 不显示网格线
    },
   
    axisLine: { show: false }, // 不显示 Y 轴的轴线
    axisTick: { show: false }, // 不显示 Y 轴的刻度线
    axisLabel: { show: true }   // 显示 Y 轴的刻度标签
    // 其他 yAxis 配置...
  },
  
    grid: {
      left: "50px",
      right: "50px",
      bottom: "30px",
      top: "20px",
      
    },
  series: [
    {
      data: [10,15,20,35,40],
    type: 'bar',
    stack: 'a',
    name: 'a',
     
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(27,106,255,0.2)'
      },
      barWidth: 20,
      itemStyle: {
        normal: {
          barBorderRadius:[2,2,2,2],
          color: '#00D7ED', // 堆积块的颜色
          borderColor: '#00a1f1', // 堆积块边框的颜色
          borderWidth: 1 // 堆积块边框的宽度
        }
      }
     
    },
    {
      data: [5,21,7,10,15],
      type: 'bar',
    
    stack: 'a',
    name: 'b',
      showBackground: true,
      backgroundStyle: {
        color:' rgba(27,106,255,0.2)'
      },
      barWidth: 20,
      itemStyle: {
        normal: {
          barBorderRadius:[2,2,2,2],
          color: '#00a1f1', // 堆积块的颜色
          borderColor: '#00a1f1', // 堆积块边框的颜色
          borderWidth: 1 // 堆积块边框的宽度
        }
      }
     
    },
    {
      data: [5,9,8,20,13],
     
      type: 'bar',
    stack: 'a',
    name: 'c',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(27,106,255,0.2)'
      },
      barWidth: 20,
      itemStyle: {
        normal: {
          barBorderRadius:[2,2,2,2],
          color: '#00a1f1', // 堆积块的颜色
          borderColor: '#00a1f1', // 堆积块边框的颜色
          borderWidth: 1 // 堆积块边框的宽度
        }
      }
     
    },
    {
      data: [30,24,12,40,60],
     
      type: 'bar',
    stack: 'a',
    name: 'c',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(27,106,255,0.2)'
      },
      barWidth: 20,
      itemStyle: {
        normal: {
          barBorderRadius:[2,2,2,2],
          color: '#00a1f1', // 堆积块的颜色
          borderColor: '#00a1f1', // 堆积块边框的颜色
          borderWidth: 1 // 堆积块边框的宽度
        }
      }
     
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
