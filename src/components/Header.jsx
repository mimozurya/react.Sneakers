import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

function Header(props) {
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
                    <span>1205 руб.</span>
                </li>
                <Link to="/favorites">
                    <li className="mr-20 cu-p">
                        <img src="/img/heart.svg" width={18} height={18} alt="favorite" />
                    </li>
                </Link>
                <li>
                    <img src="/img/user.svg" width={18} height={18} alt="user" />
                </li>
            </ul>
        </header>
    );
}

export default Header;
