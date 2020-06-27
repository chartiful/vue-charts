<script lang="ts">
import Vue from 'vue';
import VerticalBarGraph from '../../vertical-bar-graph/src/index.vue';
import LineGraph from '../../line-graph/src/index.vue';
import HorizontalBarGraph from '../../horizontal-bar-graph/src/index.vue';

export default Vue.extend({
  components: {
    VerticalBarGraph,
    LineGraph,
    HorizontalBarGraph,
  },
});
</script>

<template>
  <div id="app">
    <LineGraph
      :data="[0, 20, 10, 20, 30]"
      :width="500"
      :height="425"
      :lineColor="'black'"
      :lineWidth="5"
      :dotColor="'black'"
      :dotSize="10"
      :isBezier="true"
      :hasDots="true"
      :hasLine="true"
      :hasShadow="true"
      :baseConfig="{
        startAtZero: false,
        hasXAxisLabels: true,
        hasYAxisLabels: true,
        hasXAxisBackgroundLines: false,
        hasYAxisBackgroundLines: false,
        data: [0, 20, 10, 20, 30],
        height: 425,
        width: 500,
      }"
      :chartStyle="{
        marginBottom: 60,
      }"
    />
    <br />
    <br />
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
    <br />
    <br />
    <div>
      <HorizontalBarGraph
        :data="[20, 45, 28, 80, 99, 43, 50]"
        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
        :width="500"
        :height="500"
        :barRadius="5"
        barColor="#0d0a0b"
        :baseConfig="{
          hasYAxisBackgroundLines: false,
          hasXAxisBackgroundLines: false,
          hasYAxisLabels: false,
          hasXAxisLabels: false,
          height: 500,
          width: 500,
          data: [20, 45, 28, 80, 99, 43, 50],
        }"
        :chartStyle="{
          marginBottom: 0,
          padding: 10,
          paddingTop: 20,
          borderRadius: 20,
          backgroundColor: `#ffffff`,
        }"
      />
    </div>
    <br />
    <br />
  </div>
</template>
