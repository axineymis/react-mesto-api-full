import editButtonPic from '../images/EditIcon.svg'
import addButtonPic from '../images/AddIcon.svg'
import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';
import Footer from "./Footer";

function Main({ 
  onEditProfile, 
  onEditAvatar, 
  onAddPlace, 
  onCardClick,
  onCardLike,
  onConfirmDelete,
  cards,
 }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">

      <section className="profile">
        <div className="profile__main" >
          <button type="button" className="profile__updateAvatar" ></button>
            <img className="profile__avatar" onClick={onEditAvatar} src={currentUser.avatar} alt="Аватар"/>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}>
              <img  src={editButtonPic} alt="Кнопка редактирования"/>
            </button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}>
        <img src={addButtonPic} alt="Кнопка редактирования"/>
          </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}
export default Main;