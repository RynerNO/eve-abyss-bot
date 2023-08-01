<template>
  <div
    class="rectangle"
    draggable="false"
    @mousedown="dragStart"
    @mouseup="dragStop"
    @mouseout="dragStop"
    @mousemove="mouseOver"
  ></div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const drag = ref({
  enabled: false,
  startX: 0,
  startY: 0,
});
const dragStart = (e: MouseEvent) => {
  drag.value.enabled = true;
  if (e.target instanceof HTMLElement) {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    drag.value.startX = mouseX;
    drag.value.startY = mouseY;
  }
};
const dragStop = () => {
  drag.value.enabled = false;
  drag.value.startX = 0;
  drag.value.startY = 0;
};

const mouseOver = (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    //console.log(mouseX, mouseY);
    if (drag.value.enabled) {
      if (!e.target.parentElement) return;

      const diffX = mouseX - drag.value.startX;
      const diffY = mouseY - drag.value.startY;
      const left = parseInt(getComputedStyle(e.target).left) + diffX;

      const top = parseInt(getComputedStyle(e.target).top) + diffY;

      e.target.style.left = `${left}px`;
      e.target.style.top = `${top}px`;
    }
  }
};
</script>

<style lang="sass" scoped>
.rectangle
    width: 100px
    height: 100px
    position: absolute
    background: transparent
    border: 4px solid #fff
</style>
