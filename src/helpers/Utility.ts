const numberConversion = (content: number) => {
  const hasDecimal = content % 1 !== 0

  if (!hasDecimal) {
    return `${new Intl.NumberFormat('en-US').format(content)}.00`
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

const Utility = {
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
}

export default Utility
