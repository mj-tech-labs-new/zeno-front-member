import {isFinite, isNaN} from 'lodash'

const numberConversion = (content: number, maxFraction?: number) => {
  const hasDecimal = content % 1 !== 0

  if (!hasDecimal) {
    return `${new Intl.NumberFormat('en-US').format(content)}.00`
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: maxFraction ?? 2,
    maximumFractionDigits: maxFraction ?? 2,
  }).format(content)
}

const trimMultipleSpaces = (content: string, noSpacing?: boolean) => {
  if (noSpacing) {
    return content.trim().replace(/\s+/g, '')
  }
  return content.trim().replace(/\s+/g, ' ')
}

const isValidEmail = (content: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(content)
}

const validFloatNumber = (content: string) => {
  const newContent = content.replace(/[^0-9.eE+-]/g, '')
  return newContent
}

const ScrollToSectionUtility = (id: string) => {
  const sectionContainer = document.getElementById(id)
  if (!sectionContainer) return
  sectionContainer.scrollIntoView({behavior: 'smooth', block: 'start'})
}
const validPointValue = (value: string | number) => {
  const newvalue = value
    .toString()
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1')

  return newvalue
}
const removeDecimal = (value: number, maxValue?: number) => {
  const newValue = Number(value).toFixed(maxValue ?? 3)
  return newValue
}

const convertScientificToNormalNum = (value: number) => {
  const magnitude = Math.floor(Math.log10(Math.abs(value))) + 1
  const newValue = value.toPrecision(Math.max(magnitude, 1))

  return newValue
}

const isValidNumber = (value: string) => {
  const newValue = value.replace(/\D/g, '')
  return newValue
}

const colorGeneratorUtility = (value: number) => {
  const colorValue = !value?.toString()?.startsWith('-')
    ? 'text-chart-green-color'
    : 'text-chart-red-color'
  return colorValue
}
const isPasswordValid = (value: string) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  return regex.test(value)
}

const largeNumberNotationConversion = (content: number) => {
  const newIntlNumber = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return newIntlNumber.format(content)
}

const converToPositiveValue = (content: number) => (content < 0 ? 0 : content)

const formatTo8Decimals = (value: number) => {
  if (!isFinite(value) || isNaN(value)) return '0'
  return Number(value.toFixed(8)).toString()
}

const generateTrimmedWallet = (content: string, numberToTrim?: number) =>
  `${content.slice(0, numberToTrim ?? 5)}....${content.slice(-4)}`

const getMonth = () => {
  const date = new Date()
  const currentMonth = date?.getMonth()
  return currentMonth
}

const getMonthDays = () => {
  const now = new Date()
  const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  return totalDays
}

const getPricePrecision = (maxValue: number): number => {
  if (maxValue < 10) return 6
  if (maxValue < 100) return 5
  if (maxValue < 1000) return 4
  if (maxValue < 10000) return 3
  if (maxValue < 100000) return 2
  return 2
}

const isValidNumberString = (value: string) =>
  value !== '' && !isNaN(Number(value))

const formatTime = (
  seconds: number,
  isHoursType?: boolean,
  isDaysType?: boolean
) => {
  const days = Math.floor(seconds / (24 * 3600))
  const hours = Math.floor((seconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (isDaysType) {
    return `${days}d : ${hours}h : ${minutes}m : ${secs}s`
  }
  if (isHoursType) {
    return `${hours}h : ${minutes}m : ${secs}s`
  }

  return `${minutes}m : ${secs}s`
}

const Utility = {
  formatTime,
  isValidNumberString,
  getPricePrecision,
  generateTrimmedWallet,
  formatTo8Decimals,
  converToPositiveValue,
  trimMultipleSpaces,
  colorGeneratorUtility,
  ScrollToSectionUtility,
  validFloatNumber,
  numberConversion,
  isValidEmail,
  validPointValue,
  removeDecimal,
  isValidNumber,
  convertScientificToNormalNum,
  isPasswordValid,
  largeNumberNotationConversion,
  getMonth,
  getMonthDays,
}

export default Utility
