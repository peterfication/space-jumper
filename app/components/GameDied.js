import PT from 'prop-types'
import React from 'react'

import styles from './game-died.scss'

const divStyle = {
  width: 200,
  height: 0,
  paddingBottom: 200,
  position: 'relative',
  margin: '10px auto',
}

const giphys = [
  'lf2csamNLtVQs',
  'JFe8LjkpInNo4',
  'fCBAwNqSRskVO',
  'EimNpKJpihLY4',
  'acttIrNAHaoco',
  'quO0X65yj6gw0',
  'ToMjGpBmDyMmBrMmbf2',
  'MQEBfbPco0fao',
  'GRkxKyYeRA0Du',
]

function getGiphyUrl() {
  const id = giphys[Math.floor(Math.random() * giphys.length)]
  return `http://media0.giphy.com/media/${id}/200w_d.gif`
}

const GameDied = props => (
  <div className={styles['game-died-container']}>
    <h1>You died</h1>
    <p style={{ textAlign: 'center' }}>
      But don&apos;t worry, here is a funny giphy to cheer you up
    </p>
    <div style={divStyle}>
      <iframe
        src={getGiphyUrl()}
        width={'100%'}
        height={'100%'}
        style={{ position: 'absolute' }}
        frameBorder={0}
        className={'giphy-embed'}
        allowFullScreen
      />
    </div>
    <button onClick={props.closeDie}>
      Try the level again.
    </button>
  </div>
)

GameDied.propTypes = {
  closeDie: PT.func,
}

export default GameDied
