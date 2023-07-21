type NavigateEvent = {
  destination: {
    url: string
  }
}

export const watchUrl = (callback: (...args: any) => void) => {
  let href = window.location.href
  callback()
  //@ts-ignore
  navigation.addEventListener('navigate', (e: NavigateEvent) => {
    if (href !== e.destination.url) {
      callback()
      href = e.destination.url
    }
  })
}
