import React from "react";
import { useState, useContext } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false,
}) {
    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
    };

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={1}
                    width={210}
                    height={260}
                    viewBox="0 0 210 260"
                    backgroundColor="#eaf3fb"
                    foregroundColor="#ffffff"
                >
                    <circle cx="151" cy="347" r="2" />
                    <circle cx="332" cy="132" r="87" />
                    <rect x="0" y="11" rx="10" ry="10" width="150" height="102" />
                    <rect x="0" y="127" rx="3" ry="3" width="150" height="23" />
                    <rect x="0" y="158" rx="3" ry="3" width="93" height="24" />
                    <rect x="0" y="204" rx="8" ry="8" width="80" height="36" />
                    <rect x="111" y="197" rx="8" ry="8" width="39" height="43" />
                </ContentLoader>
            ) : (
                <>
                    {onFavorite && (
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img
                                src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                                alt="Unliked"
                            />
                        </div>
                    )}
                    <img width={133} height={112} src={imageUrl} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                                alt="Plus"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
