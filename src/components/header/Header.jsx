import './Header.css'
import { Link } from "react-router-dom";
import React from 'react'
import Logout from '../logout/Logout';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__links'>
        <Link to="/"><img className='header__icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' /></Link>
        <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
        <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
        <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
        <Link to="/movies/favorite" style={{textDecoration: "none"}}><span>Favorite</span></Link>
        <Logout />
      </div>
    </div>
  )
}
export default Header