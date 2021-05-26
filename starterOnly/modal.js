function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.getElementById("submit");
const modalValidMsgBox = document.querySelector(".validMsgBox");
const modalBtnClose = document.querySelectorAll(".close");
const modalBody = document.querySelector(".modal-body");
const form = document.querySelector("#reserve");
const messageServer = document.querySelector("#idValidMessage");
const loadingSpinner = document.querySelector(".loadingSpinnerBox");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalBtnClose.forEach((btnClose) => btnClose.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/*--------------------------Check Formulaire-----------------------------*/

function validate(frm) {
  const errorObject = toCheckErrors();

  if (Object.keys(errorObject).length != 0) {
    submitBtn.disabled = true;
    Object.entries(errorObject).forEach(([key, value]) => {
      displayErrorMessage(key, value);
      toAddListener(key, value);
    });
  }
  else {
    sendData();
  }
  return false;
}

const simulResponseServeur = () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve("200"); }, 2000);
  });
}

async function sendData() {
  form.style.opacity = 0;
  loadingSpinner.style.display = "block";
  let response = await simulResponseServeur();
  if (response == "200") {
    messageServer.innerHTML = " Thanks you for submitting your registration details"
  }
  else {
    messageServer.innerHTML = " We have a probleme Houston !! please try again !"
  }
  loadingSpinner.style.display = "none";
  modalValidMsgBox.style.display = "block";
}

const displayErrorMessage = (key, value) => {
  let currentDiv;
  var warningBox = document.createElement("div");
  warningBox.setAttribute("class", "warning");
  warningBox.setAttribute("name", "warning");
  var newContent = document.createTextNode(value);
  warningBox.appendChild(newContent);
  if (key === "radioBox") {
    currentDiv = document.getElementById(key);
  }
  else {
    currentDiv = document.getElementById(key).parentElement;
  }
  currentDiv.append(warningBox);
}

const toAddListener = (key, value) => {
  let id = document.getElementById(key);
  id.addEventListener("input", function valideConstrainst(e) {
    var errorMsg = valide(id, formConstraints[key]);
    if (errorMsg == "") {
      id.removeEventListener("input", valideConstrainst);
      toRemoveMsgError(key);
    }
  });
}

const toRemoveMsgError = (key) => {
  let parent;
  if (key === "radioBox") {
    parent = document.getElementById(key);
  } else {
    parent = document.getElementById(key).parentElement;
  }
  parent.removeChild(parent.lastElementChild);
  checkMsgWarningInDom();
}

const checkMsgWarningInDom = () => {
  if (!document.body.contains(document.getElementsByTagName("DIV").namedItem("warning"))) {
    submitBtn.disabled = false;
  }
}

// Valid inputField with his constraints
const valide = (element, validators) => {
  return validators.map((validator) => validator(element));//.filter((error) => error);
}

// validators return message if entry don't pass the validator
const validators = {
  minLength: (expectedMinLength) => (element) => {
    if (element.value.trim().length < expectedMinLength) {
      return ` ${expectedMinLength} lettres au minimum `;
    }
  },
  email: (element) => {
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!reg.test(element.value)) {
      return 'email non conforme';
    }
  },
  date: (element) => {
    var reg = /^\d{4}-\d{2}-\d{2}$/;
    if (!reg.test(element.value)) {
      return 'mauvaise date';
    }
  },
  tournois: (element) => {
    var reg = /[0-99]{1,}$/;
    if (!reg.test(element.value)) {
      return 'Le nombre doit etre compris entre 0 et 99';
    }
  },
  radioBox: (element) => {
    const radioBtnChecked = Array.from(element.children)
      .find(radio => radio.checked);
    if (!radioBtnChecked) {
      return 'une case doit etre cochées';
    }
  },
  checkBox: (element) => {
    if (!element.checked) {
      return 'la case des conditions doit etre cochée'
    }
  }
};

const formConstraints = {
  first: [validators.minLength(2)],
  last: [validators.minLength(2)],
  email: [validators.email],
  birthdate: [validators.date],
  quantity: [validators.tournois],
  radioBox: [validators.radioBox],
  checkbox1: [validators.checkBox]
}

function toCheckErrors() {
  const formErrors = {
    first: valide(document.getElementById("first"), formConstraints.first),
    last: valide(document.getElementById("last"), formConstraints.last),
    email: valide(document.getElementById("email"), formConstraints.email),
    birthdate: valide(document.getElementById("birthdate"), formConstraints.birthdate),
    quantity: valide(document.getElementById("quantity"), formConstraints.quantity),
    radioBox: valide(document.getElementById("radioBox"), formConstraints.radioBox),
    checkbox1: valide(document.getElementById("checkbox1"), formConstraints.checkbox1),
  }
  // Select only the error by filter if message exist
  const removeEmptyValues = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v != ""));
  }
  return removeEmptyValues(formErrors);

}
