<script>
import ChartBuilder from './chart-builder';

export default {
  props: {
    data: {
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
    hasLine: {
      type: Boolean,
      default: true,
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    isBezier: {
      type: Boolean,
      default: true,
    },
    hasShadow: {
      type: Boolean,
      default: true,
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
    lineColor: {
      type: String,
      default: '#000000',
    },
    dotColor: {
      type: String,
      default: '#000000',
    },
    dotSize: {
      type: Number,
      defualt: 5,
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
  methods: {
    calcXPosition(val) {
      return (
        (val * (this.width - this.chartBuilder.xAxisLabelWidth)) / (this.data.length - 1)
        + this.chartBuilder.leftAlignedXAxisLabelWidth
        + this.widthAdjustments
      );
    },

    calcYPosition(val) {
      return (
        this.baseHeight - this.chartBuilder.calcDataPointHeight(val) + this.heightAdjustments / 2
      );
    },
  },
  computed: {
    widthAdjustments() {
      if (this.hasDots) {
        return this.chartBuilder.xAxisLabelPosition === 'right' ? this.dotSize : -this.dotSize;
      }
      return 0.01;
    },

    heightAdjustments() {
      return this.dotSize > this.lineWidth ? this.dotSize : this.lineWidth;
    },

    getLinePoints() {
      return this.data
        .map((d, i) => `${this.calcXPosition(i)},${this.calcYPosition(d)}`)
        .join(' ');
    },

    getBezierLinePath() {
      if (this.data.length === 0) {
        return 'M0,0';
      }
      const points = this.data.slice(0, this.data.length - 1);

      const paths = points.map((_, i) => {
        const xMid = (this.calcXPosition(i) + this.calcXPosition(i + 1)) / 2;
        const yMid = (this.calcYPosition(this.data[i]) + this.calcYPosition(this.data[i + 1])) / 2;
        const cpX1 = (xMid + this.calcXPosition(i)) / 2;
        const cpX2 = (xMid + this.calcXPosition(i + 1)) / 2;
        return (
          `Q ${cpX1}, ${this.calcYPosition(this.data[i])}, ${xMid}, ${yMid}`
          + ` Q ${cpX2}, ${this.calcYPosition(this.data[i + 1])}, ${this.calcXPosition(
            i + 1,
          )}, ${this.calcYPosition(this.data[i + 1])}`
        );
      });
      return [`M${this.calcXPosition(0)},${this.calcYPosition(this.data[0])}`]
        .concat(paths)
        .join(' ');
    },
    renderLine() {
      const points = this.getLinePoints;
      return `<polyline
        key="${Math.random()}"
        points="${points}"
        fill="none"
        stroke="${this.lineColor}"
        strokeWidth="${this.lineWidth}"
        />`;
    },

    renderDots() {
      let newHTML;
      this.data.forEach((d, i) => {
        newHTML += `<circle
          key=${Math.random()}
          cx=${this.calcXPosition(i)}
          cy=${this.calcYPosition(d)}
          fill=${this.dotColor}
          r=${this.dotSize}
        />`;
      });
      return newHTML;
    },

    renderBezierLine() {
      const d = this.getBezierLinePath;
      return `<path
        key="${Math.random()}"
        d="${d}"
        fill="none"
        stroke="${this.lineColor}"
        strokeWidth="${this.lineWidth}"
         />`;
    },

    renderShadow() {
      const points = `${this.getLinePoints} ${this.shadowStart},${this.baseHeight} ${this.shadowEnd},${this.baseHeight}`;
      return `<polygon
        key="${Math.random()}"
        points="${points}"
        fill="url(#shadow)"
        strokeWidth="${0}"
        />`;
    },

    renderBezierShadow() {
      const d = `${this.getBezierLinePath} L${this.shadowStart},${this.baseHeight} L${this.shadowEnd},${this.baseHeight} Z`;
      return `<path
        key="${Math.random()}"
        d="${d}"
        fill="url(#shadow)"
        strokeWidth="${0}"
        />`;
    },

    shadowStart() {
      return this.calcXPosition(this.data.length - 1);
    },

    shadowEnd() {
      return this.calcXPosition(0);
    },

    baseHeight() {
      return (
        this.chartBuilder.baseHeight
        + this.heightAdjustments / 2
        - this.chartBuilder.yAxisLabelHeight
      );
    },
  },
};
</script>

<template>
  <div :style="chartStyle">
    <svg :height="height" :width="width">
      <linearGradient id="shadow" :x1="0" :x2="0" :y1="0" :y2="height">
        <stop offset="0" :stop-color="lineColor" stop-opacity="0.1" />
        <stop offset="1" :stop-color="lineColor" stop-opacity="0" />
      </linearGradient>
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
      <g v-if="hasLine && isBezier !== false" v-html="this.renderBezierLine" />
      <g v-else-if="hasLine" v-html="this.renderLine" />
      <g v-if="hasShadow && isBezier !== false" v-html="this.renderBezierShadow" />
      <g v-else-if="hasShadow !== false" v-html="this.renderShadow" />
      <g v-if="hasDots !== false" v-html="this.renderDots" />
    </svg>
  </div>
</template>
