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
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "RequestTable",
  props: ["activitiesData", "loader","title"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Requested by",
          align: "start",
          sortable: true,
          value: "requestedby",
        },
        { text: "Staff", value: "staff" },
        { text: "Date", value: "date" },
        { text: "Duration", value: "duration" },
        
        { text: "Request Details", value: "detail" },
        { text: "Approuved By", value: "approvedby" },
      ],
    };
  },
};
</script>
