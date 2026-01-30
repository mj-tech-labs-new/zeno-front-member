// import { useState } from "react"

// import { DatePickerComponent, DropDown, SearchComponent } from "@/components"
// import { English } from "@/helpers"
// import { DropDownObjectType } from "@/types/CommonTypes"
// import { CustomFilterType } from "@/types/ComponentTypes"

// const CustomFilter = (props: CustomFilterType) => {
//     const { onPressSearch, dropDownData1 = [], dropDownData2 = [], placeHolder1 = '', placeHolder2 = '' } = props
//     const [dropDown1Value, setDropDown1Value] = useState<DropDownObjectType>({ title: 'None' })
//     const [dropDown2Value, setDropDown2Value] = useState<DropDownObjectType>({ title: 'None' })
//     const [dateObject, setDateObject] = useState({ stDate: '', endDate: '' })
//     const [searchValue, setSearchValue] = useState('')

//     return (
//         <div className="w-full flex flex-wrap gap-5">
//             <SearchComponent
//                 onPressSearch={setSearchValue} placeholder={English.E438}
//                 searchValue={searchValue} setSearchValue={setSearchValue} />

//             <div className="flex gap-2 items-center">
//                 <span className="text-13 leading-6! font-switzer! font-light text-primary-color">{English.E437}</span>
//                 <DropDown dropDownData={dropDownData1} />
//                 <DropDown />
//                 <DatePickerComponent />
//             </div>
//         </div>
//     )
// }

// export default CustomFilter
const CustomFilter = () => <div>CustomFilter</div>

export default CustomFilter
