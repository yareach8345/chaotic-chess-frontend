<script setup lang="ts">

interface TabMenu {
  to: string
  title: string
}

const menus: TabMenu[] = [
  { to: '/', title: 'Game' },
  { to: '/about', title: 'About' },
]

const isNavigationOpen = ref(false)
const toggleShowNavigation = () => {isNavigationOpen.value = !isNavigationOpen.value}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <client-only>
      <v-expand-x-transition>
        <v-app-bar-nav-icon v-on:click="toggleShowNavigation()"/>
      </v-expand-x-transition>
      </client-only>
      <v-toolbar-title>Chaotic Chess</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="isNavigationOpen" temporary>
      <v-list-item v-for="menu in menus" :to="menu.to" :title="menu.title"/>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
  <v-footer color="secondary">

  </v-footer>
</template>

<style scoped>

</style>