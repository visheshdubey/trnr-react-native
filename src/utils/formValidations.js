
function validateEmail(mail) {
    return String(mail).match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
export const formValidation = (email, fn, pswd, cpswd, gender, terms) => {
    let validationObj = {
        emailLabel: null,
        firstNameLabel: null,
        passwordLabel: null,
        cpasswordLabel: null,
        genderLabel: null,
        termsLabel: false,
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

    if (pswd === '' || pswd === null) {
        validationObj.passwordLabel = 'Password cannot be empty'
        validationObj.hasErrorLabel = true
    }

    if (pswd.length < 8 || pswd.length > 20) {
        validationObj.passwordLabel = 'Password length not matched'
        validationObj.hasErrorLabel = true
    }

    if (cpswd !== pswd) {
        validationObj.cpasswordLabel = 'Password do not match'
        validationObj.hasErrorLabel = true
    }

    if (gender === '' || gender === null) {
        validationObj.genderLabel = 'Gender cannot be empty'
        validationObj.hasErrorLabel = true
    }
    if (terms === false) {
        validationObj.termsLabel = true
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