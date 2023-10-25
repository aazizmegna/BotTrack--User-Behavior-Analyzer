<template>
  <v-row>
    <v-col lg="12">
      <v-card
        height="300px"
        v-for="item in workingPeriod"
        v-bind:key="item.id"
        color="#ecf5ff"
        class="smooth-card"
      >
        <v-card-title>Working time for {{ item.workingDay }}</v-card-title>
        <table>
          <tr>
            <th></th>
            <th>Expected</th>
            <th>Actual</th>
          </tr>
          <tr>
            <td>Start time</td>
            <td>{{ item.expectedStart }}</td>
            <td>{{ item.start }}</td>
          </tr>
          <tr>
            <td>End time</td>
            <td>{{ item.expectedEnd }}</td>
            <td>{{ item.end }}</td>
          </tr>
          <tr>
            <td>Work</td>
            <td>{{ item.expectedTotal }}</td>
            <td>{{ item.totalProductive }}</td>
          </tr>
        </table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["workingPeriod"],
};
</script>

<style scoped>
.smooth-card {
  border-radius: 12px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.smooth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.smooth-card-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #2d4059;
  padding: 24px;
  background-color: #fff;
}

.smooth-card-icon {
  font-size: 36px;
  color: #22a5ff;
  margin-right: 12px;
}

.thick-card {
  border: 1px solid #ecf5ff;
}

.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}

th,
td {
  padding: 15px;
}
</style>
