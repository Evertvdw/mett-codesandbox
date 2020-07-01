<template>
  <div class="mett-ml">
    <q-toolbar class="mett-ml-toolbar">
      <q-btn dense flat round icon="menu" @click="setFileInfoShow(!fileInfoShow)"/>
      <q-toolbar-title>{{ $t("ml.title") }}</q-toolbar-title>
      <q-btn icon="close" flat round dense @click="rejectDialog({ dialog })"/>
    </q-toolbar>

    <q-layout view="lHh LpR lFf" container class="mett-ml-layout rounded-borders shadow-2">
      <mett-ml-header/>
      <mett-ml-content/>
      <mett-ml-footer/>

      <mett-ml-info-drawer/>
      <mett-ml-filter-drawer/>
    </q-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Comp, Action, Getter } from 'src/mett/components/decorators'

@Component
export default class MediaLibrary extends Vue {
  @Comp('Components.Static.MediaLibrary.Header') mettMlHeader!: Vue
  @Comp('Components.Static.MediaLibrary.Footer') mettMlFooter!: Vue
  @Comp('Components.Static.MediaLibrary.Content') mettMlContent!: Vue
  @Comp('Components.Static.MediaLibrary.InfoDrawer') mettMlInfoDrawer!: Vue
  @Comp('Components.Static.MediaLibrary.FilterDrawer') mettMlFilterDrawer!: Vue

  @Getter('mediaLibrary/fileInfoShow') fileInfoShow!: boolean

  @Action('mediaLibrary/setFileInfoShow') setFileInfoShow!: (val: true) => void
}
</script>
