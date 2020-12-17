import React, {useState} from 'react'

import {Link} from 'react-router-dom';
import { SideBarData } from './SideBarData';
import './NavBar.css';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';



const NavBar = () => {
    const [sidebar,setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    
    return (
        <div>
            <div className='navbar'>
                <Link to ='#' className='menu-bars'>
                    <MenuIcon   onClick = {showSidebar} />
                </Link>
            </div>
        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar} >
                <li className='navbar-toggle'>
                    <Link to ='#' className='menu-bars'>
                        <CloseIcon /> 
                    </Link>
                
                </li>

                {SideBarData.map((item,index1)=>{

                    return(
                        <li key='index1' className={item.cName}>
                            <Link to={item.path}>
                            {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>

                    )
                })}
            </ul> 
        </nav>

        </div>

    )
}

export default NavBar;