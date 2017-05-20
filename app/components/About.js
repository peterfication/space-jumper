import PT from 'prop-types'
import React from 'react'

import styles from './about.scss'

const About = props => (
  <div className={styles['about-container']}>
    <h1>About</h1>
    <p>
      Minions ipsum chasy wiiiii jeje poulet tikka masala butt jeje la bodaaa. Belloo! underweaaar
      bappleees po kass wiiiii butt. Tatata bala tu wiiiii daa butt underweaaar hahaha hana dul
      sae. Tatata bala tu po kass bappleees jiji tank yuuu! Poulet tikka masala para tú bappleees
      wiiiii wiiiii jiji jiji hana dul sae. Ti aamoo! la bodaaa poopayee aaaaaah baboiii me want
      bananaaa! Pepete wiiiii butt ti aamoo! Uuuhhh.
    </p>
    <button onClick={() => props.showMenu()}>
      Back to menu
    </button>
  </div>
)

About.propTypes = {
  showMenu: PT.func,
}

export default About
