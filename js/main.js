//Login Form
document.getElementById("formLogin").addEventListener("submit", loginFormSubmit, false);
//Register Form
document.getElementById("formRegister").addEventListener("submit", registerFormSubmit, false);
//Confirmation Code part
document.getElementById("formConfirm").addEventListener("submit", confirmationFormSubmit, false);

let email

$(document).ready(() => {
  //Show or hide form based on selections on page
  $("#toggleRegisterPage").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#registerForm").toggleClass("hidden");
  });

  $("#alreadyHaveAccount").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#registerForm").toggleClass("hidden");
  })
});


function loginFormSubmit(e) {
  const form = document.getElementById("formLogin");
  const formElements = document.getElementById("formLogin").elements;
  const postData = {};

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");

  } else {

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

    const apiUrl = "http://localhost:3000/auth/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(loginObject)
    }).then(res => {
      window.location.replace(res.headers['Location'])
    });

    e.preventDefault();
  }
};

function registerFormSubmit(e) {
  const form = document.getElementById("formRegister");
  const formElements = document.getElementById("formRegister").elements;
  const postData = {};

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated")
  } else {

    form.classList.add("was-validated");
    for (var i = 0; i < formElements.length; i++) {
      if (formElements[i].type != "submit")
        postData[formElements[i].name] = formElements[i].value;
    }
    email = postData.regEmail

    const registrationObject = {
      email: postData.regEmail,
      name: postData.regFName,
      family_name: postData.regSName,
      password: postData.regPassword
    };
    console.log(registrationObject);

    const apiUrl = "http://localhost:3000/auth/register"; //Enter endpoint

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
    $("#registerForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
  }
};

function confirmationFormSubmit(e) {
  const form = document.getElementById("formConfirm");
  var formElements = document.getElementById("formConfirm").elements;
  const formEmail = document.getElementById("formRegister").elements;
  var postData = {};


  if (form.checkValidity() === false) {
    isValid = false;
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated")
  } else {
    $("#loginForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type !== "submit")
        postData[formElements[i].name] = formElements[i].value;
    }

    const confirmationCode = postData.confirmationCode;
    const apiUrl = "http://localhost:3000/auth/confirm"; //endpoint

    fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        confirmationCode,
        email
      })
    }).then(res => {
      console.log(res);
    });

    e.preventDefault();
  }

};