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
import {English, Images} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'
import {ChartApiData} from '@/types/Rewards'
import {ChartUtils} from '@/utils'

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
  const datesArray = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Augst',
      'Spt',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  )

  const data = useMemo(() => {
    const datasets: any = [
      {
        label: 'Rewared Stats',
        backgroundColor: '#12B76A',
        yAxisID: 'leftY',
        borderColor: '#181818',
        data: chartData?.map((item) => ({
          x: datesArray?.[(item?.month ?? 1) - 1],
          y: item?.total_month_points,
        })),
        tooltip: {
          label: 'asdf',
        },
      },
      {
        label: 'Rewared Stats',
        backgroundColor: '#12B76A',
        yAxisID: 'rightY',
        borderColor: '#181818',
        // barPercentage: 0.5,
        data: [],
        tooltip: {
          label: 'asdf',
        },
      },
    ]

    return {
      labels: datesArray,
      datasets,
    }
  }, [chartData, datesArray])

  const handleGetRewardStatChart = useCallback(() => {
    loaderRef.current?.showLoader(true)
    loaderRef.current?.showLoader(true)
    setIsLoading(true)

    RewardApi.GetChartRewardStats({year: 2026})
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
                {English.E474}
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
                options={ChartUtils.ChartBarGraphOptions as any}
              />
            </div>
          </div>
        )}
      </DashboardSectionLayout>
    </div>
  )
}
export default CertificateBarChart
