import { el, mount } from 'redom'
import S from './style.css'

GM_addStyle(S)

const func = () => {
  let chatContainer = document.querySelector(
    '.chat-scrollable-area__message-container'
  )

  let interval = 0

  const setBoderAndText = () => {
    const chatMessage = document.querySelectorAll('.chat-line__no-background')
    chatMessage.forEach((el) => {
      const nick = el.querySelector('.chat-author__display-name')
      let color: string | null = null
      if (nick) color = window.getComputedStyle(nick).color

      let border: HTMLElement | null = el.querySelector(
        '.chat-line__username-container'
      )
      if (border && window.getComputedStyle(border).borderColor !== color) {
        if (color) border.style.borderColor = color
      }

      let text
      setTimeout(() => {
        text = el.lastElementChild
        if (text && window.getComputedStyle(text).color !== color) {
          //@ts-ignore
          if (color) text.style.color = color
        }
      })

      let mention: HTMLElement | null = el.querySelector('.seventv-mention')
      if (!mention) mention = el.querySelector('.mention-fragment')
      if (mention && window.getComputedStyle(mention).color !== color) {
        if (color) mention.style.color = color
      }

      if (interval) {
        setTimeout(() => {
          if (text && window.getComputedStyle(text).color === color) {
            clearInterval(interval)
            interval = 0
          }
        }, 5000)
      }
    })
  }

  let lastLocation = ''
  setInterval(() => {
    const currentLocation = window.location.href
    if (currentLocation !== lastLocation) {
      lastLocation = currentLocation
      chatContainer = document.querySelector(
        '.chat-scrollable-area__message-container'
      )
      let chatObserv = new MutationObserver(() => setBoderAndText())
      interval = setInterval(() => setBoderAndText(), 500)

      chatObserv.observe(chatContainer, {
        childList: true,
      })
    }
  }, 500)
}

const App = el('div')

window.addEventListener('load', () => {
  const chat = document.querySelector('.stream-chat-header')
  if (chat) {
    mount(chat, App)
  }
  func()
})
