export const parseError = (errorObject) => {
  if (typeof errorObject === 'string') {
    return errorObject
  }
  let finalMessage = ''
  for (const errorField in errorObject) {
    if (Object.hasOwnProperty.call(errorObject, errorField)) {
      const messages = errorObject[errorField]
      messages?.forEach((zone) => {
        finalMessage += zone + '\n'
      })
    }
  }
  return finalMessage.substr(0, finalMessage.length - 1)
}
