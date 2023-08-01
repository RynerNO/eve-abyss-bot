<template>
  <div>
    <ImageView :src="images.src"></ImageView>
  </div>
</template>

<script setup lang="ts">
import ImageView from '../components/ImageView.vue';
import {useImagesStore} from '../store';

const images = useImagesStore();
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
