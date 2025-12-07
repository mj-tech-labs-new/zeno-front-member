/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable new-cap */
import { useEffect } from "react"

const ChartGraphs = ({ selectedIndex }: { selectedIndex: string }) => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true

    script.onload = () => {
      // @ts-ignore
      new TradingView.widget({
        container_id: "tv_chart_container",
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval:
          selectedIndex === "1m"
            ? "1"
            : selectedIndex === "3m"
              ? "3"
              : selectedIndex === "5m"
                ? "5"
                : selectedIndex === "15m"
                  ? "15"
                  : selectedIndex === "30m"
                    ? "30"
                    : selectedIndex === "1h"
                      ? "60"
                      : selectedIndex === "4h"
                        ? "240"
                        : selectedIndex === "1d"
                          ? "D"
                          : "W",
        theme: "dark",
        allow_symbol_change: false,
        locale: "en",
        overrides: {
          "paneProperties.background": "#17181B",
          "paneProperties.vertGridProperties.color": "#23262F",
          "paneProperties.horzGridProperties.color": "#23262F",
          "mainSeriesProperties.candleStyle.upColor": "#00C076",
          "mainSeriesProperties.candleStyle.downColor": "#FF6838",
          "paneProperties.separatorColor": "#FF6838",
          "volumePaneSize": 'medium',
        },
        disabled_features: [
          "main_series_scale_menu",
          "header_indicators",
          "legend_inplace_edit",
          "header_resolutions",
          "header_screenshot",
          "header_settings",
          "timeframes_toolbar",
          "header_widget",
          "header_symbol_search",
          "volume_force_overlay",
          "delete_button_in_legend",
          "edit_buttons_in_legend",
        ],
        enabled_features: ["header_fullscreen_button"],
      })
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [selectedIndex])

  return <div id="tv_chart_container" style={{ width: "100%", height: "500px" }} />
}

export default ChartGraphs
