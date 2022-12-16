<template>
  <div>
    <v-row align="center">
      <v-col class="d-flex" cols="2" sm="2">
        <v-select :items="items" label="Today" solo></v-select>
      </v-col>
      <v-col class="d-flex" cols="2" sm="2">
        <v-select :items="items" label="All Users" solo></v-select>
      </v-col>
      <v-col class="d-flex" cols="2" sm="2">
        <v-select :items="items" label="Export" solo></v-select>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        TOP USERS AND GROUPS
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="header2"></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      header2: [],
      headers: [
        {
          text: "User",
          align: "start",
          sortable: false,
          value: "timestamp",
        },
        { text: "Productivity Ratio", value: "duration" },
        { text: "Productive", value: "app" },
        { text: "Unproductive", value: "title" },
        { text: "Undefined", value: "Url" },
        { text: "Total Time", value: "Executable" },
      ],
      desserts: [
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
        {
          timestamp: "User Name",
          duration: "8h 01m",
          app: "8h 52m",
          title: "52m",
          Url: "22m",
          Executable: "8h 52m",
        },
      ],
    };
  },
};
</script>
