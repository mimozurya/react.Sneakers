import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const cartResponce = await axios.get(
                "https://6556121784b36e3a431ef28e.mockapi.io/cart"
            );
            const favoritesResponce = await axios.get(
                "https://6558a622e93ca47020a98ea9.mockapi.io/favorites"
            );
            const itemsResponce = await axios.get(
                "https://6556121784b36e3a431ef28e.mockapi.io/items"
            );

            setIsLoading(false);

            setCartItems(cartResponce.data);
            setFavorites(favoritesResponce.data);
            setItems(itemsResponce.data);
        }

        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://6556121784b36e3a431ef28e.mockapi.io/cart/${id}`);
                setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
                axios.post("https://6556121784b36e3a431ef28e.mockapi.io/cart", obj);
                setCartItems((prev) => [...prev, obj]);
            }
        } catch (error) {
            alert("Не удалось добавить в фавориты");
        }
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

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    };

    return (
        <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
            <div className="wrapper clear">
                <Header onClickCart={() => setCartOpened(true)} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/favorites"
                        element={<Favorites onAddToFavorite={onAddToFavorite} />}
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
        </AppContext.Provider>
    );
}

export default App;
