<template>
  <v-app id="inspire">
    <SideBar ref="drawer"/>
    <TopBar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"/>
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
export default {
  name: "App",
  components: { TopBar, SideBar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script>
<style lang='scss'>
  @import "./styles/Style.scss";
</style>