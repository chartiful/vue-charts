import { BaseChartConfig } from './types';

export default class ChartBuilder {
  data: number[]

  labels: string[]

  startAtZero: boolean

  height: number

  width: number

  hasXAxisLabels?: boolean

  hasYAxisLabels?: boolean

  xAxisLabelCount: number

  yAxisLabelCount?: number

  xAxisPrefix?: string

  xAxisSuffix?: string

  xAxisLabelStyle?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    rotation?: number;
    xOffset?: number;
    yOffset?: number;
    prefix?: string;
    suffix?: string;
    position?: string;
    width?: number;
    decimals?: number;
  }

  yAxisLabelStyle?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    rotation?: number;
    xOffset?: number;
    yOffset?: number;
    position?: string;
    height?: number;
  }

  hasXAxisBackgroundLines?: boolean

  hasYAxisBackgroundLines?: boolean

  xAxisBackgroundLineStyle?: {
    strokeWidth?: number;
    color?: string;
  }

  yAxisBackgroundLineStyle?: {
    strokeWidth?: number;
    color?: string;
  }

  minVal: number

  maxVal: number

  public baseHeight: number

  public Y_AXIS_LABEL_HEIGHT: number

  public X_AXIS_LABEL_WIDTH: number

  public xAxisLabelWidth: number

  public leftAlignedXAxisLabelWidth: number

  public xAxisLabelPosition: string

  public yDistanceBetweenXLabels: number

  public yAxisLabelHeight: number

  public yLabelSlotWidth: number

  private deltaBetweenGreatestAndLeast: number

  constructor({
    data,
    labels,
    startAtZero = true,
    height,
    width,
    hasXAxisLabels = true,
    hasYAxisLabels = true,
    xAxisLabelCount,
    xAxisLabelStyle,
    yAxisLabelStyle,
    hasXAxisBackgroundLines = true,
    hasYAxisBackgroundLines = true,
    xAxisBackgroundLineStyle = {
      strokeWidth: 1,
      color: '#000000',
    },
    yAxisBackgroundLineStyle = {
      strokeWidth: 1,
      color: '#000000',
    },
  }: BaseChartConfig) {
    this.X_AXIS_LABEL_WIDTH = 50;
    this.Y_AXIS_LABEL_HEIGHT = 50;

    this.data = data;
    this.labels = labels || [...new Array(this.data.length)].map((_, i) => i.toString());

    this.startAtZero = startAtZero;

    this.height = height;
    this.width = width;

    this.hasXAxisLabels = hasXAxisLabels;
    this.hasYAxisLabels = hasYAxisLabels;

    this.xAxisLabelStyle = xAxisLabelStyle;
    this.yAxisLabelStyle = yAxisLabelStyle;

    this.hasXAxisBackgroundLines = hasXAxisBackgroundLines;
    this.hasYAxisBackgroundLines = hasYAxisBackgroundLines;

    this.yAxisBackgroundLineStyle = yAxisBackgroundLineStyle;
    this.xAxisBackgroundLineStyle = xAxisBackgroundLineStyle;

    this.xAxisLabelCount = xAxisLabelCount === undefined ? 4 : xAxisLabelCount;

    this.maxVal = Math.max(...this.data);
    this.minVal = Math.min(...this.data);

    this.xAxisLabelWidth = hasXAxisLabels ? this.X_AXIS_LABEL_WIDTH : 0;
    this.xAxisLabelPosition = 'left';
    this.leftAlignedXAxisLabelWidth = hasXAxisLabels ? this.X_AXIS_LABEL_WIDTH : 0;

    this.yAxisLabelHeight = hasYAxisLabels ? this.Y_AXIS_LABEL_HEIGHT : 0;

    if (this.yAxisLabelStyle) {
      this.yAxisLabelHeight = this.yAxisLabelStyle.height || this.yAxisLabelHeight;
    }
    this.yDistanceBetweenXLabels = (height - this.yAxisLabelHeight) / (this.xAxisLabelCount);

    if (this.xAxisLabelStyle) {
      this.xAxisLabelWidth = this.xAxisLabelStyle.width || this.xAxisLabelWidth;
      this.xAxisLabelPosition = this.xAxisLabelStyle.position || this.xAxisLabelPosition;
      this.leftAlignedXAxisLabelWidth = this.xAxisLabelPosition === 'left' ? this.xAxisLabelWidth : 0;
    }

    this.yLabelSlotWidth = (this.width - this.xAxisLabelWidth) / this.data.length;

    this.deltaBetweenGreatestAndLeast = this.startAtZero
      ? Math.max(...this.data) || 1
      : Math.max(...this.data) - Math.min(...this.data) || 1;

    if (this.minVal >= 0 && this.maxVal >= 0) {
      this.baseHeight = height;
    } else if (this.minVal < 0 && this.maxVal > 0) {
      this.baseHeight = (height * this.maxVal) / this.deltaBetweenGreatestAndLeast;
    } else {
      this.baseHeight = 0;
    }
  }

  public calcDataPointHeight(val: number): number {
    const max: number = Math.max(...this.data);

    if (this.startAtZero) {
      return (this.height - this.yAxisLabelHeight) * (val / this.maxVal);
    } if (this.minVal >= 0 && max >= 0) {
      return (this.height - this.yAxisLabelHeight)
        * ((val - this.minVal) / this.deltaBetweenGreatestAndLeast);
    }
    return this.height * ((val - max) / this.deltaBetweenGreatestAndLeast);
  }

  public renderXAxisLines() {
    let color = '#00000';
    let strokeWidth = 1;

    if (this.xAxisBackgroundLineStyle) {
      color = this.xAxisBackgroundLineStyle.color || color;
      strokeWidth = this.xAxisBackgroundLineStyle.strokeWidth || strokeWidth;
    }

    let newHTML: string;

    [...new Array((this.xAxisLabelCount || 4) + 1)].forEach((_, i) => {
      newHTML += `<line
        x1="${this.leftAlignedXAxisLabelWidth}"
        x2="${this.width - (this.leftAlignedXAxisLabelWidth ? 0 : this.xAxisLabelWidth)}"
        y1="${this.yDistanceBetweenXLabels * i}"
        y2="${this.yDistanceBetweenXLabels * i}"
        y1="${0}"
        y2="${this.baseHeight}"
        stroke="${color}"
        strokeDasharray="${'5, 10'}"
        strokeWidth="${strokeWidth}"
      />`;
    });

    return newHTML;
  }
}
