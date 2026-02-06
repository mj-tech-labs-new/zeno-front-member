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
  ChartBarGraphOptions: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        border: {
          align: 'center',
          display: true,
          color: '#777E90',
        },
        ticks: {
          padding: 10,
          color: '#7D7D7D',
        },
        grid: {
          display: true,
          drawOnChartArea: false,
          drawTicks: true,
          color: '#7D7D7D',
          drawBorder: true,
          offset: false,
        },
      },
      leftY: {
        position: 'left',
        border: {
          display: true,
          color: '#777E90',
        },
        ticks: {
          stepSize: 100,
          color: '#7D7D7D',
        },
      },
      rightY: {
        position: 'right',
        border: {
          display: true,
          color: '#777E90',
        },
        ticks: {
          stepSize: 40,
          color: '#7D7D7D',
        },
        grid: {
          display: true,
          color: '#7D7D7D',
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
    },
  },
}

export default ChartUtils
