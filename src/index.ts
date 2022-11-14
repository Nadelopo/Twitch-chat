import { el, mount } from 'redom'
import S from './style.css'

GM_addStyle(S)

const func = () => {
  const setBoderAndText = (el: HTMLElement) => {
    const nick = el.querySelector('.chat-author__display-name')
    let color: string | null = null

    if (nick) {
      color = window.getComputedStyle(nick).color
    }
    if (el.style.color !== color) {
      el.style.color = color
    }

    const border: HTMLElement = el.querySelector(
      '.chat-line__username-container'
    )
    if (border.style.borderColor !== color) {
      border.style.borderColor = color
    }
  }

  const setStyles = (elements: NodeListOf<HTMLElement>) => {
    elements.forEach((el) => setBoderAndText(el))
  }

  let chatMessage: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.chat-line__no-background'
  )
  setStyles(chatMessage)

  let lastLocation = ''
  setInterval(() => {
    const currentLocation = window.location.href
    if (currentLocation !== lastLocation) {
      lastLocation = currentLocation

      let chatObserv = new MutationObserver(() => {
        chatMessage = document.querySelectorAll('.chat-line__no-background')
        setStyles(chatMessage)
      })
      let chatContainer = document.querySelector(
        '.chat-scrollable-area__message-container'
      )
      chatObserv.observe(chatContainer, {
        childList: true,
      })
    }
  }, 500)

  addEventListener('click', () => {
    const answerWindow: HTMLElement = document.querySelector(
      '.chat-input-tray__open'
    )
    setTimeout(() => {
      const messages: NodeListOf<HTMLElement> = answerWindow.querySelectorAll(
        '.chat-line__no-background'
      )
      setStyles(messages)
    }, 400)
  })
}

const App = el('div')

window.addEventListener('load', () => {
  const chat = document.querySelector('.stream-chat-header')
  if (chat) {
    mount(chat, App)
  }
  func()
})
