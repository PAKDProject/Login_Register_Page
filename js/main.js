$(document).ready(() => {

    //Show or hide form based on selections on page
    $(".toggleHidden").click(() => {
        $("#loginForm").toggleClass("hidden");
        $("#registerForm").toggleClass("hidden");
    })

    $(".btnSubmit").click(() => {
        $("#registerForm").toggleClass("hidden");
        $("#confirmationForm").toggleClass("hidden");
    })

});