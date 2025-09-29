const numberConversion = (content: number) => {
  const hasDecimal = content % 1 !== 0

  if (!hasDecimal) {
    return `${new Intl.NumberFormat('en-US').format(content)}.00`
  } else {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(content)
  }
}

const isValidEmail = (content: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(content)
}

const Utility = {
  numberConversion,
  isValidEmail,
}

export default Utility
