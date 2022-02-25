<script setup lang="ts">
defineProps<{
  label: string,
  side: 'red'|'black',
  grabbing: boolean,
}>()
</script>
<template>
  <div class="qizi" :class="{
    red: side === 'red',
    black: side === 'black',
    grabbing: grabbing,
  }">
    <span>{{label}}</span>
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
    cursor: grab;
    box-shadow: 1px 2px 2px gray;
    &.grabbing {
      outline: 2px dotted red;
      outline-offset: 2px;
    }
    &.red {
      border-color: red;
      color: red;
      background-color: white;
    }
    &.black {
      border-color: darkgreen;
      color: black;
      background-color: cornsilk;
    }
  }
</style>
