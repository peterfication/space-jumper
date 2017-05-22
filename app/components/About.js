import PT from 'prop-types'
import React from 'react'

import styles from './about.scss'

const About = props => (
  <div className={styles['about-container']}>
    <h1>About</h1>
    <p>
      A small logical game about finding the right way 🎮
    </p>

    <p>
      It&apos;s open source! You can find the code on&nbsp;
      <a href='https://github.com/peterfication/space-jumper'>
        Github
      </a>.
    </p>

    <h2>Contributors</h2>
    <ul>
      <li><a href='https://github.com/peterfication'>Peter Gundel</a></li>
    </ul>

    <button onClick={props.showMenu}>
      Back to menu
    </button>
  </div>
)

About.propTypes = {
  showMenu: PT.func,
}

export default About
