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
  $("#confirmationFormSubmit").submit((e) => {
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
  //constructDiv(form);


  const apiUrl = "http://localhost:3000/auth/login";

  $.post(apiUrl, {
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    data: JSON.stringify(loginObject),
    success: (res) => {
      alert("Success " + res)

    },
    error: (err) => {
      alert(err);
    }
  });


  // fetch(apiUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8"
  //   },
  //   body: JSON.stringify(loginObject)
  // }).then(res => {
  //   window.location.replace(res.headers['Location'])
  // });

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


    $("#loginForm").toggleClass("hidden");
    $("#confirmationForm").toggleClass("hidden");
    e.preventDefault();
  }

};

const constructDiv = () => {
  $("#validation-text").append("<div class='loginFeedback'>Incorrect login details</div>")
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