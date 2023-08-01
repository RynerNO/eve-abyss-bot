<template>
  <div>
    <QLayout>
      <QHeader elevated>
        <QBar>
          <QIcon name="track_changes" />
          <div>My App</div>

          <QSpace />

          <QBtn dense flat icon="minimize" />
          <QBtn dense flat icon="crop_square" />
          <QBtn dense flat icon="close" />
        </QBar>

        <div class="q-pa-sm q-pl-md row items-center">
          <div class="cursor-pointer non-selectable">
            Bot
            <QMenu>
              <QList dense style="min-width: 100px">
                <QItem clickable v-close-popup>
                  <QItem-section>Open...</QItem-section>
                </QItem>
                <QItem clickable v-close-popup>
                  <QItem-section>New</QItem-section>
                </QItem>

                <QSeparator />

                <QItem clickable>
                  <QItem-section>UI</QItem-section>
                  <QItem-section side>
                    <QIcon name="keyboard_arrow_right" />
                  </QItem-section>

                  <QMenu anchor="top end" self="top start">
                    <QList>
                      <QItem dense clickable>
                        <QItem-section @click="uiBuildHangar"
                          >Build Hangar</QItem-section
                        >
                      </QItem>
                    </QList>
                  </QMenu>
                </QItem>

                <QSeparator />
                <QItem clickable>
                  <QItem-section>UI Manual Positioning</QItem-section>
                  <QItem-section side>
                    <QIcon name="keyboard_arrow_right" />
                  </QItem-section>

                  <QMenu anchor="top end" self="top start">
                    <QList>
                      <QItem dense clickable>
                        <QItem-section>UI Elements</QItem-section>
                        <QItem-section side>
                          <QIcon name="keyboard_arrow_right" />
                        </QItem-section>
                        <QMenu auto-close anchor="top end" self="top start">
                          <QList>
                            <QItem dense clickable>
                              <QItem-section @click="manualPlacing('undock')"
                                >Undock</QItem-section
                              >
                            </QItem>
                            <QItem dense clickable>
                              <QItem-section>Something</QItem-section>
                            </QItem>
                          </QList>
                        </QMenu>
                      </QItem>
                    </QList>
                  </QMenu>
                </QItem>

                <QSeparator />
                <QItem clickable v-close-popup>
                  <QItem-section>Quit</QItem-section>
                </QItem>
              </QList>
            </QMenu>
          </div>

          <div class="q-ml-md cursor-pointer non-selectable">
            Edit
            <QMenu auto-close>
              <QList dense style="min-width: 100px">
                <QItem clickable>
                  <QItem-section>Cut</QItem-section>
                </QItem>
                <QItem clickable>
                  <QItem-section>Copy</QItem-section>
                </QItem>
                <QItem clickable>
                  <QItem-section>Paste</QItem-section>
                </QItem>
                <q-separator />
                <QItem clickable>
                  <QItem-section>Select All</QItem-section>
                </QItem>
              </QList>
            </QMenu>
          </div>
        </div>
      </QHeader>

      <router-view></router-view>
    </QLayout>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
import {useImagesStore, usePositionsStore} from './store';
import {onBeforeMount, onMounted} from 'vue';

const uiBuildHangar = async () => {
  const resp = await window.ipcRenderer.invoke('uiBuildHangar', []);
  const image = useImagesStore();
  image.update(resp);
};
onMounted(() => {
  const positions = usePositionsStore();
  console.log(positions.positions);
}),
  onBeforeMount(async () => {
    const {image, positions} = await window.ipcRenderer.invoke('init', []);
    const imageStore = useImagesStore();
    imageStore.update(image);
    const positionsStore = usePositionsStore();
    positionsStore.update(positions);
    console.log(positions);
  });

const manualPlacing = (name: string) => {};
</script>

<style lang="sass" scoped></style>

<style lang="sass">
body
  background: $dark-page
</style>
