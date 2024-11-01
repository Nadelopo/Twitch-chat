import { watchUrl } from './utils/watchUrl'
import { waitElement } from '@zero-dependency/dom'
import Sdefault from './styles/default.css'
import Sffz from './styles/ffz.css'

GM_addStyle(Sdefault)
let isFfz = false
waitElement({
  selector: '#ffz-script',
  target: document.head,
  rejectTimeoutMs: 10000
}).then(() => {
  isFfz = true
  GM_addStyle(Sffz)

  // setStyleForMessageWithMention
  const style = document.createElement('style')
  document.head.appendChild(style)
  const sheet = style.sheet

  const parseCookie = document.cookie.split(/; /)
  const userName = parseCookie
    .find((e) => e.includes('name='))
    ?.replace('name=', '')

  sheet?.insertRule(
    `.chat-line__message:has([data-login="${userName}"]) { background: #501919; }`,
    sheet.cssRules.length
  )
})

const setStyles = (message: HTMLElement) => {
  const isBreakElement = Boolean(message.querySelector<HTMLElement>('br'))
  if (isBreakElement) return // already modified element
  const nick = message.querySelector(
    isFfz ? '.chat-line__username' : '.chat-author__display-name'
  )
  if (!nick) return
  const color = getComputedStyle(nick).color
  message.style.setProperty('--chat-messege-color', color)

  if (isFfz) {
    nick.after(document.createElement('br'))
    const badges = message.querySelector<HTMLElement>(
      '.chat-line__message--badges'
    )
    if (badges) {
      nick.after(badges)
    }
  } else {
    const userNameContainer = message.querySelector<HTMLElement>(
      '.chat-line__username-container'
    )
    userNameContainer?.after(document.createElement('br'))
    const userName = userNameContainer?.querySelector<HTMLElement>(
      '.chat-line__username'
    )
    const badges = userNameContainer?.firstChild
    if (badges) {
      userName?.after(badges)
    }
  }
}

let chatObserv: MutationObserver
const setObserve = async () => {
  const chatContainer = await waitElement({
    selector: '.chat-scrollable-area__message-container'
  })

  if (chatObserv) {
    chatObserv.disconnect()
  }

  chatObserv = new MutationObserver((mutations) => {
    for (const record of mutations) {
      const message = record.addedNodes[0]
      if (message instanceof HTMLElement) {
        if (
          message.querySelector('.chat-line__message') ||
          message.querySelector('.chat-line__message-container')
        ) {
          setStyles(message)
        }
      }
    }
  })

  chatObserv.observe(chatContainer, {
    childList: true,
    subtree: true
  })
}
watchUrl(setObserve)

// const init = () => {
//   const parentNode = document.querySelector('body')
//   const observer = new MutationObserver((_, observer) => {
//     const el = document.querySelector(
//       '.chat-scrollable-area__message-container div'
//     )
//     if (el) {
//       console.log(el)

//       setObserve()
//       observer.disconnect()
//     }
//   })
//   if (parentNode) {
//     observer.observe(parentNode, { childList: true, subtree: true })
//   }
// }
// init()

window.addEventListener('click', async () => {
  await waitElement({
    selector: '.chat-input-tray__open .chat-line__message',
    rejectTimeoutMs: 1000
  })
  const messages = document.querySelectorAll<HTMLElement>(
    '.chat-input-tray__open .chat-line__message'
  )
  for (const message of messages) {
    setStyles(message)
  }
})
