import {ColorType, CrosshairMode} from 'lightweight-charts'

const ChartUtils = {
  chartOptions: {
    layout: {
      textColor: '#B1B5C3',
      background: {
        type: ColorType.Solid,
        color: '#17181B',
      },
      panes: {
        separatorColor: '#3e3e3e',
        separatorHoverColor: '#3e3e3e',
      },
    },
    grid: {
      vertLines: {
        color: '#23262F',
        style: 0,
        visible: true,
      },
      horzLines: {
        color: '#23262F',
        style: 0,
        visible: true,
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    autoSize: true,
  },
  seriesOptions: {
    upColor: '#00C076',
    downColor: '#FF6838',
    borderVisible: false,
    wickUpColor: '#00C076',
    wickDownColor: '#FF6838',
  },
}

export default ChartUtils
