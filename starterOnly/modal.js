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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function validate() {
  // build array
  let items = buildArray();

  // check array for validity
  for (var i = 0; i < items.length; i++) {
    console.log(items[i].value);
    if (isValid(items[i].value, items[i].regx)) {
      alert("true");
    }
    else {
      alert("false");
    }
  }
}


function buildArray() {

  var nameForm = document.forms.reserve.first;
  var firstName = { name: nameForm.name, value: nameForm.value, regx: /[A-Z]{3,}$/ };

  var surNameForm = document.forms.reserve.last;
  var surName = { name: surNameForm.name, value: surNameForm.value, regx: /[A-Z]{3,}$/ };

  var emailForm = document.forms.reserve.email;
  var email = { name: emailForm.name, value: emailForm.value, regx: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ };

  var birthdateForm = document.forms.reserve.birthdate;
  var birthdate = { name: birthdateForm.name, value: birthdateForm.value, regx: /^\d{4}-\d{2}-\d{2}$/ }  

  var quantityGameForm = document.forms.reserve.quantity;
  var quantityGame = { name: quantityGameForm.name, value: quantityGameForm.value, regx: /[0-99]{1,}$/ }

  var btnRadio = document.forms.reserve.location;
  var btnCheck = document.forms.reserve.checkbox;

  var items = [];
  items.push(firstName, surName, email, birthdate, quantityGame);
  console.log(items); 
  
  return items;
}

function isValid(value, regx) {
  return regx.test(value);
}

//es5
/* var event =new Event('input');
HTMLInputElementObject.addEventListener('input', function(){
  alert("this.value");
}) */

//es6
/* HTMLInputElementObject.oninput = () =>{
  alert("es6");
} */

