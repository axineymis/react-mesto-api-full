import React from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup'; 
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';
import { Redirect } from 'react-router-dom';
import InfoToolTip from './InfoToolTip';
import successRegistration from "../images/Union(1).svg"
import unSuccessRegistration from "../images/Union(2).svg"
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [messageTooltip, setMessageTooltip] = React.useState({});
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard]= React.useState('');

  const [token, setToken] = React.useState("");

  const history = useHistory();
  const propsMain = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    onCardLike: handleCardLike,
    onConfirmDelete: handleDeletePopupOpen,
    cards: cards
  }

  React.useEffect(() => {
    checkTocken();
    if(loggedIn)
    Promise.all([api.getCards(token), api.getUserInfo(token)])

      .then(([cards, userInfo]) => {
        setCurrentUser({ ...currentUser, ...userInfo });
        setCards(cards.reverse())
      })
      .catch((err) => {
        console.log('Promise.all', err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCard(card._id, isLiked)
       .then((newCard) => {
         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
       .catch((err) => {
         console.log('handleCardLike', err);
       });
  }

  function handleCardDelete() {
    api.deleteCard(isDeleteCard)
       
       .then(() => {
         setCards((state) => state.filter((c) => c._id !== isDeleteCard));
       })
       .catch((err) => `Не удалось удалить карточку ${err}`);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleDeletePopupOpen(card) {
    console.log(34)
    setIsDeletePopupOpen(true);
    setIsDeleteCard(card._id);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsTooltipPopupOpen(false);
    setIsDeletePopupOpen(false)
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleUpdateUser(currentUser) {
    api.patchUserInfo({ name: currentUser.name, about: currentUser.about }, token)
       .then((userInfo) => {
         setCurrentUser(userInfo);
       })
       .catch((err) => `Не обновился профиль ${err}`);
  }

  function handleUpdateAvatar(avatar) {
    api
    .editUserAvatar({avatar}, token)
      .then((userInfo) => {
        setCurrentUser({...currentUser, userInfo});
      })
      .catch((err) => `Не удалось обновить аватар ${err}`);
  }

  function handleAddCard({ name, link }) {
    api
    .addCards({ name, link, token})
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => `не удалось добавить карточку ${err}`);
  }
  
  function onHandleSubmitRegistration(data) {
    auth.registration(data)
      .then(({ email }) => {
        setCurrentUser({ ...currentUser, email })
        history.push("/sign-in")
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Вы успешно зарегистрировались!", img: successRegistration })
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: unSuccessRegistration })

      })
  }

  function onHandleSubmitAuthorization(data) {
    auth.authorization(data)
      .then(({ token }) => {
        localStorage.setItem('jwt', token)
        setLoggedIn(true)
        history.push('/')
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: unSuccessRegistration })
      })
  }

  function checkTocken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt);
      auth.getUser(jwt)
        .then(({ email }) => {
          setCurrentUser({ ...currentUser, email });
          setLoggedIn(true);
          // history.push("/");
        })
        .catch((err)=> console.log(err))
    }
  }

  function signOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header 
           onSignOut={signOut}/>
        <Switch>
        <ProtectedRoute  exact path="/" 
          loggedIn={loggedIn} 
          component={Main} 
          propsMain={propsMain} />
        <Route path="/sign-in">
              {loggedIn ? <Redirect to='/' /> : <Login
                onSubmit={onHandleSubmitAuthorization}
                buttonText="Войти"
              />}
        </Route>
        <Route path="/sign-up">
              {loggedIn ? <Redirect to='/' /> : <Register
                onSubmit={onHandleSubmitRegistration}
                buttonText="Зарегистрироваться"
              />}
        </Route>
        <Route path="*">
          <Redirect to='/sign-in' />
        </Route>
        </Switch>
      </div>
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddCard={handleAddCard}
      />
      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        handleCardDelete={handleCardDelete}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoToolTip
        name="infotooltip"
        isOpen={isTooltipPopupOpen}
        messageTooltip={messageTooltip}
        onClose={closeAllPopups}
      />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
