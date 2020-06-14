let userName = "Жак-Ив Кусто";
let userProf = "Исследователь океана"; 

function onPageLoad() {
  setUserInfo();
  setPopupState(false);
  addEventListeners();
}

onPageLoad(); 

function addEventListeners() {
  let profileEditButton = document.querySelector('#profileEditButton');
  let popupCloseButton = document.querySelector('#popupClose');
  let popupSaveButton = document.querySelector('#popupSave');

  profileEditButton.addEventListener('click', function(e){
    setUserInputInfo(); 
    setPopupState(true);
  });

  popupCloseButton.addEventListener('click', function() { 
    setPopupState(false)
  });

  popupSaveButton.addEventListener('click', function(e) {
    let userNameInput = document.querySelector('#userNameInput');
    let userProfInput = document.querySelector('#userProfInput');

    userName = userNameInput.value;
    userProf = userProfInput.value;

    setUserInfo();
    setPopupState(false);
  });
}

function setUserInputInfo() {
  let userNameInput = document.querySelector('#userNameInput');
  let userProfInput = document.querySelector('#userProfInput');

  userNameInput.value = userName;
  userProfInput.value = userProf;
}

function setUserInfo() {
  let userNameBlock = document.querySelector('#userName');
  let userProfBlock = document.querySelector('#userProf');

  userNameBlock.textContent = userName;
  userProfBlock.textContent = userProf;
}

function setPopupState(isPopupOpen) {
  let popupBlock = document.querySelector('#popup');
  
  if (isPopupOpen) 
    popupBlock.className = addClass(popupBlock.className, "popup__opened");
  else 
    popupBlock.className = removeClass(popupBlock.className, "popup__opened");
}

function addClass(classes, newClassName) {
  if (!classes)
    return newClassName;
  
  const classArray = classes.split(" ");
  if (!classArray.find(function(x) { 
    return x == newClassName
  }))
    classArray.push(newClassName);
  
  return classArray.join(" ");  
}

function removeClass(classes, removedClassName) {
  if(!classes)
    return classes;

  return classes.split(" ")
    .filter(function (x) {
      return  x !== removedClassName;
    })
    .join(" ");
}

