<template>
  <div>

    <canvas id="myChart" style="width: 393px; height: 393px;"></canvas>

  </div>
</template>
<script>

import Chart from 'chart.js/auto';
export default {
  name: 'PieChart',
  props: {
    msg: String
  },
  mounted() {
    console.log("Component mounted.");
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Youtube.com",
          "ubis.com",
          "googleflight.com",
          "terziondx.com",
          "mypage.com",
          "udemy.com",
          "cooll.com",

        ],
        datasets: [{
          label: 'My First Dataset',
          data: [90, 5, 1, 1, 1, 1, 1],

          backgroundColor: ["#00a9b5", "#00c698", "#0045a5"],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          labels: {
            fontSize: 14,
            fontColor: '#000',
            fontStyle: 'bold',
            padding: 20
          }
        }

      }


    });
    myChart


  }
}
</script>