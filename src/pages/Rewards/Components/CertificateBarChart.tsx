import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Bar} from 'react-chartjs-2'

import {BasicSkeleton, ImageComponent, Loader} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {ChartApiData} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'
import DashboardSectionLayout from '../sections/DashboardSectionLayout'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartAreaBgPlugin = {
  id: 'chartAreaBgPlugin',
  beforeDraw: (chart: any) => {
    const {ctx, chartArea} = chart
    if (!chartArea) return

    ctx.save()
    ctx.fillStyle = '#1C1C1C'
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.right - chartArea.left,
      chartArea.bottom - chartArea.top
    )
    ctx.restore()
  },
}

const CertificateBarChart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<ChartApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)
  const maxValue = useMemo(() => {
    const newArray = chartData?.map((item) => item.daily_login_points)
    // console.log(newArray)
    return Math.max(...(newArray ?? [0]))
  }, [chartData])

  const ChartBarGraphOptions = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'nearest',
      intersect: true,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#242424',
        titleColor: '#12B76A',
        borderradius: 8,
        bodyColor: '#FFFFFF',
        borderColor: '#2F2F2F',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const raw: ChartApiData =
              context.dataset.rawDataArray?.[context.dataIndex]

            if (!raw) return `Total: ${context.raw}`

            return [
              `${English.E500} ${raw.daily_login_points}`,
              `${English.E501} ${raw.self_purchased_points}`,
              `${English.E502} ${raw.referral_points}`,
              `${English.E503} ${raw.referral_purchased_points}`,
              `${English.E504} ${raw.challenge_passed_points}`,
              `${English.E506} ${raw.registration_points}`,
              `${English.E507} ${raw.social_media_points}`,
              ``,
              `${English.E505} ${raw.total_month_points}`,
            ]
          },
        },
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
        title: {
          display: true,
          text: English.E475,
          color: '#7D7D7D',
          padding: {bottom: 10},
        },
        border: {
          display: true,
          color: '#777E90',
        },
        ticks: {
          stepSize: Math.ceil((5 * maxValue) / 100),
          color: '#7D7D7D',
        },
      },
      rightY: {
        position: 'none',
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
  }

  const datesCurrentArray = Array.from({
    length: Utility.getMonthDays(),
  }).map((_, index) => {
    const month = Utility.getMonth()
    const day = Constants.dateArray?.[month]
    return `${day} ${index + 1}`
  })

  const data = useMemo(() => {
    const daysInMonth = Utility.getMonthDays()
    const monthlyValues = Array(daysInMonth).fill(0)
    const monthlyRawData: (ChartApiData | null)[] =
      Array(daysInMonth).fill(null)

    chartData?.forEach((item) => {
      const dateObj = new Date(`${item.day}T00:00:00`)
      const dayIndex = dateObj.getDate() - 1

      monthlyValues[dayIndex] = item.total_month_points
      monthlyRawData[dayIndex] = item
    })

    return {
      labels: datesCurrentArray,
      datasets: [
        {
          label: 'Reward Stats',
          backgroundColor: '#12B76A',
          yAxisID: 'leftY',
          barPercentage: 0.9,
          categoryPercentage: 0.9,
          data: monthlyValues,
          rawDataArray: monthlyRawData,
        },
      ],
    }
  }, [chartData, datesCurrentArray])

  const handleGetRewardStatChart = useCallback(() => {
    loaderRef.current?.showLoader(true)
    setIsLoading(true)

    const month = Utility.getMonth()

    RewardApi.GetChartRewardStats({
      month: month + 1,
      year: 2026,
    })
      .then((res) => {
        if (res) {
          setChartData(res?.data)
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    handleGetRewardStatChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full">
      <Loader ref={loaderRef} />

      <DashboardSectionLayout singleLineContent="">
        {isLoading ? (
          <BasicSkeleton className="h-150! w-full!" />
        ) : (
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="text_lg_utility text-primary-color">
                {English.E507}
              </div>

              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleGetRewardStatChart}
              >
                <span className="secondary_red_filter">{English.E476}</span>
                <ImageComponent
                  className="w-6 [&>img]:secondary_red_filter!"
                  imageUrl={Images.reloadIcon}
                />
              </div>
            </div>

            <div className="relative h-full">
              <Bar
                className="lg:min-h-82 lg:max-h-112.5 w-full! rounded-lg"
                data={data as any}
                options={ChartBarGraphOptions as any}
                plugins={[chartAreaBgPlugin]}
              />
            </div>
          </div>
        )}
      </DashboardSectionLayout>
    </div>
  )
}

export default memo(CertificateBarChart)
