import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import './fadeMenu.css';
import {useDispatch, useSelector} from "react-redux";
import user_icon from "../../../img/user_icon.png";
import {userSignOut} from "../../../state/user.slice";
import {removeAll} from "../../../state/weatherMap.slice";
const FadeMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
console.log("FADE MENU")


    return (
        <div className={"dropdown"}>

            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ height: '30px' }} // Set the desired height here
            >

                <div className="userNameCont" >
                    <img alt="user.icon" src={user_icon} style={{width: "25px"}}/>
                    <div>{user.userInfo.name}</div>
                </div>

            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
               {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                <MenuItem onClick={() => {
                    dispatch(userSignOut())
                    localStorage.removeItem('token');
                    dispatch(removeAll())
                }}>Вийти</MenuItem>
            </Menu>
        </div>
    );
}

export default FadeMenu;