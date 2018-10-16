$(document).ready(() => {
  //Show or hide form based on selections on page
  $("#toggleRegisterPage").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#registerForm").toggleClass("hidden");
  });

  $("#registerFormSubmit").click(() => {
    $("#registerForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
  });

  $("#confirmFormSubmit").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
  });
});

function validateForm(form) {}
//Login Form
document.getElementById("formLogin").addEventListener("submit", e => {
  const form = document.getElementById("formLogin");
  const formElements = document.getElementById("formLogin").elements;
  const postData = {};

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");
  for (var i = 0; i < formElements.length; i++) {
    if (formElements[i].type != "submit")
      postData[formElements[i].name] = formElements[i].value;
  }
  const loginObject = {
    email: postData.email,
    password: postData.password
  };

  console.log(loginObject);

  const apiUrl = "";

  fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(loginObject)
  }).then(res => {
    console.log(res);
  });

  e.preventDefault();
});

//Register Form
document.getElementById("formRegister").addEventListener("submit", e => {
  const form = document.getElementById("formRegister");
  const formElements = document.getElementById("formRegister").elements;
  const postData = {};

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");
  for (var i = 0; i < formElements.length; i++) {
    if (formElements[i].type != "submit")
      postData[formElements[i].name] = formElements[i].value;
  }

  const registrationObject = {
    email: postData.regEmail,
    name: postData.regFName,
    family_name: postData.regSName,
    password: postData.regPassword
  };
  console.log(registrationObject);

  const apiUrl = ""; //Enter endpoint

  fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(registrationObject)
  }).then(res => {
    console.log(res);
  });

  e.preventDefault();
});

//Confirmation Code part
document.getElementById("formConfirm").addEventListener("submit", e => {
  var formElements = document.getElementById("formConfirm").elements;
  var postData = {};
  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== "submit")
      postData[formElements[i].name] = formElements[i].value;
  }

  const confirmationCode = postData.confirmationCode;
  console.log(confirmationCode);

  const apiUrl = ""; //endpoint

  fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(confirmationCode)
  }).then(res => {
    console.log(res);
  });

  e.preventDefault();
});
