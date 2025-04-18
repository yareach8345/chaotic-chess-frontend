<script setup lang="ts">
import {useDisplay} from "vuetify/framework";

interface TabMenu {
  to: string
  title: string
}

const menus: TabMenu[] = [
  { to: '/', title: 'Game' },
  { to: '/about', title: 'About' },
  { to: '/setting', title: 'Setting' },
  { to: '/comment', title: 'Comment' },
]

const { smAndDown } = useDisplay()

const isNavigationOpen = ref(false)
const toggleShowNavigation = () => {isNavigationOpen.value = !isNavigationOpen.value}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-expand-x-transition>
        <v-app-bar-nav-icon v-on:click="toggleShowNavigation()" v-if="smAndDown" />
      </v-expand-x-transition>
      <v-toolbar-title>Chaotic Chess</v-toolbar-title>
<!--      app bar에 속한 메뉴. 모바일이 아닌 경우에만 보임-->
      <template v-slot:extension  v-if="!smAndDown">
        <v-tabs>
          <v-tab v-for="menu in menus" :to="menu.to">{{menu.title}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
<!--    drawer형식의 메뉴. 모바일인 사람에게만 보임-->
    <v-navigation-drawer v-model="isNavigationOpen" temporary v-if="smAndDown">
      <v-list-item v-for="menu in menus" :to="menu.to" :title="menu.title"/>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>