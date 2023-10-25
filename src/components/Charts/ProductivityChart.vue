<template>
  <div>
    <div v-if="showChart">
      <apexchart
        type="donut"
        height="382"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div v-else class="nodata">
      <!--<p>No data to display.</p>-->
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["seriesData", "labelsData"],
  data() {
    return {
      series: this.seriesData, //[200, 55, 41, 17],
      chartOptions: {
        chart: {
          width: 380,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
        },
        colors: ["#4CAF50", "#F44336", "#2196F3", "#FFC107"],
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  formatter: function (w) {
                    let totalSeconds = w.globals.seriesTotals.reduce(
                      (acc, curr) => acc + curr
                    );
                    let hours = Math.floor(totalSeconds / 3600);
                    let minutes = Math.floor((totalSeconds % 3600) / 60);
                    let seconds = Math.round(totalSeconds % 60);
                    let hms = "";

                    if (hours !== 0) hms += hours + "h ";
                    if (minutes !== 0) hms += minutes + "m ";
                    if (seconds !== 0 || (hours === 0 && minutes === 0))
                      hms += seconds + "s";

                    return w.globals.collapsed ? "" : hms;
                  },
                },
                value: {
                  showAlways: true,
                  show: true,
                  formatter: function (val) {
                    let totalSeconds = val;
                    let hours = Math.floor(totalSeconds / 3600);
                    let minutes = Math.floor((totalSeconds % 3600) / 60);
                    let seconds = Math.round(totalSeconds % 60);
                    let hms = "";

                    if (hours !== 0) hms += hours + "h ";
                    if (minutes !== 0) hms += minutes + "m ";
                    if (seconds !== 0 || (hours === 0 && minutes === 0))
                      hms += seconds + "s";

                    return hms;
                  },
                },
              },
            },
          },
        },
        labels: this.labelsData,
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },
        fill: {
          colors: ["#4CAF50", "#F44336", "#2196F3", "#FFC107"],
        },
        states: {
          hover: {
            filter: "none",
          },
        },
        theme: {
          palette: "palette2",
        },
        title: {
          text: "", //"Favourite Movie Type",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              let totalSeconds = val;
              let hours = Math.floor(totalSeconds / 3600);
              let minutes = Math.floor((totalSeconds % 3600) / 60);
              let seconds = Math.round(totalSeconds % 60);
              let hms = "";

              if (hours !== 0) hms += hours + "h ";
              if (minutes !== 0) hms += minutes + "m ";
              if (seconds !== 0 || (hours === 0 && minutes === 0))
                hms += seconds + "s";

              return hms;
            },
          },
        },
      },
    };
  },
  computed: {
    showChart() {
      return this.labelsData.length > 0;
    },
  },
  watch: {
    seriesData(newSeries, oldSeries) {
      if (newSeries !== oldSeries) {
        this.series = newSeries;
      }
    },
    labelsData(newLabels, oldLabels) {
      if (newLabels !== oldLabels) {
        this.chartOptions.labels = newLabels;
      }
    },
  },
};
</script>
<style scoped>
.nodata {
  height: 382px;
}
</style>
