import { el, mount } from 'redom'
import S from './style.css'

GM_addStyle(S)

const func = () => {
  // let interval = 0

  const setBoderAndText = (el: HTMLElement) => {
    const nick = el.querySelector('.chat-author__display-name')
    let color: string | null = null
    if (nick) color = window.getComputedStyle(nick).color

    if (el.style.color !== color) {
      el.style.color = color
    }
    const border: HTMLElement = el.querySelector(
      '.chat-line__username-container'
    )
    if (border.style.borderColor !== color) {
      border.style.borderColor = color
    }

    // if (interval) {
    //   setTimeout(() => {
    //     if (el && window.getComputedStyle(el).color === color) {
    //       clearInterval(interval)
    //       interval = 0
    //     }
    //   }, 5000)
    // }
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
      let chatContainer = document.querySelector(
        '.chat-scrollable-area__message-container'
      )
      let chatObserv = new MutationObserver(() => {
        chatMessage = document.querySelectorAll('.chat-line__no-background')
        setStyles(chatMessage)
      })
      // interval = setInterval(() => {
      //   chatMessage = document.querySelectorAll('.chat-line__no-background')
      //   setStyles(chatMessage)
      // }, 500)

      chatObserv.observe(chatContainer, {
        childList: true,
      })
    }
  }, 500)

  addEventListener('click', () => {
    const open = document.querySelector('.chat-input-tray__open')
    if (open) {
      setTimeout(() => {
        const messages: NodeListOf<HTMLElement> = open.querySelectorAll(
          '.chat-line__no-background'
        )
        setStyles(messages)
      }, 400)
    }
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
