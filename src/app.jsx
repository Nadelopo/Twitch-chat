export function App() {
  let chatContainer = document.querySelector(
    '.chat-scrollable-area__message-container'
  )

  const setBoderAndText = () => {
    const chatMessage = document.querySelectorAll('.chat-line__no-background')
    chatMessage.forEach((el) => {
      const color = window.getComputedStyle(
        el.querySelector('.chat-author__display-name')
      ).color

      let border = el.querySelector('.chat-line__username-container')
      if (border && window.getComputedStyle(border).borderColor !== color) {
        border.style.borderColor = color
      }

      let text
      setTimeout(() => {
        text = el.lastElementChild
        if (text && window.getComputedStyle(text).color !== color) {
          text.style.color = color
        }
      })

      let mention = el.querySelector('.seventv-mention')
      if (!mention) mention = el.querySelector('.mention-fragment')
      if (mention && window.getComputedStyle(mention).color !== color) {
        mention.style.color = color
      }
    })
  }

  const setStyles = () => {
    let chatObserv = new MutationObserver(() => {
      setBoderAndText()
    })

    chatObserv.observe(chatContainer, {
      childList: true,
    })
  }

  setStyles()
  let lastLocation
  setInterval(() => {
    const currentLocation = window.location.href
    if (currentLocation !== lastLocation) {
      lastLocation = currentLocation
      chatContainer = document.querySelector(
        '.chat-scrollable-area__message-container'
      )
      setStyles()
    }
  }, 500)

  return <></>
}
