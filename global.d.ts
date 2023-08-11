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
    valueColor: fluidColorConf[];
  }
}