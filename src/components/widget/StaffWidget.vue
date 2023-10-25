<template>
  <v-col>
    <v-btn to="/staff" text>
      STAFF

    </v-btn>
    <v-btn text to="/manager">
      MANAGER
    </v-btn>
    <v-btn text to="/team">
      TEAM
    </v-btn>
    <v-btn text to="/role">
      ROLE
    </v-btn>
  </v-col>
</template>
<script>

export default {
  name: 'StaffWidget'
}
</script>