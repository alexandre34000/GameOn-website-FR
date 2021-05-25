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

/*--------------------------Check Formulaire-----------------------------*/

class Formulaire {
  constructor(name, value, regx, validity, checked) {
    this.name = name;
    this.value = value;
    this.regx = regx;
    this.validity = validity;
    this.checked = checked;
  }
  static FrmInputFields(name, value, regx, validity) {
    return new Formulaire(name, value, regx, validity, null);
  }

  static FrmRadioBox(name, value, checked) {
    return new Formulaire(name, value, null, null, checked);
  }
}

var frm;

function validate(frm) {
  this.frm = frm;
  let items = buildArray(frm);

  // To know the validity of Formulaire
  var validityInputField = toKnowValidityOfInputField(items);
  var validityRadioBox = toKnowRadioBoxChecked(items);
  var validityCheckBox = toKnowValidityOfCheckbox(items);

  if (!validityInputField || !validityRadioBox || !validityCheckBox) {
    console.log("generale is false");
    return false;
  } else {
    console.log(JSON.parse(JSON.stringify(items)));
    return true;
  }
}

/** build an array of object Formulaire */
function buildArray(frm) {
  var firstName = Formulaire.FrmInputFields(
    frm.first.name,
    frm.first.value,
    /[A-Z]{3,}$/,
    null
  );
  var surName = Formulaire.FrmInputFields(
    frm.last.name,
    frm.last.value,
    /[A-Z]{3,}$/,
    null
  );
  var email = Formulaire.FrmInputFields(
    frm.email.name,
    frm.email.value,
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    null
  );
  var birthdate = Formulaire.FrmInputFields(
    frm.birthdate.name,
    frm.birthdate.value,
    /^\d{4}-\d{2}-\d{2}$/,
    null
  );
  var quantityGame = Formulaire.FrmInputFields(
    frm.quantity.name,
    frm.quantity.value,
    /[0-99]{1,}$/,
    null
  );
  var btnRadio = Formulaire.FrmRadioBox("location", "", false);
  var btnCheck1 = Formulaire.FrmRadioBox(
    frm.checkbox1.name,
    frm.checkbox1.value,
    frm.checkbox1.checked
  );
  var btnCheck2 = Formulaire.FrmRadioBox(
    frm.checkbox2.name,
    frm.checkbox2.value,
    frm.checkbox2.checked
  );

  var itemsArray = [];
  itemsArray.push(
    firstName,
    surName,
    email,
    birthdate,
    quantityGame,
    btnRadio,
    btnCheck1,
    btnCheck2
  );

  return itemsArray;
}

/** Check all inputField */
function toKnowValidityOfInputField(itemsArray) {
  for (var i = 0; i < itemsArray.length; i++) {
    itemsArray[i].validity = isValid(itemsArray[i].value, itemsArray[i].regx);
  }
  try {
    var inputField = itemsArray.find((f) => f.validity === false);
    let id = frm.elements[inputField.name];
    toDisplayMessage(id.name, false);
    id.oninput = function () {
      if (isValid(id.value, inputField.regx)) {
        toDisplayMessage(id.name, true);
      }
    };
    return false;
  } catch {
    return true;
  }
}
/** check all radioBox */
function toKnowRadioBoxChecked(items) {
  var radioBoxItem = items.find((f) => f.name == "location");
  let index = frm.elements["location"];

  if (index.value == "") {
    toDisplayMessage(index.name, false);
    index.forEach((input) => {
      input.addEventListener("change", function () {
        radioBoxItem.value = index.value;
        toDisplayMessage(index.name, true);
      });
    });
    return false;
  } else {
    radioBoxItem.value = index.value;
    return true;
  }
}

/** check all checkbox */
function toKnowValidityOfCheckbox(items) {
  var checkBoxItem = items.filter((f) => f.name == "checkbox");
  var checkBox1 = frm.elements["checkbox"];
  var checkBox2 = frm.elements["checkbox"];
  if (checkBox1.checked == false) {
    toDisplayMessage("checkBox2", false);
    checkBox1.onchange = function () {
      if (checkbox1.checked) {
        toDisplayMessage(checkBox2, true);
      }
    };
    return false;
  } else {
    checkBoxItem[0].checked = checkBox1.checked;
    checkBoxItem[1].checked = checkBox2.checked;
    return true;
  }
}

function isValid(value, regx) {
  if (regx != null) {
    return regx.test(value);
  }
}

var warningBox = document.createElement("div");
warningBox.className = "warning";

function toDisplayMessage(id, state) {
  var currentDiv = document.getElementById(id);
  this.warningBox.innerHTML = "toto";
  if (state) {
    console.log("erreur corrigée");
    document.getElementById("submit").disabled = false;
    warningBox.parentNode.removeChild(warningBox);
  } else {
    console.log("c'est pas bon");
    document.getElementById("submit").disabled = "disabled";
    currentDiv.parentNode.insertBefore(warningBox, currentDiv.nextSibling);
  }
}

/* object = {firstname: 'abd', lastname:'tm', age:16, school:'insat'};

keys = ['firstname', 'age'];
ensuite :

keys.reduce((result, key) => ({ ...result, [key]: object[key] }), {}); */
// {firstname:'abd', age: 16}