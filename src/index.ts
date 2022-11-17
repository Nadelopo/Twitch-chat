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
    let interval
    interval = setInterval(() => {
      if (answerWindow) {
        const messages: NodeListOf<HTMLElement> = answerWindow.querySelectorAll(
          '.chat-line__no-background'
        )
        setStyles(messages)
      }
    }, 100)
    setTimeout(() => clearInterval(interval), 600)
  })
}

const chat = document.querySelector('#root')

window.addEventListener('load', () => {
  mount(chat, el(''))
  func()
})
