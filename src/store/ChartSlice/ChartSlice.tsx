import {createSlice} from '@reduxjs/toolkit'

import {DrawingData} from '@/types/ChartTypes'

interface ShapeMap {
  trend_line: DrawingData[]
  multi_line: DrawingData[]
}
export interface ChartInitialPropsType {
  totalShapes: Record<string, Partial<ShapeMap>>
}

const initialState: ChartInitialPropsType = {
  totalShapes: {},
}

const ChartSlice = createSlice({
  name: 'chartsTools',
  initialState,
  reducers: {
    addShapes: (state, action) => {
      const {tokenName, shapeName, data} = action.payload
      const tokenData = state.totalShapes?.[tokenName]
      const specificShapeData = tokenData?.[shapeName as keyof ShapeMap]
      const newShapeData = specificShapeData
        ? [...specificShapeData, data]
        : data
      const updatedShapeData = {...tokenData, [shapeName]: newShapeData}
      state.totalShapes[tokenName] = updatedShapeData
    },
  },
})

export const {addShapes} = ChartSlice.actions
export default ChartSlice
