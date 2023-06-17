type WaitElementParams = {
  timeDisconnect?: number
}

export const waitElement = (
  selector: string,
  params?: {
    timeDisconnect?: number
  }
): Promise<HTMLElement> => {
  const time = params?.timeDisconnect ?? 10000
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      const element = document.querySelector<HTMLElement>(selector)
      if (element) return resolve(element)
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        const element = document.querySelector<HTMLElement>(selector)
        if (element) {
          resolve(element)
          observer.disconnect()
        }
      }
    })

    setTimeout(() => {
      if (!document.querySelector(selector)) {
        observer.disconnect()
      }
    }, time)

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}
