<template>
  <v-card>
    <v-card-title>
      {{title}}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :sort-by="[
        'duration',
      ]"
      :sort-desc="[false, true]"
      :headers="headers"
      :items="activitiesData"
      hide-default-footer
      height="450"
      :loading="loader"
      loading-text="Loading..."
    >
    <template #item="{ item , index }">
      <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
        <td class="border-cell">{{ item.requestedby}}</td>
        <td class="border-cell">{{ item.category }}</td>
        <td class="border-cell">{{ item.activity }}</td>
        <td class="border-cell">{{ item.staff }}</td>
        <td class="border-cell">{{ item.period }}</td>
        <td class="border-cell">{{ item.approvedby }}</td>



      </tr>
   </template>
  </v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "RequestTable",
  props: ["activitiesData", "loader","title"],
  data() {
    return {
      selectedRowIndex: 0,

      headers: [
        {
          text: "Requested by",
          align: "start",
          sortable: true,
          value: "requestedby",
        },
        { text: "Category", value: "category" },
        { text: "Activity", value: "activity" },
        { text: "Staff", value: "staff" },
        { text: "Period", value: "period" },
        { text: "Approuved By", value: "approvedby" },
      ],
    };
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
  }
};
</script>
<style scoped>
::v-deep .selected-row {
  background-color: #626c75 !important;
  color: #fff !important;
}

.custom-header {
  border: 1px solid rgb(206, 206, 206); /* Ajoutez les styles de bordure que vous préférez */
  background-color: rgb(241, 241, 241) !important; 
  padding: 8px; /* Ajoutez le rembourrage que vous préférez */
}
</style>