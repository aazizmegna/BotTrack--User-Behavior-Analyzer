<template>
  <div>
    <v-card color="#ecf5ff">
      <v-col lg="12">
        <v-row>
          <v-col>
            <v-data-table :headers="headers" :items="items"></v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MoreComputer",

  data() {
    return {
      headers: [
        { text: "Computer", value: "computer" },
        { text: "User", value: "user" },
        { text: "IP Adress", value: "ip" },
      ],
      items: [{ computer: "TRZQB05SD", user: "Issa", ip: "28394811231" }],
    };
  },
  methods: {},
};
</script>
