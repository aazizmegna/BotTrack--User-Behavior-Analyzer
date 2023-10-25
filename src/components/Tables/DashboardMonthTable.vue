<template>
  <v-card>
    <v-row v-if="prodChart.length > 0">
      <div id="chart">
        <apexchart type="line" height="500" :options="chartOptions" :series="series"></apexchart>
      </div>
    </v-row>
    <br />
    <br />
    <v-row>
      <v-data-table :sort-by="[
        'Start Time',
        'End Time',
        'Total',
        'Productivity',
        'Distracting',
        'No Activity',
      ]" :sort-desc="[false, true]" :headers="headers" :items="logs" :search="search"
        :pagination="false"></v-data-table>
    </v-row>
  </v-card>
</template>
<script>
import ApexCharts from "vue-apexcharts";

export default {
  name: "WeekMounthTable",
  props: ["logs", "range", "prodChart", "nonProdChart","noActChart", "date"],

  components: {
    apexchart: ApexCharts,
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: this.range,
          align: "start",
          sortable: true,
          value: "day",
        },
        { text: "Start Time", value: "starttime" },
        { text: "End Time", value: "endtime" },
        { text: "Total", value: "total" },
        { text: "Productivity", value: "productivity" },
        { text: "Distracting", value: "distracting" },
        { text: "Undefined", value: "undefined" },
        { text: "No Activity", value: "noactivity" },
      ],

      series: [
        {
          type: 'area',
          name: "Non-Productivity",
          data: this.nonProdChart, //[31, 40, 28, 51, 42, 109, 100],
          color: '#98FB98' // Vert ciel

        },
        {
          type: 'area',
          name: "Productivity",
          data: this.prodChart, //[11, 32, 45, 32, 34, 52, 41],
          color: '#87CEEB'

        },
        {
          type: 'area',
          name: "No Activity",
          data: this.noActChart, //[11, 32, 45, 32, 34, 52, 41],
          color: '#FFB6C1'
  
        },
      ],
      chartOptions: {
        yaxis: {
          labels: {
            formatter: function (value) {
              return parseInt(value);
            },
          },
        },
        fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.10,
      opacityTo: 0.9,
      stops: [0, 70, 100]
    }
  },

        chart: {
          stacked: true,
          height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 3, 5],
        },
        title: {
          text: "",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              ": " +
              Math.floor(
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
              ) +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: this.date
            ? this.date.map((date) =>
                new Date(date).toLocaleDateString("en-US")
              )
            : [], //['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan','10 Jan', '11 Jan', '12 Jan'],
        },
//         xaxis: {
//   categories: this.date
//     ? this.date
//         .filter(date => new Date(date).toLocaleDateString("en-US") !== "01/02/2023") // Assurez-vous que le format de date est correct
//         .map(date => new Date(date).toLocaleDateString("en-US"))
//     : [],
// },  Chat GPT

        tooltip: {
          y: [
            {
              formatter: function (val) {
                return Math.floor(val) + " (mins)";
              },
            },
            {
              formatter: function (val) {
                return Math.floor(val) + " (mins)";
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + ":";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + ":";
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
        colors: ["#ff0000", "#00FF00"],
      },
    };
  },

  watch: {
    nonProdChart: {
      handler() {
        this.series[0].data = this.nonProdChart;
      },
      deep: true,
    },
    prodChart: {
      handler() {
        this.series[1].data = this.prodChart;
      },
      deep: true,
    },
    noActChart: {
      handler() {
        this.series[2].data = this.noActChart;
      },
      deep: true,
    },
    date: {
      handler() {
        this.chartOptions.xaxis.categories = this.date
          ? this.date.map((date) => new Date(date).toLocaleDateString("en-US"))
          : [];
      },
      deep: true,
    },
  },
};
</script>