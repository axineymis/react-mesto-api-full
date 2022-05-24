import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.handleCardDelete();
        props.onClose();
      }
    return (
        <PopupWithForm 
      title="Вы уверены?" 
      name="confirmDelete"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Да'
    >    
    </PopupWithForm>
    )
}

export default ConfirmDeletePopup;