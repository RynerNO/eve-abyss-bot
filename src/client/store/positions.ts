import {defineStore} from 'pinia';

export const usePositionsStore = defineStore({
  id: 'positions',
  state: () => ({
    positions: {},
  }),
  actions: {
    update(positions: any) {
      this.positions = positions;
    },
  },
});
