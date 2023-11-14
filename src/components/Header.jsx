function Header() {
    return (
        <header className="d-flex align-center justify-between p-40">
            <div className="d-flex align-center">
                <img src="/img/logo.png" width={40} height={40} />
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30">
                    <img src="/img/cart.svg" width={18} height={18} />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img src="/img/user.svg" width={18} height={18} />
                </li>
            </ul>
        </header>
    );
}

export default Header;
