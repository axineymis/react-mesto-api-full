import React from 'react'
import closeIcon from '../images/CloseIcon.svg'


function ImagePopup(props) {
    return (
        <div className={!!props.card.name || !!props.card.link
            ? "popup popup_type_img popup_open"
            : "popup popup_type_img"}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__content-img">
                <button className="popup__close-button" onClick={props.onClose} type="button">
                  <img src={closeIcon} className="popup__close-icon" alt="Закрыть"/>
                </button>
                <img className="popup__big-img" src={props.card.link} alt={props.card.name} />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;