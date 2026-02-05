// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   LineController,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
// } from 'chart.js'
// import {useMemo, useState} from 'react'
// import {Bar} from 'react-chartjs-2'

// import {BasicSkeleton, ImageComponent} from '@/components'
// import {English, Images} from '@/helpers'
// import {ChartUtils} from '@/utils'

// import DashboardSectionLayout from '../sections/DashboardSectionLayout'

// const CertificateBarChart = () => {
//   const [isLoading, setIsLoading] = useState()

//   ChartJS.register(
//     LinearScale,
//     PointElement,
//     LineElement,
//     LineController,
//     CategoryScale,
//     Tooltip
//   )
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   )
//   const datesArray = useMemo(
//     () => [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Augst',
//       'Spt',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     []
//   )

//   const data = useMemo(() => {
//     const datasets: any = [
//       {
//         label: 'Users CreditedAmount',
//         backgroundColor: '#12B76A',
//         borderColor: '#181818',
//         data: [],
//       },
//       {
//         label: 'Dataset 2 (Right Axis)',
//         data: [],
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         yAxisID: 'rightY',
//       },
//     ]

//     return {
//       labels: datesArray,
//       datasets,
//     }
//   }, [datesArray])

//   return (
//     <div className={`w-full h-full `}>
//       <DashboardSectionLayout singleLineContent="">
//         {isLoading ? (
//           <BasicSkeleton className="h-150! w-full!" />
//         ) : (
//           <div className="flex flex-col gap-1.5 ">
//             <div className="flex justify-between">
//               <div className="text_lg_utility text-primary-color">
//                 {English.E474}
//               </div>
//               <div className="flex gap-2">
//                 <span className=" secondary_red_filter">{English.E476}</span>
//                 <ImageComponent
//                   className="w-6 [&>img]:secondary_red_filter!"
//                   imageUrl={Images.reloadIcon}
//                 />
//               </div>
//             </div>
//             <div className="flex  gap-1.5 h-full items-center  relative ">
//               <span className="text-text-hint-color text_base_utility leading-4! w-8! rotate-270 font-normal">
//                 {English.E475}
//               </span>
//               <Bar
//                 className=" lg:min-h-82 lg:max-h-112.5 w-full! bg-tertiary-bg-color! rounded-lg overflow-hidden custom_backdrop"
//                 data={data as any}
//                 options={ChartUtils.ChartBarGraphOptions as any}
//               />
//             </div>
//           </div>
//         )}
//       </DashboardSectionLayout>
//     </div>
//   )
// }
// export default CertificateBarChart
