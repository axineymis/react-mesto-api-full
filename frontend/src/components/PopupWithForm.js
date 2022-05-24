import React from 'react'
import closeIcon from '../images/CloseIcon.svg'


function PopupWithForm(props) {

    return (
        <div className={props.isOpen
            ? `popup popup_type_${props.name} popup_open`
            : `popup popup_type_${props.name}`} >
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__content">
                <button className="popup__close-button" onClick={props.onClose} type="button" >
                  <img src={closeIcon} className="popup__close-icon" alt="Закрыть"/>
                </button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__content-form" name={`${props.name}`} onSubmit={props.onSubmit}>
                  <fieldset className="popup__form">
                    {props.children}
                  </fieldset>
                    <button className="popup__button" type="submit">
                       {" "}
                       {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;