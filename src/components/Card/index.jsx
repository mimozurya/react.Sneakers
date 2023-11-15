import styles from "./Card.module.scss";
console.log(styles);

function Card(props) {
    const onClickButton = () => {
        alert(123);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" width={32} height={32} />
            </div>
            <img src={props.imageUrl} alt="Sneakers" width={133} height={112} />
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <button className="button">
                    <img src="/img/plus.svg" alt="Plus" width={11} height={11} />
                </button>
            </div>
        </div>
    );
}

export default Card;
