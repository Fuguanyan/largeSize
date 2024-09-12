<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import BottomMap from "./bottom-map.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="当日动态监控"
        
      >
        <LeftBottom />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="啤酒车分布城市数据"
        style="margin-top: 5px;"
      >
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="ontetn_left-bottom contetn_lr-item" title="各城市总子站统计">
        <CenterBottom />
      </ItemWrap>
      
      
    </div>
    <div class="contetn_center">
      <!-- <div id="myChart"  style="width: 60vw;height: 50vh;"></div> -->
  
        <CenterMap  />

     
       <div style="display: flex;">
        <ItemWrap  class="contetn_center-bottom"  title="故障报警统计">
        <LeftTop/>
      </ItemWrap>
      <ItemWrap  class="contetn_center-bottom"  title="电池返修统计">
        <BottomMap />
       
      </ItemWrap>
       </div>
      
      
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="总站储电总耗能">
        <RightBottom />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="各换电时段换电车次数统计">
        <RightTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="各总站业绩排名">
        <LeftCenter />
      </ItemWrap>
     
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  // flex: 1;
  width: 520px;
  box-sizing: border-box;
  flex-shrink: 0;

 
 
}

.contetn_center {
  flex: 1;
  // width: 5vw;
  // margin: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  // .contetn_center_top {
  //   height: 925px;
  // }
  .contetn_center-bottom {
    height: 315px;
    width:375px;
    display: flex;
 
  }
}

.contetn_lr-item {
  height: 310px;
}
</style>
