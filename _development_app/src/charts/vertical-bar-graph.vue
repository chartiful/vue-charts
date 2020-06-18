<script>
import ChartBuilder from './chart-builder';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    barRadius: {
      type: Number,
      default: 0,
    },
    barWidthPercentage: {
      type: Number,
      default: 0.7,
    },
    barColor: {
      type: String,
      default: 'black',
    },
    chartStyle: {
      type: Object,
      required: true,
    },
    baseConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartBuilder: {},
    };
  },
  created() {
    this.chartBuilder = new ChartBuilder({
      data: this.data,
      labels: this.labels,
      height: this.height,
      width: this.width,
      ...this.baseConfig,
    });
  },
  computed: {
    baseHeight() {
      return this.height - this.chartBuilder.yAxisLabelHeight;
    },
    barWidth() {
      return this.chartBuilder.yLabelSlotWidth * this.barWidthPercentage;
    },
    slotGap() {
      return this.chartBuilder.yLabelSlotWidth - this.barWidth;
    },
  },
};
</script>

<template>
  <div :style="chartStyle" >
    <svg :height="height" :width="width">
      <g
        v-if="baseConfig.hasXAxisBackgroundLines !== false"
        v-html="chartBuilder.renderXAxisLines()"
      />
      <g>
        <rect
          v-for="(val, i) in data"
          :key="i"
          :x="(i * chartBuilder.yLabelSlotWidth) + (slotGap / 2) +
            chartBuilder.leftAlignedXAxisLabelWidth"
          :y="baseHeight - chartBuilder.calcDataPointHeight(val)"
          :rx="barRadius"
          :width="barWidth"
          :height="chartBuilder.calcDataPointHeight(val) < 0
            ? 0
            : chartBuilder.calcDataPointHeight(val)"
          :fill="barColor"
        />
      </g>
    </svg>
  </div>
</template>
