<template>
  <v-app id="inspire">
    <SideBar :drawer.sync="drawer"/>
    <TopBar @drawerEvent="drawer = !drawer" />
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
    drawer: false,
  }),
  methods: {},
};
</script>