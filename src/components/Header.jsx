function Header(props) {
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
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" />
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
