<script>
import VerticalBarGraph from './charts/vertical-bar-graph.vue';

export default {
  components: {
    VerticalBarGraph,
  },
};
</script>

<template>
  <div id="app">
    <VerticalBarGraph
      :data="[20, 45, 28, 80, 99, 43, 50]"
      :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
      :width="500"
      :height="500"
      :barRadius="5"
      barColor="#0d0a0b"
      :baseConfig="{
    hasYAxisBackgroundLines: false,
    hasXAxisBackgroundLines: false,
    height: 500,
    width: 500,
    data: [20, 45, 28, 80, 99, 43, 50],
    xAxisLabelStyle: {
    position: 'right',
    prefix: '$',
    fontFamily: 'Avenir',
    fontSize: 18,
    },
    yAxisLabelStyle: {
    fontFamily: 'Avenir',
    fontSize: 18,
    position: 'bottom',
    },
    }"
      :chartStyle="{
    marginBottom: 80,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: `#ffffff`,
    }"
    />
  </div>
</template>
