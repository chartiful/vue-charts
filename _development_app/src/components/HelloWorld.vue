<script>
import VerticalBarGraph from '@/charts/vertical-bar-graph.vue';

export default {
  components: {
    VerticalBarGraph,
  },
};
</script>

<template>
  <VerticalBarGraph
    :data="[125, 100, 50, 75, 100, 125]"
    :labels="['Q1, 2019', 'Q2, 2019', 'Q3, 2019', 'Q4, 2019', 'Q1, 2020', 'Q2, 2020']"
    :width="500"
    :height="225"
    :barRadius="7"
    barColor="#82d551"
    :baseConfig="{
      hasYAxisBackgroundLines: true,
      xAxisLabelStyle: {
        rotation: 0,
        fontSize: 11,
        width: 60,
        yOffset: 4,
        xOffset: -13
      },
      yAxisLabelStyle: {
        rotation: 30,
        fontSize: 13,
        prefix: '$',
        position: 'bottom',
        xOffset: 15,
        yOffset: -10,
        decimals: 2,
        height: 50
      }
    }"
    :chartStyle="{
      marginBottom: 80,
      padding: 10,
      paddingTop: 20,
      borderRadius: 20,
      backgroundColor: `#e1f5d6`,
    }"
  />
</template>
