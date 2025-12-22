import {createSlice} from '@reduxjs/toolkit'

// eslint-disable-next-line import-x/no-cycle
import {DrawingData, TokenDetails} from '@/types/ChartTypes'
import {ChartTimePeriodType} from '@/types/UnionTypes'

interface ShapeMap {
  trend_line: DrawingData[]
  multi_line: DrawingData[]
}
export interface ChartInitialPropsType {
  totalShapes: Record<string, Partial<ShapeMap>>
  frame: ChartTimePeriodType | null
  amountType: string
  selectedToken: Pick<TokenDetails, 'token_symbol'> | string
}

const initialState: ChartInitialPropsType = {
  totalShapes: {},
  frame: '1m',
  amountType: 'USDT',
  selectedToken: 'BONK',
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
    addFrame: (state, action) => {
      const {frame} = action.payload
      state.frame = frame
    },
    removeFrame: (state) => {
      state.frame = null
    },
    addAmountType: (state, action) => {
      const {amount} = action.payload
      state.amountType = amount
    },
    removeAmountType: (state) => {
      state.amountType = ''
    },
    addCoinToken: (state, action) => {
      const {token} = action.payload
      state.selectedToken = token
    },
    removeCoinToken: (state) => {
      state.selectedToken = ''
    },
  },
})

export const {
  addShapes,
  addFrame,
  removeFrame,
  addAmountType,
  removeAmountType,
  addCoinToken,
  removeCoinToken,
} = ChartSlice.actions
export default ChartSlice.reducer
