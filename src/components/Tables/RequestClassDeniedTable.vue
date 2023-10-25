<template>
  <v-simple-table fixed-header height="700px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Requested By</th>
          <th class="text-left">Activity</th>
          <th class="text-left">Duration</th>
          <th class="text-left">Class</th>
          <th class="text-left">Denied By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.requestedby }}</td>
          <td>{{ item.activity }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.class }}</td>
          <td>{{ item.approvedby }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: "RequestClassDeniedTable",
  data() {
    return {
      desserts: [
        {
          requestedby: "Abdel Aziz",
          activity: "TERZIONDX.com",
          duration: "36s",
          class: "busness",
          approvedby: "Abdel",
        },
        {
          requestedby: "Abdel Aziz",
          activity: "TERZIONDX.com",
          duration: "36s",
          class: "busness",
          approvedby: "Abdel",
        },
        {
          requestedby: "Abdel Aziz",
          activity: "TERZIONDX.com",
          duration: "36s",
          class: "busness",
          approvedby: "Abdel",
        },
        {
          requestedby: "Abdel Aziz",
          activity: "TERZIONDX.com",
          duration: "36s",
          class: "busness",
          approvedby: "Abdel",
        },
        {
          requestedby: "Abdel Aziz",
          activity: "TERZIONDX.com",
          duration: "36s",
          class: "busness",
          approvedby: "Abdel",
        },
      ],
    };
  },
};
</script>
