/*--------------Decleration--------------*/


/*--------------login--------------*/
let loginMailInput = document.getElementById("loginMailInput");
let loginPassInput = document.getElementById("loginPassInput");
let signInUserMailErr = document.getElementById("signInUserMailErr");
let signInUserPassErr = document.getElementById("signInUserPassErr");
let fromCheck = document.getElementById("FormChecker");
let signInBtn = document.getElementById("signInBtn");



/*--------------sign up--------------*/
let userNameInput = document.getElementById("userNameInput");
let userMailInput = document.getElementById("userMailInput");
let userPassInput = document.getElementById("userPassInput");
let userConfPassInput = document.getElementById("userRePassInput");
let signUpBtn = document.getElementById("signUpBtn");
let signUpUserNameErr = document.getElementById("signUpUserNameErr");
let signUpMailErr = document.getElementById("signUpMailErrMsg");
let ExistsignUpMailErr = document.getElementById("ExistsignUpMailErrMsg");
let signUpPassErr = document.getElementById("signUpPassErrMsg");
let confPswrdErr = document.getElementById("confPswrdErrMsg");

let googleSignInBtn = document.getElementById("googleSignInBtn");
var userInfo;

/*-------------- Main --------------*/


//to check if the local storage has users
if (localStorage.getItem("users") == null) {
    userInfo = [];
} else {
    userInfo = JSON.parse(localStorage.getItem("users"));
}

/*----------- Login section -----------*/

function login() {
    if (loginMailInput.value === "" || loginMailInput.value === null || loginPassInput.value === "" || loginPassInput.value === null) {
        loginMailInput.classList.remove("is-valid");
        loginMailInput.classList.add("is-invalid");
        signInUserMailErr.classList.replace("d-none", "d-block");
        loginPassInput.classList.remove("is-valid");
        loginPassInput.classList.add("is-invalid");
        signInUserPassErr.classList.replace("d-none", "d-block");
        return false; // Add this line to indicate login failure
    } else {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].email.toLowerCase() === loginMailInput.value.toLowerCase() && userInfo[i].password === loginPassInput.value) {
                // Remove unnecessary class manipulations
                loginMailInput.classList.remove("is-invalid");
                loginMailInput.classList.add("is-valid");
                loginPassInput.classList.remove("is-invalid");
                loginPassInput.classList.add("is-valid");
                window.open('../home.html');
                return true;
            }
        }

        // If the loop completes without finding a matching user
        loginMailInput.classList.remove("is-valid");
        loginMailInput.classList.add("is-invalid");
        loginPassInput.classList.remove("is-valid");
        loginPassInput.classList.add("is-invalid");
        return false;
    }
}


/*----------- Registration section -----------*/




function signUp() {
    if (!isExist() && userInputsValidation()) {
        var user = {
            name: userNameInput.value,
            email: userMailInput.value,
            password: userPassInput.value,
        };
        userInfo.push(user);
        localStorage.setItem("users", JSON.stringify(userInfo));
        console.log(userInfo);
        window.open("../index.html",target);
    } else {
        console.log("Registration failed");
    }
}



function isExist() {
    for (let i = 0; i < userInfo.length; i++) {
        if (
            userInfo[i].email.toLowerCase() === userMailInput.value.toLowerCase() &&
            userInfo[i].name.toLowerCase() === userNameInput.value.toLowerCase()
        ) {
            userMailInput.classList.remove("is-valid");
            userMailInput.classList.add("is-invalid");
            ExistsignUpMailErr.classList.replace("d-none", "d-block");
            return true;
        }
    }

    userMailInput.classList.remove("is-invalid");
    userMailInput.classList.add("is-valid");
    ExistsignUpMailErr.classList.replace("d-block", "d-none");
    return false;
}


//----------------------------validation---------------------------- 
function usernameValidation(){
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

    //validation true at least 3 chars and no symbols
    if (regex.test(userNameInput.value) == true && userNameInput.value !=""){
        userNameInput.classList.add("is-valid");
        userNameInput.classList.remove("is-invalid");
        signUpUserNameErr.classList.replace("d-block", "d-none");
        return true;
    }
    else{
        userNameInput.classList.add("is-invalid");
        userNameInput.classList.remove("is-valid");
        signUpUserNameErr.classList.replace("d-none", "d-block");
        return false;
    }
}

function userEmailAlert(){
    //email validation
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(userMailInput.value) == true && userMailInput.value != ""){
        userMailInput.classList.add("is-valid");
        userMailInput.classList.remove("is-invalid");
        userMailInput.classList.replace("d-block", "d-none")
        return true;
    }
    else {
        userMailInput.classList.add("is-invalid");
        userMailInput.classList.remove("is-valid");
        userMailInput.classList.replace("d-none", "d-block")
        return false;
    }
}

function userPasswordValidation() {
    //password at least has one digit,one upper or lowercase letter between 8 and 40char length
    let regex = /^.{5,15}$/;
    if (regex.test(userPassInput.value) == true && userPassInput.value != "") {
        userPassInput.classList.add("is-valid");
        userPassInput.classList.remove("is-invalid");
        userPassInput.classList.replace("d-block", "d-none")
        return true;
    }
    else {
        userPassInput.classList.add("is-invalid");
        userPassInput.classList.remove("is-valid");
        userPassInput.classList.replace("d-none", "d-block")
        return false;
    }
}

function samePasswordCheck(){
    if (userConfPassInput.value == userPassInput.value && userConfPassInput.value != ""){
        userConfPassInput.classList.add("is-valid");
        userConfPassInput.classList.remove("is-invalid");
        confPswrdErr.classList.replace("d-block","d-none");
        return true;
    }
    else{
        userConfPassInput.classList.add("is-invalid");
        userConfPassInput.classList.remove("is-valid");
        confPswrdErr.classList.replace("d-none","d-block");
        return false;
    }
}

function userInputsValidation(){
    usernameValidation();
    userEmailAlert();
    userPasswordValidation();
    samePasswordCheck();
    if(usernameValidation() == true && userEmailAlert() == true && userPasswordValidation() == true && userPasswordValidation() == true && samePasswordCheck() == true){
        return true;
    }
    else{
        return false;
    }
}
