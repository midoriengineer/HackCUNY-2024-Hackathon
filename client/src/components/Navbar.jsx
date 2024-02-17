import { Link, useNavigate} from "react-router-dom";
import gotPhishLogo from "../images/cropped-logo.png"
import { useEffect, useState } from "react";

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
                    <img className="w-28 h-auto max-w-full" src={gotPhishLogo} alt="image description" />
                </div>
                <div className="text-white">
                    <ul className="flex">
                        <li className="p-4">
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className="p-4">Dashboard</li>
                
                        {!googleToken? <li className="p-4">
                            <Link to="/login">
                                Login
                            </Link>
                        </li> :  <li className="p-4"><button onClick={handleLogout}>Logout</button></li>}
                          
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Navbar;