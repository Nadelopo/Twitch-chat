import S from './style.css'
GM_addStyle(S)

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

const setBoderAndText = (el: HTMLElement, color: string) => {
  el.style.color = color
  const border: HTMLElement = el.querySelector('.chat-line__username-container')
  border.style.borderColor = color
}

const setStyles = (elements: NodeListOf<HTMLElement>) => {
  elements.forEach((el) => {
    const nick: HTMLElement = el.querySelector('.chat-author__display-name')
    if (nick) {
      const color = window.getComputedStyle(nick).color
      if (el.style.color !== color) {
        el.querySelectorAll('span[aria-hidden="true"]')?.[0]?.remove()
        setBoderAndText(el, color)
      }
    }
  })
}

let chatMessage: NodeListOf<HTMLElement> = document.querySelectorAll(
  '.chat-line__no-background'
)

let lastLocation = ''
setInterval(() => {
  const currentLocation = window.location.href
  if (currentLocation !== lastLocation) {
    lastLocation = currentLocation

    waitForElm('.chat-scrollable-area__message-container').then(
      (chatContainer: HTMLElement) => {
        let chatObserv = new MutationObserver(() => {
          chatMessage = document.querySelectorAll('.chat-line__no-background')
          setStyles(chatMessage)
        })

        chatObserv.observe(chatContainer, {
          childList: true,
        })
      }
    )
  }
}, 500)

addEventListener('click', async () => {
  await waitForElm('.chat-input-tray__open .chat-line__no-background')

  const answerWindow: HTMLElement = document.querySelector(
    '.chat-input-tray__open'
  )
  const chatElements: NodeListOf<HTMLElement> = answerWindow.querySelectorAll(
    '.chat-line__no-background'
  )
  setStyles(chatElements)
})
