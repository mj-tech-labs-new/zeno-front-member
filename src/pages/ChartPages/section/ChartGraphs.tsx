import {memo} from 'react'
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets'

import {ChartTimePeriodType} from '@/types/UnionTypes'

const ChartGraphs = (props: {selectedIndex: ChartTimePeriodType}) => {
  const {selectedIndex} = props
  return (
    <AdvancedRealTimeChart
      autosize
      allow_symbol_change={false}
      enabled_features={['header_fullscreen_button']}
      save_image={false}
      symbol="Binance:BTCUSDT"
      theme="dark"
      disabled_features={[
        'main_series_scale_menu',
        'header_indicators',
        'header_resolutions',
        'header_screenshot',
        'header_settings',
        'timeframes_toolbar',
        'header_widget',
        'header_symbol_search',
        'legend_context_menu',
        'pane_context_menu',
      ]}
      interval={
        selectedIndex === '1m'
          ? '1'
          : selectedIndex === '3m'
            ? '3'
            : selectedIndex === '5m'
              ? '5'
              : selectedIndex === '15m'
                ? '15'
                : selectedIndex === '30m'
                  ? '30'
                  : selectedIndex === '1h'
                    ? '60'
                    : selectedIndex === '4h'
                      ? '240'
                      : selectedIndex === '1d'
                        ? 'D'
                        : 'W'
      }
    />
  )
}

export default memo(ChartGraphs)
