import React from "react";
import { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, price, imageUrl, onFavorite, onPlus }) {
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        onPlus({ title, price, imageUrl });
        setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" width={32} height={32} />
            </div>
            <img src={imageUrl} alt="Sneakers" width={133} height={112} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={styles.plus}
                    src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                    alt="Plus"
                    onClick={onClickPlus}
                />
            </div>
        </div>
    );
}

export default Card;
