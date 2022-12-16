<template>
  <Line :data="LineData" :options="lineOptions" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    LineData: {
        type: Object,
        required: true
      },
    lineOptions: {
      type: Object,
      default: () => {}
    }
  }
}
</script>