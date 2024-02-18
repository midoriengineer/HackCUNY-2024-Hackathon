import { Link, useNavigate } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import gotPhishLogo from "../images/cropped-logo.png"
import { useEffect, useState } from "react";
import logo from "../images/gotphish.png"

const Navbar = () => {
    const [googleToken, setGoogleToken] = useState();

    async function fetchGoogleToken() {
        const filePath = "http://localhost:5000/google_token";
  
        const response = await fetch(filePath);
          
        if (!response.ok) return
  
        const jsonData = await response.json();
  
        setGoogleToken(jsonData.credentials_token)
  
    };

    useEffect(() => {
        fetchGoogleToken()
    }
    , []);


    const handleLogout = () => {
        try{
            window.location.href = "http://localhost:5000/logout"
        }catch(err){
            console.log(err)
        }
    }

    return (
        <header>
            <div className="flex justify-between items-center max-w-[1240px] mx-auto p-4">
                <div className="nav-logo">
                    <img className="w-28 h-auto max-w-full" src={logo} alt="image description" />
                </div>
                <div className="text-white">
                    <ul className="flex">
                        <li className="mx-4 p-4 border-2 border-white rounded-full font-bold">
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                Home
                            </Link>
                        </li>
                        <li className="mx-4 p-4 border-2 border-white rounded-full font-bold">
                            <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="mx-4 p-4 border-2 border-white rounded-full font-bold cursor-pointer">
                            <LinkScroll to="about-section" smooth={true} duration={800}>
                                About
                            </LinkScroll>
                        </li>
                        {!googleToken? <li className="mx-4 p-4 border-2 border-white rounded-full font-bold">
                            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                Login
                            </Link>
                        </li> :  <li className="mx-4 p-4 border-2 border-white rounded-full font-bold"><button onClick={handleLogout}>Logout</button></li>}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Navbar;