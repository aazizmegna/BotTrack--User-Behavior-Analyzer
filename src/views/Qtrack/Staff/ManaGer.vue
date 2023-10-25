<template>
  <div>
     <v-row>
      <v-col>
        <v-card>
          <StaffWidget />
        </v-card>
      </v-col>
    </v-row>
     <v-row>
      <v-col>
        <v-card>
          
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <StafftableManage />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StaffWidget from "../../../components/widget/StaffWidget.vue";
import StafftableManage from "../../../components/Tables/Stafftable/StafftableManage.vue"


export default {
  name: 'ManaGer',
  components: {
    StaffWidget,
    StafftableManage,

  },
  data() {
    return {
      
    }
  }
};
</script>

<style>

</style>