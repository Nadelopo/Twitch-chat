export const watchUrl = (
  callback: (...args: any) => void,
  params?: {
    timeCheckUrl: number
  }
) => {
  const time = params?.timeCheckUrl ?? 500
  let lastLocation = ''
  setInterval(() => {
    const currentLocation = window.location.href
    if (currentLocation !== lastLocation) {
      lastLocation = currentLocation
      callback()
    }
  }, time)
}
