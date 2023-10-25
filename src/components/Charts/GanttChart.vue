<template>
  <div>
    <time-bar :parts="timeBarParts" :width="1600" :height="30" @part-clicked="handlePartClicked" />
  </div>
</template>

<script>
import TimeBar from './TimeBar.vue';

export default {
  name: 'MyComponent',
  components: {
    TimeBar,
  },
  data() {
    return {
      timeBarParts: [
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 50 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 10 },
        { color: 'afk', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 10 },
        { color: 'afk', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 12 },
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 50 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 10 },
        { color: 'afk', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 10 },
        { color: 'afk', id: "as24123asd24521", clickable: true, time: 20 },
        { color: 'unproductive', id: "as24123asd24521", clickable: true, time: 200 },
        { color: 'productive', id: "as24123asd24521", clickable: true, time: 120 },
      ],
    };
  },
  methods: {
    handlePartClicked(part) {
      console.log('Clicked part:', part);
    },
  },
};
</script>
