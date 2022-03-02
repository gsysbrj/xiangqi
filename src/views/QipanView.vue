<script setup lang="ts">
import Qizi from "@/components/Qizi.vue";
import { computed, ref } from "vue";
import {computeAvailableLocations } from "@/movesCompute"
import type { QiziDesc } from "@/movesCompute"

interface MoveDesc { qizi: QiziDesc, from: number, to: number }

const grabbing = ref(-1)
const lastMove = ref(-1)
const availableMoveLocations = computed<number[]>(() => {
  if (grabbing.value < 0) {
    return []
  }
  const qizi = situation[grabbing.value]
  return computeAvailableLocations(grabbing.value, qizi, situation)
})

const situation: QiziDesc[] = []
situation[0] = {label: '車', side: 'black'}
situation[1] = {label: '馬', side: 'black'}
situation[2] = {label: '象', side: 'black'}
situation[3] = {label: '士', side: 'black'}
situation[4] = {label: '將', side: 'black'}
situation[5] = {label: '士', side: 'black'}
situation[6] = {label: '象', side: 'black'}
situation[7] = {label: '馬', side: 'black'}
situation[8] = {label: '車', side: 'black'}
situation[19] = {label: '炮', side: 'black'}
situation[25] = {label: '炮', side: 'black'}
situation[27] = {label: '卒', side: 'black'}
situation[29] = {label: '卒', side: 'black'}
situation[31] = {label: '卒', side: 'black'}
situation[33] = {label: '卒', side: 'black'}
situation[35] = {label: '卒', side: 'black'}
situation[54] = {label: '兵', side: 'red'}
situation[56] = {label: '兵', side: 'red'}
situation[58] = {label: '兵', side: 'red'}
situation[60] = {label: '兵', side: 'red'}
situation[62] = {label: '兵', side: 'red'}
situation[64] = {label: '炮', side: 'red'}
situation[70] = {label: '炮', side: 'red'}
situation[81] = {label: '車', side: 'red'}
situation[82] = {label: '馬', side: 'red'}
situation[83] = {label: '相', side: 'red'}
situation[84] = {label: '仕', side: 'red'}
situation[85] = {label: '帥', side: 'red'}
situation[86] = {label: '仕', side: 'red'}
situation[87] = {label: '相', side: 'red'}
situation[88] = {label: '馬', side: 'red'}
situation[89] = {label: '車', side: 'red'}

const moves = ref([] as MoveDesc[])

// 抓子或走子
const changeGrabbingOrMoveQizi = (locationIndex: number) => {
  // 走子(含吃子)
  if (grabbing.value !== -1 && grabbing.value !== locationIndex) {
    // 禁止吃自己的棋子(处理为换抓子)
    if (situation[grabbing.value].side === situation[locationIndex]?.side) {
      grabbing.value = locationIndex
      return
    }
    // TODO 吃子(走子)规则判断
    if (!availableMoveLocations.value.includes(locationIndex)) {
      return
    }
    situation[locationIndex] = situation[grabbing.value]
    delete situation[grabbing.value]
    moves.value.push({
      qizi: situation[locationIndex],
      from: grabbing.value,
      to: locationIndex,
    })
    grabbing.value = -1
    lastMove.value = locationIndex
    return
  }
  // 抓子
  // 取消抓子
  if (locationIndex === grabbing.value) {
    grabbing.value = -1
    return
  } else {
    // 禁止一方走子后再抓子
    if (lastMove.value !== -1 && situation[lastMove.value]?.side === situation[locationIndex]?.side) {
      return
    }
    if (situation[locationIndex]) {
      grabbing.value = locationIndex
    }
  }
}

const n2 = '一二三四五六七八九'
const n3 = '１２３４５６７８９'
function displayMoveDesc(m: MoveDesc) {
  // 以下计算索引均始于0
  const label = m.qizi.label
  if (m.qizi.side === 'red') {
    const c1 = 8 - m.from % 9
    const c2 = 8 - m.to % 9
    const r1 = 9 - Math.floor(m.from / 9)
    const r2 = 9 - Math.floor(m.to / 9)
    if (r1 === r2) {
      return `${label}${n2.charAt(c1)}平${n2.charAt(c2)}`
    }
    if (r1 < r2) {
      return `${label}${n2.charAt(c1)}进${n2.charAt(r2-r1-1)}`
    } else {
      return `${label}${n2.charAt(c1)}退${n2.charAt(r1-r2-1)}`
    }
  } else {
    const c1 = m.from % 9
    const c2 = m.to % 9
    const r1 = Math.floor(m.from / 9)
    const r2 = Math.floor(m.to / 9)
    if (r1 === r2) {
      return `${label}${n3.charAt(c1)}平${n3.charAt(c2)}`
    }
    if (r1 < r2) {
      return `${label}${n3.charAt(c1)}进${n3.charAt(r2-r1-1)}`
    } else {
      return `${label}${n3.charAt(c1)}退${n3.charAt(r1-r2-1)}`
    }
  }
}

</script>
<template>
  <div class="qipan-view">   
    <div class="qipan">
      <div v-for="n in 90" class="location-box">
        <div class="location" :class="{
          available: availableMoveLocations.includes(n - 1)
        }">
          <div>
            <div v-if="[20, 26, 65, 71, 30, 32, 34, 36, 57, 59, 61, 63].includes(n)" style="border-bottom: 1.5px solid blueviolet;border-right:1.5px solid blueviolet;height: 30%; width: 30%;position: absolute;bottom: 2px; right: 2px;"></div>
          </div>
          <div>
            <div v-if="[20, 26, 65, 71, 28, 30, 32, 34, 55, 57, 59, 61].includes(n)" style="border-bottom: 1.5px solid blueviolet;border-left: 1.5px solid blueviolet;height: 30%; width: 30%;position: absolute;bottom: 2px; left: 2px;"></div>
          </div>
          <div>
            <div v-if="[20, 26, 65, 71, 30, 32, 34, 36, 57, 59, 61, 63].includes(n)" style="border-top: 1.5px solid blueviolet;border-right: 1.5px solid blueviolet;height: 30%; width: 30%;position: absolute;top: 2px; right: 2px;"></div>
          </div>
          <div>
            <div v-if="[20, 26, 65, 71, 28, 30, 32, 34, 55, 57, 59, 61].includes(n)" style="border-top: 1.5px solid blueviolet;border-left: 1.5px solid blueviolet;height: 30%; width: 30%;position: absolute;top: 2px; left: 2px;"></div>
          </div>
        </div>
        <!-- 士路线 -->
        <div v-if="n === 4 || n === 67" class="shi-path">
          <div></div>
        </div>
        <div v-if="n === 6 || n === 69" class="shi-path-2">
          <div></div>
        </div>
        <div class="content">
          <div v-if="n === 48" style="z-index: -100;position: absolute;height: 100%;width: 100%;top: -50%;left: 0;display: flex;justify-content: center;align-items: center;transform: rotate(180deg);font-size: 20px;font-family: monospace;">楚河</div>
          <div v-if="n === 52" style="z-index: -100;position: absolute;height: 100%;width: 100%;top: -50%;left: 0;display: flex;justify-content: center;align-items: center;font-size: 20px;font-family: monospace">漢界</div>
          <div v-if="n < 10" style="position: absolute;top:-55%; height: 50%;width: 100%;display: flex;align-items: center;justify-content: center;">{{n}}</div>
          <div v-if="n > 81" style="position: absolute;top:105%; height: 50%;width: 100%;display: flex;align-items: center;justify-content: center;">{{'一二三四五六七八九'.charAt(90-n)}}</div>
          <div class="qizi-wrapper" :class="{
            'last-move': lastMove === n -1,
          }" @click.stop="changeGrabbingOrMoveQizi(n-1)" >
            <Qizi v-if="situation[n-1]" :grabbing="grabbing === n-1" :label="situation[n-1].label" :side="situation[n-1].side"></Qizi>
          </div>
        </div>
      </div>
    </div>
    <div class="qipu">
      <div class="move" v-for="(m, index) in moves">
        <span class="round" v-if="index % 2 === 0">{{index / 2 + 1}}. </span>
        <span>{{displayMoveDesc(m)}}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.qipan-view {
  display: grid;
  grid-template-columns: 3fr 2fr;
}
  .shi-path {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > div {
      border-top: dotted 2px blueviolet;
      // border-bottom: dotted 1px blueviolet;
      transform-origin: 1px 1px;
      transform: rotate(45deg);
      width: calc(141.4213562373095% * 2);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
  .shi-path-2 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > div {
      border-top: dotted 2px blueviolet;
      // border-bottom: dotted 1px blueviolet;
      transform-origin: -1px 1px;
      transform: rotate(-45deg);
      width: calc(141.4213562373095% * 2);
      position: absolute;
      top: 250%;
      left: -150%;
    }
  }
  .qipu {
    max-height: 80vh;
    overflow: auto;
    border: 2px solid;
    padding: 5px;
    line-height: 1.2;
    .move:nth-child(2n) {
      margin-bottom: 2px;
    }
    .move {
      padding-left: 16px;
      width: 100px;
      cursor: pointer;
      .round {
        position: absolute;
        left:0;
        top:0;
        width: 10px;
        text-align: right;
      }
      &:hover {
        background-color: lightblue;
      }
    }
  }
  .qipan {
    max-width: max-content;
    max-height: 100vh;
    border: 2px solid red;
    padding: 2px;
    display: grid;
    // gap: 1%;
    grid-template-columns: repeat(9, minmax(40px, 9vh));
    grid-template-rows: repeat(10, max-content);

    .location-box {
      display: flex;
      align-items: center;
      justify-content: center;
      // outline: red dotted 1px;
      padding-bottom: 100%;
      position: relative;
      .content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .qizi-wrapper {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &.last-move {
            outline: 1px solid black;
          }
        }
      }
      > div.location {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
        &.available {
          $color1: rgb(58, 248, 51);
          > div:nth-child(1) {
            border-right-color: $color1;
            border-bottom-color:  $color1;
          }
          > div:nth-child(2) {
            border-left-color:  $color1;
            border-bottom-color:  $color1;
          }
          > div:nth-child(3) {
            border-right-color:  $color1;
            border-top-color:  $color1;
          }
          > div:nth-child(4) {
            border-left-color:  $color1;
            border-top-color:  $color1;
          }
        }
        > div:nth-child(1) {
          border-right: 1px solid blueviolet;
          border-bottom: 1px solid blueviolet;
        }
        > div:nth-child(2) {
          border-left: 1px solid blueviolet;
          border-bottom: 1px solid blueviolet;
        }
        > div:nth-child(3) {
          border-right: 1px solid blueviolet;
          border-top: 1px solid blueviolet;
        }
        > div:nth-child(4) {
          border-left: 1px solid blueviolet;
          border-top: 1px solid blueviolet;
        }
      }
      
      // 第一行
      &:not(:nth-child(1n+10)){
        > div.location {
          > div:nth-child(1) {
            border-right: 0px solid blueviolet;
          }
          > div:nth-child(2) {
            border-left: 0px solid blueviolet;
          }
        }
      }

      // 第十行
      &:nth-child(1n+82) {
        > div.location {
          > div:nth-child(3) {
            border-right: 0px solid blueviolet;
          }
          > div:nth-child(4) {
            border-left: 0px solid blueviolet;
          }
        }
      }
      // 楚河汉界
      &:nth-child(38),
      &:nth-child(39),
      &:nth-child(40),
      &:nth-child(41),
      &:nth-child(42),
      &:nth-child(43),
      &:nth-child(44)
      {
        > div.location {
          > div:nth-child(3) {
            border-right: 0px solid blueviolet;
          }
          > div:nth-child(4) {
            border-left: 0px solid blueviolet;
          }
        }
      }
      &:nth-child(47),
      &:nth-child(48),
      &:nth-child(49),
      &:nth-child(50),
      &:nth-child(51),
      &:nth-child(52),
      &:nth-child(53)
      {
        > div.location {
          > div:nth-child(1) {
            border-right: 0px solid blueviolet;
          }
          > div:nth-child(2) {
            border-left: 0px solid blueviolet;
          }
        }
      }
      // 第一列
      &:nth-child(9n+1) {
        > div.location {
          > div:nth-child(1) {
            border-bottom: 0px solid blueviolet;
          }
          > div:nth-child(3) {
            border-top: 0px solid blueviolet;
          }
        }
      }
      // 第九列
      &:nth-child(9n+9) {
        > div.location {
          > div:nth-child(2) {
            border-bottom: 0px solid blueviolet;
          }
          > div:nth-child(4) {
            border-top: 0px solid blueviolet;
          }
        }
      }

    }
  }
</style>
