import { Link } from "react-router-dom";
import gotPhishLogo from "../images/cropped-logo.png"

const Navbar = () => {

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
                        <li className="p-4">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <Link to="/">
                    <h1>Got Phish?</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>
                            Login with Gmail
                        </Link>
                    </div>
                </nav> */}
            </div>
        </header>
    );
}

export default Navbar;