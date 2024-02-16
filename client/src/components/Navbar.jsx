import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Got Phish?</h1>
                </Link>
                <nav>
                    <div>
                        <Link to='/login'>
                            Login with Gmail
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;