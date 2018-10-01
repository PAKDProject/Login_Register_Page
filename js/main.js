$(document).ready(() => {

    //Show or hide form based on selections on page
    $(".toggleHidden").click(() => {
        $("#loginForm").toggleClass("hidden");
        $("#registerForm").toggleClass("hidden");
    })

    $("#btnSubmit").click(function(event) {

        // Fetch form to apply custom Bootstrap validation
        var form = $("#myForm")
        //Add form validation
        if (form[0].checkValidity() === false ) {
            event.preventDefault()
            event.stopPropagation()
            break;
          }
        form.addClass('was-validated');

        //Read all fields and create object.
        const email = $('#email').val();
        const pass = $('#password').val();
        const apiRoute = "http://localhost:8080/login"
        const loginDetails = {
            email : email,
            pass : password
        };

        //Fetch request to server.
        fetch(apiRoute, {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(loginDetails),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((res) => {
            res = res.json();
            const token = res.body;

            if(res.status === 200) {
                //save the token etc
            }
            else if (res.status === 404) {
                console.log("User not found!")
            }
        })

    });
    
});


