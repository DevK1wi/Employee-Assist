const hourlyRate = document.getElementById("hourly-rate");
const hoursWorked = document.getElementById("hours-worked");
const kiwiSaverSelect = document.getElementById("kiwisaver-percent");
const taxBracket = document.getElementById("tax-bracket-input");

const studentLoanDiv = document.getElementById("studentLoanOptions");
const studentLoan = document.getElementsByName("studentLoan");

const kiwiSaverCheckbox = document.getElementById('kiwisaver');
const kiwiSaverOptionsDiv = document.getElementById('kiwisaver-options');
let kiwiSaverAmount = 0;

const studentLoanAmountInput = document.getElementById("student-loan-amount-input");
const studentLoanField = document.getElementById("studentLoanField");
let studentLoanAmount = 0;

const studentLoanThreshold = 39000;

// Input validation
if (isNaN(hourlyRate.value) || isNaN(hoursWorked.value)) {
  alert("Please enter valid numeric values for hourly rate and hours worked.");
}

//  kiwisaver options
kiwiSaverCheckbox.addEventListener('change', function() {
  if (this.checked) {
    kiwiSaverOptionsDiv.style.display = 'block';
  } else {
    kiwiSaverOptionsDiv.style.display = 'none';
  }
});

/// student loan options
for (let i = 0; i < studentLoan.length; i++) {
  studentLoan[i].addEventListener("change", function() {
    if (this.checked && this.value === "yes") {
      studentLoanDiv.style.display = "block";
    } else {
      studentLoanDiv.style.display = "none";
    }
  });
}

//  Calculate
const calculateButton = document.getElementById("calculate-button");

calculateButton.addEventListener("click", function() {
  // calculate gross pay
const grossPay = hourlyRate.value * hoursWorked.value;

// update the HTML element with the calculated value
const grossPayElement = document.getElementById("gross-pay");
grossPayElement.textContent = `$${grossPay.toFixed(2)}`;


  // get the currently selected tax rate
  const taxBracketSelect = document.getElementById('tax-bracket');
  const selectedTaxRate = taxBracketSelect.options[taxBracketSelect.selectedIndex].value;

  // calculate tax
let taxRate = parseFloat(selectedTaxRate);
let taxAmount = (grossPay * taxRate) / 100;

// update the HTML element with the calculated value
const taxElement = document.getElementById("tax-amount");
taxElement.textContent = `$${taxAmount.toFixed(2)}`;


  // check to see if kiwiSaver option is selected
  if (kiwiSaverCheckbox.checked) {
    let kiwiSaverRate = parseFloat(kiwiSaverSelect.value);
    let kiwiSaverAmount = (grossPay * kiwiSaverRate) / 100;
    taxAmount += kiwiSaverAmount;
    console.log(kiwiSaverAmount)
    document.getElementById("kiwiSaver-amount").innerHTML = kiwiSaverAmount;

  }

  // check to see if student loan option is selected 
  if (studentLoan[0].checked) {
    let studentLoanRate = 0.12;
    let studentLoanAmount = (grossPay - studentLoanThreshold) * studentLoanRate;
    studentLoanAmount = Math.max(studentLoanAmount, 0);
    let userStudentLoanRate = parseFloat(studentLoanField.value);
    let userStudentLoanAmount = (grossPay * userStudentLoanRate) / 100;
    studentLoanAmount += userStudentLoanAmount;
    taxAmount += studentLoanAmount;
    document.getElementById("student-loan-amount").innerHTML = studentLoanAmount;
  }

   // update results section
  //  const grossPaySpan = document.getElementById("gross-pay");
  //  const taxAmountSpan = document.getElementById("tax-amount");
  //  const kiwiSaverAmountSpan = document.getElementById("kiwisaver-amount");
  //  const studentLoanAmountSpan = document.getElementById("student-loan-amount");
  //  const netPaySpan = document.getElementById("net-pay");
 
  //  grossPaySpan.textContent = grossPay.toFixed(2);
  //  taxAmountSpan.textContent = taxAmount.toFixed(2);
  //  kiwiSaverAmountSpan.textContent = kiwiSaverAmount.toFixed(2);
  //  studentLoanAmountSpan.textContent = studentLoanAmount.toFixed(2);
  

  // calculate net pay
  const netPay = grossPay - taxAmount;
  console.log(netPay)
  console.log(grossPay);
}); 









// student loan options
// for (let a = 0; a < studentLoan.length; a++) {
//   studentLoan[a].addEventListener("click", function() {
//     if (studentLoan[a].value === "yes") {
//       studentLoanField.style.display = "block";
//     } else {
//       studentLoanField.style.display = "none";
//     }
//   });
// }

//  Calculate


