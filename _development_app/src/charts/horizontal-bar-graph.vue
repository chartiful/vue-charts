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
  <div
    :style="{
      marginTop: -(width - height) / 2,
      marginLeft: (width - height) / 2,
      width: height,
      ...chartStyle,
    }"
  >
    <svg :style="{ transform: 'rotate(90deg)' }" :height="height" :width="width">
      <g
        v-if="baseConfig.hasXAxisBackgroundLines !== false"
        v-html="chartBuilder.renderXAxisLines()"
      />
      <g
        v-if="baseConfig.hasYAxisBackgroundLines !== false"
        v-html="chartBuilder.renderYAxisLines()"
      />
      <g v-if="baseConfig.hasXAxisLabels !== false" v-html="chartBuilder.renderXAxisLabels()" />
      <g v-if="baseConfig.hasYAxisLabels !== false" v-html="chartBuilder.renderYAxisLabels()" />
      <g>
        <rect
          v-for="(val, i) in data"
          :key="i"
          :x="
            i * chartBuilder.yLabelSlotWidth + slotGap / 2 + chartBuilder.leftAlignedXAxisLabelWidth
          "
          :y="baseHeight - chartBuilder.calcDataPointHeight(val)"
          :rx="barRadius"
          :width="barWidth"
          :height="
            chartBuilder.calcDataPointHeight(val) < 0 ? 0 : chartBuilder.calcDataPointHeight(val)
          "
          :fill="barColor"
        />
      </g>
    </svg>
  </div>
</template>
