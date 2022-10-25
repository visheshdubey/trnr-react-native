
function validateEmail(mail) {
    return String(mail).match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
export const formValidation = (email, fn) => {
    let validationObj = {
        emailLabel: null,
        firstNameLabel: null,
        hasErrorLabel: false,
    }
    //Checking Email
    if (email === '' || email === null) {
        validationObj.emailLabel = 'Email cannot be empty'
        validationObj.hasErrorLabel = true
    }
    else if (!validateEmail(email)) {
        validationObj.emailLabel = 'Enter a valid Email'
        validationObj.hasErrorLabel = true
    }

    //Checking First Name
    if (fn === '' || fn === null) {
        validationObj.firstNameLabel = 'First name cannot be empty'
        validationObj.hasErrorLabel = true
    }

    return validationObj;
}


export const signInFormValidation = (email, pswd) => {
    let validationObj = {
        emailLabel: null,
        passwordLabel: null,
        hasErrorLabel: false,
    }
    //Checking Email
    if (email === '' || email === null) {
        validationObj.emailLabel = 'Email cannot be empty'
        validationObj.hasErrorLabel = true
    }
    else if (!validateEmail(email)) {
        validationObj.emailLabel = 'Enter a valid Email'
        validationObj.hasErrorLabel = true
    }
    //Checking Password
    if (pswd === '' || pswd === null) {
        validationObj.passwordLabel = 'Password cannot be empty'
        validationObj.hasErrorLabel = true
    }

    else if (pswd.length < 6) {
        validationObj.passwordLabel = 'Password less than 6 charachter'
        validationObj.hasErrorLabel = true
    }
    return validationObj;
}
export const resetFormValidation = (email) => {
    let validationObj = {
        emailLabel: null,
        hasErrorLabel: false,
    }
    //Checking Email
    if (email === '' || email === null) {
        validationObj.emailLabel = 'Email cannot be empty'
        validationObj.hasErrorLabel = true
    }
    else if (!validateEmail(email)) {
        validationObj.emailLabel = 'Enter a valid Email'
        validationObj.hasErrorLabel = true
    }
    return validationObj;
}