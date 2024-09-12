<script setup lang="ts">
import { ref, reactive, onMounted, nextTick,inject ,onBeforeUnmount} from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { color } from "echarts";
import { set } from "@vueuse/core";
const time = ref([])
const city = reactive([])
const option = ref({});
const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const data4 = ref([])
let state = ref(null)
const getData = () => {
  state.value.post(`http://8.138.159.230/admin/openapi/bi/storageTotalEnergy`)
      .then((res: { data: { data: any; }; }) => {
       let arr = res.data.data
      let dataList = handleData(arr)
      const newValues = extractValues(dataList);
      data2.value = Object.keys(newValues);
      data3.value = Object.values(newValues);
        
       setOption();
      })
      .catch((error: any) => {
        console.error(error)
      })
};
function extractValues(data) {
    const result = {};
    const nameArr = []
    let arr = []
    for (const city in data) {
        // 确保data[city]是一个数组
        if (Array.isArray(data[city])) {
            // 使用map函数来创建一个新的数组，只包含每个对象的value属性
            result[city] = data[city].map(item => item.value);
            const cityNames = data[city].map(item => item.name);
        // 将当前城市的name数组添加到nameArr数组中
           nameArr.push(...cityNames); // 使用扩展运算符来添加元素

        }
       
        
    }
    data1.value = [...new Set(nameArr)]

    return result;
}
const handleData = (data: any[]) => {
  const obj = {}
    data.forEach((item: { totalEnergyResultList: any[]; timeRange: any; }) => {
      item.totalEnergyResultList.forEach((child: { energyCount: any; city: string | number; }) => {
        const itemObj = {
          name: item.timeRange,
          value: child.energyCount
        }
        obj[child.city] = obj[child.city] ? [...obj[child.city], itemObj] : [itemObj]
      })
    })
    return obj
}
const setOption = async (newData: any) => {
  option.value =  {
  
  xAxis: {
    type: 'category',
    data: data1.value,
    splitLine: {
      show: false // 不显示网格线
    },
    axisLine: { show: false }, // 不显示 X 轴的轴线
    axisTick: { show: false }, // 不显示 X 轴的刻度线
    axisLabel: { show: true } ,
  
  },
  yAxis: {
    type: 'value',
  //  data: data1.value,
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
      data: data2.value, // 图例的数据，与系列名称对应
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
      name: "深圳市",
      data: data3.value[0],
      type: 'line',
      smooth: true,
      symbol: 'none',
      // showBackground: true,
      itemStyle: {
          normal: {
              color: '#EAE832' // 系列2的颜色
          }
      }
     
    },
    {
      name:"玉溪市",
      data: data3.value[1],
      // 设置同一系列中柱子之间的间隔比例，这里是柱子宽度的30%
      type: 'line',
      
      smooth: true,
      symbol: 'none',
      itemStyle: {
        normal: {
              color: '#34CC38' // 系列2的颜色
          }
      },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    },
    {
      name: "西安市",
      data: data3.value[2],
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        normal: {
              color: '#FF7F2A' // 系列2的颜色
          }
      },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    },
    {
      name:'钦州市',
      data: data3.value[3],
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        normal: {
              color: '#2A7FFF' // 系列2的颜色
          }
      },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // }
    },
    {
      name: '铜陵市',
      data: data3.value[4],
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        normal: {
              color: '#5AECCF' // 系列2的颜色
          }
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

<style scoped lang="scss"></style>
