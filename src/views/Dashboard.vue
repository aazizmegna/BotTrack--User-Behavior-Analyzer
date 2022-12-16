<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <v-btn color="success"> View Orders </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="12" cols="12">
        <v-card elevation="2" class="rounded-lg">
          <v-row no-gutters>
            <v-col cols="6" sm="6" md="6">
              <v-card class="pa-2" outlined tile>
                <BarChart :chartData="chartData" :chartOptions="options" />
              </v-card>
            </v-col>
            <v-col cols="6" md="6">
              <v-card class="pa-2" outlined tile>
                <LineChart :LineData="LineData" :lineOptions="lineOptions" />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" lg="12">
        <v-card>
          <v-data-table
            caption="Recent Order list"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="">
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BarChart from "../charts/BarChart.vue";
import LineChart from "../charts/LineChart.vue";

export default {
  name: "MyDashboard",
  components: {
    BarChart,
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          "2015-01",
          "2015-02",
          "2015-03",
          "2015-04",
          "2015-05",
          "2015-06",
          "2015-07",
          "2015-08",
          "2015-09",
          "2015-10",
          "2015-11",
          "2015-12",
        ],
        datasets: [
          {
            label: "Bar Chart",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      LineData: {
        labels: [
          "Babol",
          "Cabanatuan",
          "Daegu",
          "Jerusalem",
          "Fairfield",
          "New York",
          "Gangtok",
          "Buenos Aires",
          "Hafar Al-Batin",
          "Idlib",
        ],
        datasets: [
          {
            label: "Line Chart",
            data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
            fill: false,
            borderColor: "#2554FF",
            backgroundColor: "#2554FF",
            borderWidth: 1,
          },
        ],
      },
      lineOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },

      activityLog: [
        {
          title: "Total Products",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Customer",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total Sale",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Pending Orders",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "Actions", value: "action" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
    this.renderChart(this.LineData, this.lineOptions);
  },

  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
