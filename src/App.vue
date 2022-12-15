<template>
  <v-app>
   <SideBar />
   <NavBar />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'


export default {
  name: 'App',

  components:{
    SideBar,
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>
<style lang='scss'>
  @import './styles/style'
</style>
