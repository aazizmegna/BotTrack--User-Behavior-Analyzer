<template>
  <v-app id="inspire" class="overflow-hidden">
    <TopBar v-if="shouldShowSidebar" />
    <div class="widjet ">
      <FilterWidjet v-if="shouldShowComponent" />
    </div>
    <SideBar v-if="shouldShowSidebar" />
    <v-main style="background: #f0f2f5">
      <v-content class="py-lg-6 px-lg-6 py-xl-6 px-xl-6">
        <router-view></router-view>
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "../src/components/SideBar.vue";
import TopBar from "../src/components/TopBar.vue";
import FilterWidjet from "./components/widget/FilterWidjet.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "App",
  components: { TopBar, SideBar, FilterWidjet },
  data: () => ({
    drawer: false,
  }),

  computed: {
    shouldShowSidebar() {
      return this.$route.meta.SideBar !== false;
    },
    shouldShowComponent() {
      return this.$route.meta.FilterWidjet !== false;
    },
  },
};
</script>
<style scoped>
::v-deep ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* Track */
::v-deep ::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::v-deep ::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

v::deep .v-navigation-drawer__content {
  overflow: hidden
 }
 
.v-navigation-drawer__content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar{
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
*{
  font-family: "Segoe UI";

}
body{
  font-family: "Segoe UI";
  font-weight: normal;
}
.widjet {
  position: relative;
  top: 64px;
  margin-left: 16.5rem;
}
@media (max-width: 480px) {
  .widjet {

    margin-left: 0rem;
  }
}
</style>
