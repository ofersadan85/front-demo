import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
    const cartCount = 1; //JSON.parse(localStorage.getItem("cart") || "[]").length;
    const cartCartElement = <span className="cartCount">{cartCount}</span>;
    const wishlistCount = 3; //JSON.parse(localStorage.getItem("wishlist") || "[]").length;
    const wishlistElement = <span className="wishlistCount">{wishlistCount}</span>;
    const currentUser = "admin"; //localStorage.getItem("currentUser");
    return (
        <nav className="mainNavBar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cart">🛒{cartCount > 0 && cartCartElement}</NavLink></li>
                <li><NavLink to="/wishlist">💌{wishlistCount > 0 && wishlistElement}</NavLink></li>
                {currentUser &&
                    <li>
                        <NavLink to="/profile">
                            <img src="https://placehold.co/64/white/black?text=OS" alt="User Avatar" />
                        </NavLink>
                    </li>
                }
                <li>{currentUser ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/login">Register / Login</NavLink>}</li>
            </ul>
        </nav>
    );
}
