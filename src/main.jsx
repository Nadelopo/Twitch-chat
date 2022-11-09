import { render } from 'preact'
import { App } from './app'
import S from './main.css'

GM_addStyle(S)

window.addEventListener('load', () =>
  render(<App />, document.querySelector('.stream-chat-header'))
)
