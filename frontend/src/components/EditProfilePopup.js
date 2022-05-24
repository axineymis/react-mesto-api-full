import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
    props.onClose();
  }

  React.useEffect(() => {
    if (currentUser) setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="info"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input popup__input_type_name"
        type="text" 
        name="name"
        value={name || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span 
      id='input-name-error' 
      className="error">
        Вы пропустили это поле
      </span>
      <input
         id="input-text"
         className="popup__input popup__input_type_text"
         type="text"
         name="about"
         value={description || ""}
         placeholder="О себе"
         minLength="2"
         maxLength="200"
         required 
         onChange={handleChangeDescription}
      />
      <span 
        id='input-text-error'
        className="error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;