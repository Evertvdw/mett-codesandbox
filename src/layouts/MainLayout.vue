<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <q-item v-ripple clickable @click="onClick">
          <q-item-section avatar>
            <q-icon name="photo_library" />
          </q-item-section>

          <q-item-section no-wrap>
            Media Library
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <mett-dialog-list />
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Comp, Action } from 'src/mett/components/decorators'
import { IDialog } from 'src/store/dialog/types'
import { ItemDto } from 'src/mett/communication/types'

@Component
export default class MainLayout extends Vue {
  @Comp('Components.Static.DialogList') mettDialogList!: Vue
  @Comp('Components.Static.MediaLibrary.MediaLibrary')
  readonly mediaLibraryDialog!: Vue

  @Action('dialog/openDialog') openDialog!: ({
    dialog
  }: {
    dialog: IDialog
  }) => Promise<any>
  @Action('mediaLibrary/activate') activateMediaLibrary!: (options: {
    item?: ItemDto
  }) => void
  @Action('mediaLibrary/setFileInfoShow') setFileInfoShow!: (
    val: boolean
  ) => void

  onClick() {
    const dialog: IDialog = {
      component: this.mediaLibraryDialog,
      custom: true,
      fullScreen: true
    }

    this.openDialog({ dialog }).then(
      () => {
        this.setFileInfoShow(false)
      },
      () => {
        this.setFileInfoShow(false)
      }
    )
  }

  leftDrawerOpen = false
}
</script>
