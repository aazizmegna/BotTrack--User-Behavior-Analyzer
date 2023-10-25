<template>
  <div id="chart">
    <apexchart type="radialBar" height="410" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["seriesData"],
  data() {
    return {
      series: this.seriesData,
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Work Done"],
      },
    };
  },
  watch: {
    seriesData(newVal) {
      this.series = newVal
    }
  }
};
</script>
