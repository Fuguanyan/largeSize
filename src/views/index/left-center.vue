<script setup lang="ts">
import { ref, reactive, onMounted, nextTick ,inject} from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { color } from "echarts";
let data1 = ref([])
const option = ref({});
const getData = () => {
  data1.value = []
  const axios = inject('axios')
    axios.post(`http://8.138.159.230/admin/openapi/bi/stationSalesVolume`)
      .then((res: { data: { data: any; }; }) => {
       let arr:any = res.data.data
       arr.forEach(item => data1.value.push({ value: item.total, name: item.stationName.slice(-5) }))
     console.log(arr,'arrrr')
       setOption();
      })
      .catch((error: any) => {
        console.error(error)
      })
};
const setOption = async (newData: any) => {
  option.value =  {
    tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '1%',
   
    orient: 'vertical',
    right: "10px",
    itemWidth: 10, // 图例图形的宽度
    itemHeight: 10, // 图例图形的高度
    textStyle: {
      color: ['#0066FF'] // 图例文字的颜色
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data1
    }
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
