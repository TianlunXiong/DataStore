export function builder (obj) {
  if (obj) {
    let output = {}
    Object.keys(obj).forEach(key => {
      output[key] = obj[key]['initiator']()
    })
    return output
  }
}
