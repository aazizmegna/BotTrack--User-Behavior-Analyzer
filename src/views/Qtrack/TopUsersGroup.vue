<template>
  <div>
    <v-row>
      <v-col>
        <TopUserProductivityTable />
      </v-col>
    </v-row>
  </div>
</template>
<script>

import TopUserProductivityTable from '../../components/Tables/TopUserProductivityTable.vue'
export default {
  components: {
    TopUserProductivityTable,
  }, data() {

    return {}
  }
}
</script>