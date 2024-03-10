import { ProductID } from "./ProductCard";
import React, { useEffect } from "react";

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist") || "{}");
}

export default function WishListButton({ id }: { id: ProductID }) {
    const checkRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        checkRef.current!.checked = getWishlist()[id];
    }, [id]);

    function handleClick() {
        let wishlist = getWishlist();
        wishlist[id] = !wishlist[id];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        checkRef.current!.checked = wishlist[id];
    }

    return (
        <button className={"wishlistButton"} onClick={handleClick}>
            <input type="checkbox" ref={checkRef} readOnly /> Wishlist
        </button>
    );
}
