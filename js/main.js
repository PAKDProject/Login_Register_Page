$(document).ready(() => {
  let email;

  //Show or hide form based on selections on page
  $("#toggleRegisterPage").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#registerForm").toggleClass("hidden");
    $("#formRegister").removeClass("was-validated");
  });

  $("#alreadyHaveAccount").click(() => {
    $("#loginForm").toggleClass("hidden");
    $("#registerForm").toggleClass("hidden");
    $("#formLogin").removeClass("was-validated");
  });

  $("#formLogin").submit((e) => {
    loginFormSubmit(e);
  });

  $("#formRegister").submit((e) => {
    registerFormSubmit(e);
  });
  $("#formConfirm").submit((e) => {
    confirmationFormSubmit(e);
  });
});


const loginFormSubmit = (e) => {
  const form = document.getElementById("formLogin");
  const formElements = document.getElementById("formLogin").elements;
  const postData = getFormData("formLogin");

  const loginObject = {
    email: postData.email,
    password: postData.password
  };

  console.log(loginObject);


  const apiUrl = "http://localhost:3000/auth/login";

  $.post(apiUrl, {
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    data: JSON.stringify(loginObject),
    dataType: 'json',
  }).done((data, statusText, res) => {
    console.log(res.status)
    switch (res.status) {
      case 200:
        window.location.replace("https://google.ie"); //TODO - Change url
        break
    }
  }).fail((res) => {
    switch (res.status) {
      case 403:
        constructDiv(res.message, "login-validation-text");
        break;
      default:
        alert('wtf?')
        break
    }
  });

  e.preventDefault();

};

const registerFormSubmit = (e) => {
  const form = document.getElementById("formRegister");
  const postData = getFormData("formRegister");

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated")
  } else {
    form.classList.add("was-validated");
    email = postData.regEmail

    const registrationObject = {
      email: postData.regEmail,
      name: postData.regFName,
      family_name: postData.regSName,
      password: postData.regPassword
    };
    console.log(registrationObject);

    const apiUrl = "http://localhost:3000/auth/register"; //Enter endpoint

    $.post(apiUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(registrationObject),
      dataType: 'json',
    }).done((data, statusText, res) => {
      console.log(res.status)
      switch (res.status) {
        case 201:
          alert('Yay')
          break
      }
    }).fail((res) => {
      switch (res.status) {
        case 400:
          constructDiv(res.message, "register-validation-text")
          break
        default:
          alert('wtf?')
          break
      }
    })

    e.preventDefault();
    $("#registerForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
  }
};

const confirmationFormSubmit = (e) => {

  const form = document.getElementById("formConfirm");
  const postData = getFormData("formConfirm");

  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated")
  } else {
    const confirmationCode = postData.confirmationCode;
    const apiUrl = "http://localhost:3000/auth/confirm"; //endpoint

    var object = {
      confirmationCode,
      email
    }

    console.log(JSON.stringify(object))
    $.post(apiUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(object),
      dataType: 'json',
    }).done((data, statusText, res) => {
      console.log(res.status)
      switch (res.status) {
        case 201:
          window.location.replace("https://google.ie"); //TODO - Enter angular app location
          break
      }
    }).fail((res) => {
      switch (res.status) {
        case 403:
          constructDiv(res.message, "confirmation-validation-text");
          break
        default:
          constructDiv(res.message, "confirmation-validation-text");
          break
      }
    })


    $("#loginForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
    e.preventDefault();
  }

};

const constructDiv = (messageText, locationID) => {
  $(`#${locationID}`).append(`<div class='loginFeedback'>${messageText}</div>`)
}
const getFormData = (formName) => {
  const formElements = document.getElementById(formName).elements;
  const postData = {};
  for (var i = 0; i < formElements.length; i++) {
    if (formElements[i].type != "submit")
      postData[formElements[i].name] = formElements[i].value;
  }
  return postData;
}