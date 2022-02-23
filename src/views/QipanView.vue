<template>
  <div class="qipan">
    <div v-for="n in 90" class="location-box">
      <div class="location">
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
        <div v-if="n === 48" style="position: absolute;height: 100%;width: 100%;top: -50%;left: 0;display: flex;justify-content: center;align-items: center;transform: rotate(180deg);font-size: 20px;font-family: monospace;">楚河</div>
        <div v-if="n === 52" style="position: absolute;height: 100%;width: 100%;top: -50%;left: 0;display: flex;justify-content: center;align-items: center;font-size: 20px;font-family: monospace">漢界</div>
        <div v-if="n < 10" style="position: absolute;top:-55%; height: 50%;width: 100%;display: flex;align-items: center;justify-content: center;">{{n}}</div>
        <div v-if="n > 81" style="position: absolute;top:105%; height: 50%;width: 100%;display: flex;align-items: center;justify-content: center;">{{'一二三四五六七八九'.charAt(90-n)}}</div>
        <div v-if="n === 1 || n === 9" class="qizi">
          <span>車</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .qizi {
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 27px;
    font-weight: 900;
    background-color: cornsilk;
    border-radius: 50%;
    border: darkgreen 2px solid;
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
  .qipan {
    max-width: max-content;
    max-height: 100vh;
    border: 2px solid red;
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
