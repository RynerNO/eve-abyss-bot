<template>
  <div>
    <div class="imageContainer">
      <img
        src="/images/image.bmp"
        @mousemove="mouseOverImage"
        :class="move ? 'imageMovable' : ''"
        draggable="false"
        @mousedown="dragStart"
        @mouseup="dragStop"
        @mouseout="dragStop"
      />
    </div>
    <QBtn color="primary" label="Build hangar U1I" />
  </div>
</template>

<script setup lang="ts">
import {QBtn} from 'quasar';
import {ref} from 'vue';

const move = ref(false);
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

const mouseOverImage = (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    //console.log(mouseX, mouseY);
    if (drag.value.enabled) {
      if (!e.target.parentElement) return;

      const diffX = mouseX - drag.value.startX;
      const diffY = mouseY - drag.value.startY;
      console.log(diffX, diffY);
      const left = parseInt(getComputedStyle(e.target).left) + diffX;

      const top = parseInt(getComputedStyle(e.target).top) + diffY;

      e.target.style.left = `${left}px`;
      e.target.style.top = `${top}px`;
    }
  }
};
</script>

<style lang="sass" scoped>
.imageContainer
    overflow: hidden
    position: relative
    width: 90vw
    height: 90vh
    margin: 0 auto
.imageContainer
    img
        position: absolute
        left: 0
        top: 0
.imageMovable
    cursor: grab
</style>
