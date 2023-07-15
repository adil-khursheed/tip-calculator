const billAmount = document.getElementById("bill__amount");
const numberOfPeople = document.getElementById("number__of__people");
const tipButtons = document.querySelectorAll(".tip__buttons");
const tipAmountPerPerson = document.querySelector(".person__tip__amount");
const personTotalAmount = document.querySelector(".person__total__amount");
const peopleValueError = document.querySelector(".value__error");
const customTip = document.getElementById("custom__tip");
const peopleInputContainer = document.querySelector(".number__people__input");
const resetButton = document.querySelector(".reset__btn");

billAmount.addEventListener("input", billInputFunc);
numberOfPeople.addEventListener("input", peopleInputFunc);
customTip.addEventListener("input", customTipInputFunc);
tipButtons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
resetButton.addEventListener("click", resetFunc);

// billAmount.value = "0";
// numberOfPeople.value = "1";
tipAmountPerPerson.innerHTML = (0.0).toFixed(2);
personTotalAmount.innerHTML = (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFunc() {
  billValue = parseFloat(billAmount.value);
  calculateTip();
}

function customTipInputFunc() {
  tipValue = parseFloat(customTip.value) / 100;

  tipButtons.forEach((btn) => {
    btn.classList.remove("active__tip__btn");
  });
  calculateTip();
}

function peopleInputFunc() {
  peopleValue = parseFloat(numberOfPeople.value);

  if (peopleValue < 1) {
    peopleValueError.style.display = "flex";
    peopleInputContainer.style.border = "1.5px solid red";
  } else {
    peopleValueError.style.display = "none";
    peopleInputContainer.style.border = "none";
    calculateTip();
  }
}

function handleClick(e) {
  tipButtons.forEach((btn) => {
    btn.classList.remove("active__tip__btn");
    if (e.target.innerHTML === btn.innerHTML) {
      btn.classList.add("active__tip__btn");
      tipValue = parseFloat(btn.innerHTML) / 100;
      //   console.log(tipValue);
    }
    calculateTip();
  });
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalPerPerson = (billValue + tipAmount) / peopleValue;

    if (billAmount.value === "" || numberOfPeople.value === "") {
      tipAmountPerPerson.innerHTML = "0.00";
      personTotalAmount.innerHTML = "0.00";
    } else {
      tipAmountPerPerson.innerHTML = tipAmount.toFixed(2);
      personTotalAmount.innerHTML = totalPerPerson.toFixed(2);
    }
  }
}

function resetFunc() {
  billAmount.value = "";
  billInputFunc();
  numberOfPeople.value = "";
  peopleInputFunc();
  customTip.value = "";
}
