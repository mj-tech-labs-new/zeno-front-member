import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'

import { BasicSkeleton } from '@/components'
import { English } from '@/helpers'
import { ChartUtils } from '@/utils'

import DashboardSectionLayout from './DashboardSectionLayout'

const CertificateBarChart = () => {
    const [isLoading, setIsLoading] = useState()

    ChartJS.register(LinearScale, PointElement, LineElement, LineController, CategoryScale, Tooltip)
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
    const datesArray = useMemo(() => Array.from({ length: 31 }).map((_, index) => index + 1), [])

    const data = useMemo(() => {

        const datasets: any = [
            {
                label: 'Users CreditedAmount',
                backgroundColor: '#12B76A',
                borderColor: '#181818',
                borderWidth: 1,
                barPercentage: 1.6,
                data: []
            }
        ]


        return {
            labels: datesArray,
            datasets
        }
    }, [])

    return (
        <div className={`w-full h-full `}>
            <DashboardSectionLayout singleLineContent={English.E474}>
                {isLoading ? (
                    <BasicSkeleton className="h-150! w-full!" />
                ) : (
                    <div className="flex gap-1.5 h-full items-center  relative ">
                        <span className="text-text-hint-color text_base_utility leading-4! w-8! rotate-270 font-normal">
                            {English.E475}
                        </span>
                        <Bar
                            className=" lg:min-h-82 lg:max-h-112.5 w-full! bg-tertiary-bg-color! rounded-lg overflow-hidden custom_backdrop"
                            data={data as any}
                            options={ChartUtils.ChartBarGraphOptions as any}
                        />


                    </div>
                )}
            </DashboardSectionLayout>
        </div>
    )
}
export default CertificateBarChart