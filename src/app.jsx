export function App() {
  let chatContainer = document.querySelector(
    '.chat-scrollable-area__message-container'
  )

  let intervalValue = 0

  const setElementStyle = (el) => {
    const color = window.getComputedStyle(
      el.querySelector('.chat-author__display-name')
    ).color

    let border = el.querySelector('.chat-line__username-container')
    let text = el.querySelector('.seventv-message-context')
    let mention = el.querySelector('.seventv-mention')

    if (!text) text = el.querySelector('.text-fragment')
    if (!mention) mention = el.querySelector('.mention-fragment')
    if (border && window.getComputedStyle(border).borderColor !== color) {
      border.style.borderColor = color
    }
    if (mention && window.getComputedStyle(mention).color !== color) {
      mention.style.color = color
    }

    if (text && window.getComputedStyle(text).color !== color) {
      text.style.color = color
    } else {
      setTimeout(() => clearInterval(intervalValue), 5000)
    }
  }

  const setStyles = () => {
    const chatMessage = document.querySelectorAll('.chat-line__no-background')
    chatMessage.forEach((el) => {
      setElementStyle(el)
    })
  }

  let chatObserv = new MutationObserver(() => {
    setStyles()
  })

  console.log(chatContainer, '123123')

  chatObserv.observe(chatContainer, {
    childList: true,
  })

  let lastLocation
  setInterval(() => {
    const currentLocation = window.location.href
    if (currentLocation !== lastLocation) {
      lastLocation = currentLocation
      intervalValue = setInterval(() => setStyles(), 100)
    }
  }, 500)

  return <></>
}
