import React from "react";
import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
}) {
    const { isItemAdded } = useContext(AppContext);

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                added={isItemAdded(item && item.id)}
                loading={isLoading}
                {...item}
            />
        ));
    };
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue("")}
                            className="cu-p clear"
                            src="/img/btn-remove.svg"
                            alt="Clear"
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
}

export default Home;
