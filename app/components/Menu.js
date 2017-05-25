import PT from 'prop-types'
import React from 'react'

import styles from './menu.scss'

const Menu = props => (
  <div className={styles['menu-container']}>
    <a onClick={props.startGame}>Start</a>
    <a onClick={props.showAbout}>About</a>
  </div>
)

if (process.env.NODE_ENV !== 'production') {
  Menu.propTypes = {
    showAbout: PT.func,
    startGame: PT.func,
  }
}

export default Menu
