import React from 'react';

const Navbar = ({ user,  handleLogout }) => {
    let nav = user ?
        <>
        <nav>
            <div className="nav-wrapper">
                <a className=" J-MO" href="/">J-MO</a>
                <ul id="nav-mobile" className="right">
                    <li><a className="nav-link" href="/blacklives">Profile</a></li>
                    <li><a className="nav-link-b" href="/blacklives/add">Share How Your Life Matter This Week</a></li>
                    <li><a href="/blacklives" className="nav-link">Welcome, {user.name}</a></li>
                    <li><a href=" " className="nav-link" onClick={handleLogout}>Log Out</a></li>              
                </ul>
            </div>
        </nav>
    </>
    :
    <>
    <nav>
        <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
            <li><a className="nav-link" href="/yourlife-profile">Profile</a></li>
                <li><a href="/login" className="nav-link">Log In</a></li>
                <li><a href="/signup" className="nav-link">Sign Up</a></li>
            </ul>
        </div>
    </nav>
</>

return (
<>
    {nav}
</>
)
}

export default Navbar;
