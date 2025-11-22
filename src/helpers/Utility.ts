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

const Utility = {
  ScrollToSectionUtility,
  validFloatNumber,
  numberConversion,
  isValidEmail,
  validPointValue,
  removeDecimal,
}

export default Utility
