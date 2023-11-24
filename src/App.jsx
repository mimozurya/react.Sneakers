import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./index.scss";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponce, favoritesResponce, itemsResponce] = await Promise.all([
                    axios.get("https://6556121784b36e3a431ef28e.mockapi.io/cart"),
                    axios.get("https://6558a622e93ca47020a98ea9.mockapi.io/favorites"),
                    axios.get("https://6556121784b36e3a431ef28e.mockapi.io/items"),
                ]);
                // const cartResponce = await axios.get(
                //     "https://6556121784b36e3a431ef28e.mockapi.io/cart"
                // );
                // const favoritesResponce = await axios.get(
                //     "https://6558a622e93ca47020a98ea9.mockapi.io/favorites"
                // );
                // const itemsResponce = await axios.get(
                //     "https://6556121784b36e3a431ef28e.mockapi.io/items"
                // );

                setIsLoading(false);
                setCartItems(cartResponce.data);
                setFavorites(favoritesResponce.data);
                setItems(itemsResponce.data);
            } catch (error) {
                alert("Ошибка при запросе данных :(");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) =>
                    prev.filter((item) => Number(item.parentId) !== Number(obj.id))
                );
                await axios.delete(
                    `https://6556121784b36e3a431ef28e.mockapi.io/cart/${findItem.id}`
                );
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    "https://6556121784b36e3a431ef28e.mockapi.io/cart",
                    obj
                );
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (error) {
            alert("Ошибка при добавлении в корзину");
            console.log(error);
        }
    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://6556121784b36e3a431ef28e.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            alert("Ошибка при удалении из корзины");
            console.log(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://6558a622e93ca47020a98ea9.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post(
                    "https://6558a622e93ca47020a98ea9.mockapi.io/favorites",
                    obj
                );
                setFavorites((prev) => [...prev, data]);
            }
            setSearchValue(event.target.value);
        } catch (error) {
            alert("Не удалось добавить в фавориты");
            console.log(error);
        }
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                setCartItems,
            }}
        >
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />

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
                    <Route exact path="/favorites" element={<Favorites />} />
                    <Route exact path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
