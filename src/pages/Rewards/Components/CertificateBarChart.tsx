import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Bar} from 'react-chartjs-2'

import {BasicSkeleton, ImageComponent, Loader} from '@/components'
import {Constants, English, Images, Utility} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {ChartApiData} from '@/types/Rewards'

import RewardApi from '../api/RewardApi'
import DashboardSectionLayout from '../sections/DashboardSectionLayout'

const CertificateBarChart = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<ChartApiData[] | null>([])
  const loaderRef = useRef<AppLoaderRef>(null)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const ChartBarGraphOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
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
            const raw: ChartApiData = context.raw.rawData

            return [
              `${English.E500} ${raw.daily_login_points}`,
              `${English.E501} ${raw.self_purchased_points}`,
              `${English.E502} ${raw.refferal_points}`,
              `${English.E503} ${raw.refferal_purchased_points}`,
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
  const datesCurrentArray = Array.from({length: Utility.getMonthDays()})?.map(
    (__, index) => {
      const month = Utility.getMonth()
      const day = Constants.dateArray?.[month]
      const finalDay = `${day} ${index + 1}` as unknown as any
      return finalDay as unknown as any
    }
  )

  const data = useMemo(() => {
    const datasets: any = [
      {
        label: 'Rewared Stats',
        backgroundColor: '#12B76A',
        yAxisID: 'leftY',
        borderColor: '#181818',
        data: chartData?.map((item) => {
          const dateObj = new Date(`${item?.day}T00:00:00`)
          const dateOnly = dateObj.getDate()

          return {
            x: datesCurrentArray?.[dateOnly - 1],
            y: item?.total_month_points,
            rawData: item,
          }
        }),
      },
    ]

    return {
      labels: datesCurrentArray,
      datasets,
    }
  }, [chartData, datesCurrentArray])

  const handleGetRewardStatChart = useCallback(() => {
    loaderRef.current?.showLoader(true)
    loaderRef.current?.showLoader(true)
    setIsLoading(true)
    const month = Utility.getMonth()

    RewardApi.GetChartRewardStats({month: month + 1, year: 2026})
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
    <div className={`w-full h-full `}>
      <Loader ref={loaderRef} />

      <DashboardSectionLayout singleLineContent="">
        {isLoading ? (
          <BasicSkeleton className="h-150! w-full!" />
        ) : (
          <div className="flex flex-col gap-1.5 ">
            <div className="flex justify-between">
              <div className="text_lg_utility text-primary-color">
                {English.E507}
              </div>

              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleGetRewardStatChart}
              >
                <span className=" secondary_red_filter">{English.E476}</span>
                <ImageComponent
                  className="w-6 [&>img]:secondary_red_filter!"
                  imageUrl={Images.reloadIcon}
                />
              </div>
            </div>
            <div className="flex  gap-1.5 h-full items-center  relative ">
              <span className="text-text-hint-color text_base_utility leading-4! w-8! rotate-270 font-normal">
                {English.E475}
              </span>
              <Bar
                className=" lg:min-h-82 lg:max-h-112.5 w-full! bg-tertiary-bg-color! rounded-lg overflow-hidden custom_backdrop"
                data={data as any}
                options={ChartBarGraphOptions as any}
              />
            </div>
          </div>
        )}
      </DashboardSectionLayout>
    </div>
  )
}
export default CertificateBarChart
