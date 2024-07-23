 const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastName');
const email = document.getElementById('email');
const contact_number = document.getElementById('contact_number');
const password = document.getElementById('password');
const cnfm_password = document.getElementById('cnfmPassword');

const formValues = [];
const formFields = {
  firstname: null,
  lastname: null,
  email: null,
  contact_number: null,
  password: null,
  cnfm_password: null,
};

function checkError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-group has-error'; // Use has-error class for styling
  const small = formControl.querySelector('small');
  small.innerText = message;
  small.style.visibility = 'visible'; // Show error message
}

function for_success(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-group has-success'; // Use has-success class for styling
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden'; // Hide error message
}

function checkEmail(input) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (reg.test(input.value)) {
    for_success(input);
    formFields.email = true;
  } else {
    checkError(input, "Email is not valid");
    formFields.email = false;
  }
}

function checkContactNumber(input) {
  const reg = /^\d{10}$/;
  
  if (input.value === "1234567890") {
    checkError(input, "Contact number cannot be 1234567890");
    formFields.contact_number = false;
  } else if (!reg.test(input.value)) {
    checkError(input, "Contact number must be exactly 10 digits");
    formFields.contact_number = false;
  } else {
    for_success(input);
    formFields.contact_number = true;
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value === "") {
      checkError(input, `${getFieldName(input)} is required`);
      formFields[input.id] = false;
    } else {
      for_success(input);
      formFields[input.id] = true;
    }
  });
}

function checkMatchPassword(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    checkError(pass2, "Passwords do not match");
    formFields.cnfm_password = false;
  } else {
    for_success(pass2);
    formFields.cnfm_password = true;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    checkError(input, `${getFieldName(input)} must be more than ${min} characters`);
    formFields[input.id] = false;
  } else if (input.value.length > max) {
    checkError(input, `${getFieldName(input)} must be less than ${max} characters`);
    formFields[input.id] = false;
  } else {
    for_success(input);
    formFields[input.id] = true;
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    contact_number: contact_number.value,
    password: password.value,
    cnfm_password: cnfm_password.value,
  };

  checkRequired([firstname, lastname, email, contact_number, password, cnfm_password]);
  checkLength(firstname, 3, 15);
  checkLength(lastname, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  if (cnfm_password.value !== "") {
    checkMatchPassword(password, cnfm_password);
  }

  let hasError = false;
  Object.values(formFields).forEach((value) => {
    if (value === false) {
      hasError = true;
    }
  });

  if (hasError) return;

  formValues.push(formData);
  form.reset();

  // Reset the form controls to their default state
  const formControls = document.querySelectorAll('.form-group');
  formControls.forEach(formControl => {
    formControl.className = 'form-group'; // Reset to default class
    const small = formControl.querySelector('small');
    small.style.visibility = 'hidden'; // Hide error message
  });

  alert("Form submitted successfully");
  console.log("Form Inputs:", formValues);
});
