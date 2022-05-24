import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = ` ${
      isOwn ? "element__delete-btn" : "element__delete_hidden"
    }`;

    // console.log(props.card.likes.some((i) => i._id === currentUser._id));
    // console.log(currentUser._id);
    // console.log(props.card.likes.some((i) => i._id));
    const isLiked = props.card.likes.some((i) => i === currentUser._id);
  
    const cardLikeButtonClassName = `${
      isLiked ? "element__like-button element__like-button_active" : "element__like-button"
    }`;
    
    function handleClick() {
        props.onCardClick(props.card);    
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
      }
      
      function handleDeleteClick() {
        
        props.onConfirmDelete(props.card);
      }

    return (
        <div className="element">
            <img className="element__photo" onClick={handleClick} src={props.card.link} alt={props.card.name} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__coption">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like_area">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;