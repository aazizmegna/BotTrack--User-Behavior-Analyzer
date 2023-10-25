<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <StaffWidget />
        </v-card>
      </v-col>
    </v-row>

    <StaffTable1/>
  </div>
</template>

<script>

import StaffWidget from "../../../components/widget/StaffWidget.vue";
import StaffTable1 from "../../../components/Tables/Stafftable/StaffTable1.vue"


export default {
  name: "StaFf",
  components: {
    StaffWidget,
    StaffTable1,
  },
};
</script>

<style>

</style>
