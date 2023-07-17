import { watchUrl } from './utils/watchUrl'
import { waitElement } from './utils/waitElement'
import Sdefault from './styles/default.css'
import Sffz from './styles/ffz.css'

let isFfz = false
waitElement('#ffz-script').then(() => {
  isFfz = true
})

const setStyles = (message: HTMLElement) => {
  const nick = message.querySelector(
    isFfz ? '.chat-line__username' : '.chat-author__display-name'
  )
  if (!nick) return

  const color = getComputedStyle(nick).color
  const textFragments = message.querySelectorAll<HTMLElement>('.text-fragment')
  textFragments.forEach((e) => (e.style.color = color))
  const mentions = message.querySelectorAll<HTMLElement>(
    isFfz ? '.chat-line__message-mention ' : '.mention-fragment'
  )
  mentions.forEach((e) => (e.style.color = color))
  const checkBr = message.querySelector<HTMLElement>('br') ? true : false

  if (isFfz) {
    if (!checkBr) {
      nick.after(document.createElement('br'))
    }
    const badges = message.querySelector<HTMLElement>(
      '.chat-line__message--badges'
    )
    if (badges) {
      for (const badge of badges.children) {
        if (badge instanceof HTMLElement) {
          badge.style.borderColor = color
        }
      }
      nick.after(badges)
    }
  } else {
    const userNameContainer = message.querySelector<HTMLElement>(
      '.chat-line__username-container'
    )
    if (!checkBr) {
      userNameContainer?.after(document.createElement('br'))
    }
    const userName = userNameContainer?.querySelector<HTMLElement>(
      '.chat-line__username'
    )
    if (userName) {
      userName.style.borderColor = color
    }
    const badges = userNameContainer?.children[0]

    if (badges) {
      userName?.after(badges)
    }
  }
}

watchUrl(async () => {
  const chatContainer = await waitElement(
    '.chat-scrollable-area__message-container'
  )

  const chatObserv = new MutationObserver((mutations) => {
    if (isFfz) {
      GM_addStyle(Sffz)
    } else {
      GM_addStyle(Sdefault)
    }
    for (const record of mutations) {
      const message = record.addedNodes[0]
      if (message instanceof HTMLElement) {
        if (
          message.classList.contains('chat-line__message') ||
          message.classList.contains('chat-line__message-container')
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
})

window.addEventListener('click', async () => {
  await waitElement('.chat-input-tray__open .chat-line__message')

  const messages = document.querySelectorAll<HTMLElement>(
    '.chat-input-tray__open .chat-line__message'
  )

  for (const message of messages) {
    setStyles(message)
  }
})
