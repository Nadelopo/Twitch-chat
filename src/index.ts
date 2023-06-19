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
  if (isFfz) {
    const mentions = message.querySelectorAll<HTMLElement>(
      '.chat-line__message-mention '
    )
    mentions.forEach((e) => (e.style.color = color))
    const checkBr = message.querySelector<HTMLElement>('br') ? true : false
    if (!checkBr) {
      nick.insertAdjacentElement('afterend', document.createElement('br'))
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
      nick.insertAdjacentElement('afterend', badges)
    }
  } else {
    const mentions = message.querySelectorAll<HTMLElement>('.mention-fragment')
    mentions.forEach((e) => (e.style.color = color))
    const userNameContainer = message.querySelector<HTMLElement>(
      '.chat-line__username-container'
    )
    userNameContainer?.insertAdjacentElement(
      'afterend',
      document.createElement('br')
    )
    const userName = userNameContainer?.querySelector<HTMLElement>(
      '.chat-line__username'
    )
    if (userName) {
      userName.style.borderColor = color
    }
    const badges = message.querySelector('.chat-line__username-container')
      ?.children[0]
    if (badges) {
      userName?.insertAdjacentElement('afterend', badges)
    }
  }
}

watchUrl(async () => {
  const chatContainer = await waitElement(
    '.chat-scrollable-area__message-container'
  )

  const chatObserv = new MutationObserver((mutations) => {
    const messages = document.querySelectorAll<HTMLElement>(
      '.chat-line__message'
    )
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
  if (document.querySelector('.chat-input-tray__open .chat-line__message'))
    return
  await waitElement('.chat-input-tray__open .chat-line__message')

  const messages = document.querySelectorAll<HTMLElement>(
    '.chat-input-tray__open .chat-line__message'
  )

  for (const message of messages) {
    if (message instanceof HTMLElement) {
      setStyles(message)
    }
  }
})
