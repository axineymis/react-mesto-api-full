import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangePlace(evt) {
      setName(evt.target.value);
    }

    function handleChangeLink(evt) {
      setLink(evt.target.value);
    }

    function handleAddPlaceSubmit(evt) {
      evt.preventDefault();
  
      props.onAddCard({
        name,
        link,
      });
      props.onClose();
    }

    React.useEffect(() => {
      setName("");
      setLink("");
    }, [props.isOpen]);
    
    return (
      <PopupWithForm
        title="Новое место"
        name="place"
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText="Создать"
        onSubmit={handleAddPlaceSubmit}
      >
        <input
          id="input-add"
          className="popup__input popup__input_type_title"
          type="text" 
          name="title"
          onChange={handleChangePlace}
          value={name}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span 
          id='input-add-error'
          className="error">
          Вы пропустили это поле
        </span>
        <input
           id="input-img"
           className="popup__input popup__input_type_img"
           type="url"
           name="img"
           onChange={handleChangeLink}
           value={link} 
           placeholder="Ссылка на картинку"
           required 
        />
        <span 
          id='input-img-error'
          className="error">
          Введите адрес сайта
        </span>
      </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;