import React from 'react'
import { NavLink } from 'react-router-dom';
import bargain from './Bargain.png'
import { useHistory } from 'react-router';
import './Topbar.module.css'
const Topbar = (props) => {
  const linksLength = props.list.length
  const history=useHistory()
  const logoClickListener=()=>{
    history.push("/")
  }

  return (
    <div className="topbarDiv" style={{ backgroundColor: "white" }}>
      <img onClick={logoClickListener} className={linksLength === 0 ? "middleLogoImage" : "logoImage"} src={bargain} alt="Assist"></img>
      <ul className="topMenu">
        {props.list.map(link => {
          return <li> <NavLink className="navbarLinks" to={`${link.link}`} exact activeClassName="selected"> {link.base.toUpperCase()}</NavLink></li>
        })}

      </ul>
    </div>
  )
}
export default Topbar
