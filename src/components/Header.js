import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './header.module.css'

export const Header = props => {

    return (
        <header className={classes.header}>
            <NavLink className={({isActive}) => classes.link + (isActive ? ' '+classes.active_link : '')} to="/">Home</NavLink>
            <NavLink className={({isActive}) => classes.link + (isActive ? ' '+classes.active_link : '')} to="/movies">Movies</NavLink>
        </header>
    )
}