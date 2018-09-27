$(document).ready(() => {

    //Show or hide form based on selections on page
    $(".toggleHidden").click(() => {
        $("#loginForm").toggleClass("hidden");
        $("#registerForm").toggleClass("hidden");
    })

    $(".btnSubmit").click(function(event) {

        // Fetch form to apply custom Bootstrap validation
        var form = $("#myForm")
        var registerForm = $("#registerForm")
    
        if (form[0].checkValidity() === false || registerForm[0].checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        
        //Add class
        form.addClass('was-validated');
        registerForm.addClass('was-validated');


    });
    
});


