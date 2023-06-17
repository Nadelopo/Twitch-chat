import { watchUrl } from './utils/watchUrl'
import { waitElement } from './utils/waitElement'
import Sdefault from './styles/default.css'
import Sffz from './styles/ffz.css'

let isFfz = false
waitElement('#ffz-script').then(() => {
  isFfz = true
})

const setStyles = (messages: NodeListOf<HTMLElement>) => {
  for (const message of messages) {
    if (message.classList.contains('message__changed')) continue
    message.classList.add('message__changed')
    const nick = message.querySelector(
      isFfz ? '.chat-line__username' : '.chat-author__display-name'
    )
    if (!nick) continue
    const color = getComputedStyle(nick).color

    const textFragments =
      message.querySelectorAll<HTMLElement>('.text-fragment')
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
      const mentions =
        message.querySelectorAll<HTMLElement>('.mention-fragment')
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
}

watchUrl(async () => {
  const chatContainer = await waitElement(
    '.chat-scrollable-area__message-container'
  )

  const chatObserv = new MutationObserver(() => {
    const messages = document.querySelectorAll<HTMLElement>(
      '.chat-line__message'
    )
    if (isFfz) {
      GM_addStyle(Sffz)
    } else {
      GM_addStyle(Sdefault)
    }
    setStyles(messages)
  })

  chatObserv.observe(chatContainer, {
    childList: true,
    subtree: true
  })
})

// let loadAnswerWindow = true
// let timeout = 0
window.addEventListener('click', async () => {
  // clearTimeout(timeout)
  // if (loadAnswerWindow) {
  // loadAnswerWindow = false
  await waitElement('.chat-input-tray__open .chat-line__message')

  // loadAnswerWindow = true
  const messages = document.querySelectorAll<HTMLElement>(
    '.chat-input-tray__open .chat-line__message'
  )
  setStyles(messages)
  // }
  // timeout = setTimeout(() => {
  //   loadAnswerWindow = true
  // }, 10000)
})
