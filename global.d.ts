export declare global {
  interface MenuType {
    menuId: string;
    menuName: string;
    setTimer: number;
    useYn: string;
    endPoint: string;
    sort: number;
    playSort: number;
  };
  interface dragItem {
    type: string;
    id:string;
    index: number;
  };
  interface circleGaugeProps {
    elementID: string;
    data: number;
    config: circleGaugeConfig;
  };
  interface circleColorConf {
    nm: string;
    max: number;
    min: number;
    color: string;
  }
  interface circleGaugeConfig {
    anchor: string;
    arcColor: string;
    circleColor: string;
    width: number;
    height: number;
    textSize: number;
    textColor: string;
    id: string;
    maximum: number;
    minimum: number;
    prefix: string;
    radius: number;
    size: number;
    unit: string;
    x: number;
    y: number;
    decimals: number;
    status: number;
    desc: string;
    valueColor: circleColorConf[];
  };
  interface fluidGaugeProps {
    elementID: string;
    data: number;
    config: fluidGaugeConfig;
  };
  interface fluidColorConf {
    nm: string;
    max: number;
    min: number;
    color: string;
  };
  interface fluidGaugeConfig {
    width: number;
    height: number;
    minValue: number;
    maxValue: number;
    circleThickness: number;
    circleFillGap:number;
    circleColor: string;
    waveHeight: number;
    waveCount: number;
    waveRiseTime: number;
    waveAnimateTime: number;
    waveRise: boolean;
    waveHeightScaling: boolean;
    waveAnimate: boolean;
    waveColor: string;
    waveOffset: number;
    textVertPosition: number;
    textSize: number;
    valueCountUp: boolean;
    displayPercent: boolean;
    textColor: string;
    waveTextColor: string;
    desc: string;
    descColor: string;
    valueColor: fluidColorConf[];
  };
  interface halfGaugeProps {
    elementID: string;
    data: number;
    config: halfGaugeConfig;
    gaugeScore: halfGaugeScore[];
  };
  interface halfGaugeConfig{
    size: number;
    arcSize: number;
    arcThickness: number;
    transitionDuration: number;
    textColor: string;
    titleSize: number;
    desc: string;
  };
  interface halfGaugeScore {
    value: number;
    fill: string;
    sortIndex: number;
    label: string;
    selected?: boolean;
  };
  interface halfScorefGaugeProps {
    elementID: string;
    data: number;
    config: halfScoreGaugeConfig;
    gaugeScore: halfScoreGaugeScore[];
  };
  interface halfScoreGaugeConfig{
    size: number;
    arcSize: number;
    arcThickness: number;
    transitionDuration: number;
    scoreColorSet: string[];
    textColor: string;
    titleSize: number;
    prefix: string;
  };
  interface halfScoreGaugeScore {
    value: number;
    sortIndex: number;
    fill?: string;
    label?: string;
    selected?: boolean;
  };
  interface scoreGaugeProps{
    elementID: string;
    dataSet: scoreGaugeDataSet[];
    config: scoreGaugeConfig;
  };
  interface scoreGaugeConfig{
    width: number;
    height: number;
    TEXTGAP: number;
    titleWidth: number;
    titleHeight: number;
  };
  interface scoreGaugeDataSet{
    name: string;
    value: number;
    color?: string;
  };
  interface lineGaugeProps {
    elementID: string;
    config: lineGaugeConfig;
    colorConf: lineColorConf[];
  };
  interface lineGaugeConfig{
    width: number;
    height: number;
    barColor: string;
    valueColor: string;
    scoreColor: string;
    pointerColor: string;
    id: string;
    unit?: string;
    maximum: number;
    minimum: number;
    height: number;
    x: number;
    y: number;
    titleWidth: number;
    titleHeight: number;
    data: number;
    prefix: string;
  };
  interface lineColorConf{
    nm: string;
    max: number;
    min: number;
    color: string;
  };
  interface stackedBarProps{
    elementID: string;
    config: stackedBarConfig;
    data: stackedBarDataSet[];
  };
  interface stackedBarConfig{
    width: number;
    height: number;
    margin: stackedBarMargin;
    columns: stackedBarColumnConf[];
    xTitleColor: string;
    xTitle: string;
    maximum: number;
    minimum: number;
  };
  interface stackedBarDataSet{
    id: string;
    date: string;
    value: number;
  };
  interface stackedBarMargin {
    top:  number;
    right:  number;
    bottom:  number;
    left:  number;
  };
  interface stackedBarColumnConf {
    id: string;
    name: string;
    color: string;
    data?: stackedBarDataSet[];
  }
}