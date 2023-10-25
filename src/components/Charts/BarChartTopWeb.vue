<template>
  <div id="app">
    <div id="chart1">
      <div class="text-center loader" v-if="!loaded">
        <v-progress-circular
          size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  name: "myChart",
  props: {
    categories: [],
    data: [],
  },

  data() {
    return {
      loaded: false,
      chart: null,
    };
  },
  methods: {
    createChart() {
      var chartOptions = {
        series: [
          {
            name: "Inflation",
            data: this.data,
          },
        ],
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: this.categories,
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: "Track the apps you use",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      };

      this.chart1 = new ApexCharts(
        document.querySelector("#chart1"),
        chartOptions
      );
      this.chart1.render();
    },
    updateChart() {
      if (this.chart1) {
        this.chart1.updateOptions({
          xaxis: {
            categories: this.categories,
          },
          series: [
            {
              data: this.data,
            },
          ],
        });
      }
    },
  },
  mounted() {
    if (this.data && this.data.length > 0) {
      this.createChart();
      this.loaded = true;
    }
  },

  watch: {
    data: {
      //immediate: true,
      handler(newVal) {
        //console.log(this.data);
        if (newVal && newVal.length > 0) {
          if (!this.chart1) {
            this.createChart();
          } else {
            this.updateChart();
          }
          this.loaded = true;
        }
      },
    },
  },
};
</script>
.
<style scoped>
.loader {
  margin: 8rem;
}
</style>
