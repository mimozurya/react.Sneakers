import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get("https://6556121784b36e3a431ef28e.mockapi.io/items").then((res) => {
            setItems(res.data);
        });
        axios.get("https://6556121784b36e3a431ef28e.mockapi.io/cart").then((res) => {
            setCartItems(res.data);
        });
        axios.get("https://6558a622e93ca47020a98ea9.mockapi.io/favorites").then((res) => {
            setFavorites(res.data);
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post("https://6556121784b36e3a431ef28e.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://6556121784b36e3a431ef28e.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)) {
                axios.delete(`https://6558a622e93ca47020a98ea9.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
                const { data } = await axios.post(
                    "https://6558a622e93ca47020a98ea9.mockapi.io/favorites",
                    obj
                );
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в фавориты");
        }
    };

    return (
        <div className="wrapper clear">
            <Header onClickCart={() => setCartOpened(true)} />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                        />
                    }
                />
                <Route
                    exact
                    path="/favorites"
                    element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
                />
            </Routes>
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                />
            )}
        </div>
    );
}

export default App;
