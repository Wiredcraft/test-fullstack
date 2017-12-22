export const canNotBeEmpty = (obj, properties) => {
  let err = {}
  properties.forEach(prop => {
    let curValue = obj[prop]
    if (typeof (curValue) === 'string' && !(curValue)) {
      obj[prop] = curValue
    }
    err[prop] = !obj[prop]
      ? 'Required'
      : null
  })
  return err
}


export const dangerousHTML = (data) => {
  return {
    __html: data
  }
}