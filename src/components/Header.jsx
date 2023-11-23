import React from "react";
import { Link } from "react-router-dom";
import { UseCart } from "../hooks/useCart";

function Header(props) {
    const { totalPrice } = UseCart();

    return (
        <header className="d-flex align-center justify-between p-40">
            <div>
                <Link to="/" className="d-flex align-center">
                    <img src="/img/logo.png" width={40} height={40} alt="logotype" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </Link>
            </div>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <Link to="/favorites">
                    <li className="mr-20 cu-p">
                        <img src="/img/heart.svg" width={18} height={18} alt="favorite" />
                    </li>
                </Link>
                <Link to="/orders">
                    <li>
                        <img src="/img/user.svg" width={18} height={18} alt="user" />
                    </li>
                </Link>
            </ul>
        </header>
    );
}

export default Header;
