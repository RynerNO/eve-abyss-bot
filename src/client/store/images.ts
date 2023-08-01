import {defineStore} from 'pinia';

export const useImagesStore = defineStore({
  id: 'images',
  state: () => ({
    src: '/images/image.bmp',
  }),
  actions: {
    update(src: string) {
      this.src = src;
    },
  },
});
