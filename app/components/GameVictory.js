import PT from 'prop-types'
import React from 'react'

import styles from './game-victory.scss'

const GameVictory = props => (
  <div className={styles['game-victory-container']}>
    <h1>Victroy!!!</h1>
    <p>
      Congragulations :)
    </p>
    <button onClick={() => props.showMenu()}>
      Back to menu
    </button>
  </div>
)

GameVictory.propTypes = {
  showMenu: PT.func,
}

export default GameVictory
