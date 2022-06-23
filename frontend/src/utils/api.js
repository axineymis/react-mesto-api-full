class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }
 
  getCards(token) {
    return fetch(`${this._address}cards`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(this._handleResponse)
  }

  addCards({ name, link, token }) {
   
    return fetch(`${this._address}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._handleResponse)
  }

  deleteCard(_id, token) {
    return fetch(`${this._address}cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._handleResponse)
  }

  likeCard(id, token) {
    return fetch(`${this._address}cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  unlikeCard(id, token) {
    return fetch(`${this._address}cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._address}users/me`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(this._handleResponse)
  }

  patchUserInfo({ name, about }, token) {
    return fetch(`${this._address}users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._handleResponse)
  }

  editUserAvatar(avatar, token) {
    return fetch(`${this._address}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    }).then(this._handleResponse)
  }

  changeLikeCard(id, isLiked) {
    if (isLiked === true) {
      return this.unlikeCard(id)
    } else {
      return this.likeCard(id)
    }
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }
}

  const api = new Api({
   address: 'https://api.domainname.axineymis.nomoreparties.sbs/',
  // address: 'http://localhost:3001/'
 });

export default api;

