const hourlyRate = document.getElementById("hourly-rate");
const hoursWorked = document.getElementById("hours-worked");
const kiwiSaverSelect = document.getElementById("kiwisaver-percent");
const taxBracket = document.getElementById("tax-bracket-input");

const studentLoanDiv = document.getElementById("studentLoanOptions");
const studentLoan = document.getElementsByName("studentLoan");

const kiwiSaverCheckbox = document.getElementById('kiwisaver');
const kiwiSaverOptionsDiv = document.getElementById('kiwisaver-options');

const studentLoanAmountInput = document.getElementById("student-loan-amount-input");
const studentLoanField = document.getElementById("studentLoanField");

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

  // get the currently selected tax rate
  const taxBracketSelect = document.getElementById('tax-bracket');
  const selectedTaxRate = taxBracketSelect.options[taxBracketSelect.selectedIndex].value;

  // calculate tax
  let taxRate = parseFloat(selectedTaxRate);
  let taxAmount = (grossPay * taxRate) / 100;

  // check to see if kiwiSaver option is selected
  if (kiwiSaverCheckbox.checked) {
    let kiwiSaverRate = parseFloat(kiwiSaverSelect.value);
    let kiwiSaverAmount = (grossPay * kiwiSaverRate) / 100;
    taxAmount += kiwiSaverAmount;
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
  }
  

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


