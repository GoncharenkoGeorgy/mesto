//  fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
//    headers: {
//      authorization: '759b7868-e5b7-4679-b3b4-6ab62cbc0a7b'
//    }
//  })
//    .then(res => res.json())
//    .then((result) => {
//      console.log(result);
//    });

export { Api }

class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }  

  getCards1() {
    return fetch(`${this._baseUrl}`, {
      //method: "GET",
      headers: this._headers
    }) 
    .then(res => res.json())
    //.then((result) => {
    //  cards = result;
    //  console.log(result);
    //}) 
    //.then(res => {
      //if (res.ok) {
        //return res.json();
      //} 

      // если ошибка, отклоняем промис
      //return Promise.reject(`Ошибка: ${res.status}`);
    //});
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers, 
    }) .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likesCard() {
    return fetch(`${this._baseUrl}/cards/likes/cardId`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(
      ) 
    }) .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLikesCard() {
    return fetch(`${this._baseUrl}/cards/likes/cardId`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify(
      ) 
    }) .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name, link
      }
      ) 
    }) .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //up avatar
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(
        {avatar}
      ) 
    }) .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

//up profile
updateProfile(name, about) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about
    }) 
  }) .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }  

  

}

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards',
//   headers: {
//     authorization: '759b7868-e5b7-4679-b3b4-6ab62cbc0a7b',
//     'Content-Type': 'application/json'
//   }
// });