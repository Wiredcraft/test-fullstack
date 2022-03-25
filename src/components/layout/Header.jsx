import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    function goToHome(){
        window.location.href= window.location.origin
    }
    function logout(){
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userId")
        goToHome()
    }

    return (
        <header style={headerStyle}>
            <div style={divStyle}>
                <h1 style={{cursor:"pointer"}} onClick={goToHome}>Lightning Talk</h1>
                {
                    sessionStorage.getItem("user")?
                    <div style={divStyle}>
                      <span>{`Welcome ${sessionStorage.getItem("user")}!`}</span>
                      <button style={btnStyle} onClick={logout}>Logout</button>
                    </div>:
                    <Link style={linkStyle} to="/user">Sign Up/Login</Link>

                }
            </div>
        </header>
    )
};

const btnStyle = {
    color: '#4867AA',
    background: "white",
    display: 'inline-block',
    border: 'none',
    padding: '7px 20px',
    cursor: 'pointer'
};

const divStyle = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
};

const headerStyle = {
    background: "#4867AA",
    color: 'white',
    textAlign: 'center',
    padding: '10px'
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
};

export default Header;