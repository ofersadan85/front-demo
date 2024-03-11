import { NavLink } from "react-router-dom";
import { useLocalStorage } from 'usehooks-ts';
import { Cart } from "./CartButton";
import "./NavBar.css";
import { ProductID } from "./ProductCard";

export default function NavBar() {
    const [wishlist] = useLocalStorage<ProductID[]>("wishlist", []);
    const [cart] = useLocalStorage<Cart>("cart", {});
    const cartCount = Object.values(cart).reduce((acc, val) => acc + val, 0);
    const currentUser = "admin"; //localStorage.getItem("currentUser");
    return (
        <nav className="mainNavBar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/?filter=cart">🛒{cartCount > 0 && <span className="cartCount">{cartCount}</span>}</NavLink></li>
                <li><NavLink to="/?filter=wishlist">💌{wishlist.length > 0 && <span className="wishlistCount">{wishlist.length}</span>}</NavLink></li>
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
