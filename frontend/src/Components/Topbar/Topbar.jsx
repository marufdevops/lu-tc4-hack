import React from 'react'
import { NavLink } from 'react-router-dom';
import bargain from './Bargain.png'
import { useHistory } from 'react-router';
import styles from './Topbar.module.css'
const Topbar = (props) => {
  const linksLength = props.list.length
  const history=useHistory()
  const logoClickListener=()=>{
    history.push("/")
  }

  return (
    <div className={styles.topbarDiv} style={{ backgroundColor: "white" }}>
      <img onClick={logoClickListener} className={linksLength === 0 ? styles.middleLogoImage : styles.logoImage} src={bargain} alt="Bargain"></img>
      <ul className="topMenu">
        {props.list.map(link => {
          return <li> <NavLink className={styles.navbarLinks} to={`/${link.link}`} exact activeClassName={styles.selected}> {link.base.toUpperCase()}</NavLink></li>
        })}

      </ul>
    </div>
  )
}


export default Topbar