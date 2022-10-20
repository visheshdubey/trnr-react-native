
function validateEmail(mail) {
    return String(mail).match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
export const formValidation = (email, fn, pswd, cpswd) => {
    let validationObj = {
        emailLabel: null,
        fnLabel: null,
        pswdLabel: null,
        cpswdLabel: null,
        hasErrorLabels: false
    }
    //Checking Email
    if (email === '' || email === null) {
        validationObj.emailLabel = 'Email cannot be empty'
        validationObj.hasErrorLabels = true
    }
    else if (!validateEmail(email)) {
        validationObj.emailLabel = 'Enter a valid Email'
        validationObj.hasErrorLabels = true
    }

    //Checking First Name
    if (fn === '' || fn === null) {
        validationObj.fnLabel = 'First name cannot be empty'
        validationObj.hasErrorLabels = true
    }

    //Checking Password
    if (pswd === '' || pswd === null) {
        validationObj.pswdLabel = 'Password cannot be empty'
        validationObj.hasErrorLabels = true
    }

    else if (pswd.length < 6) {
        validationObj.pswdLabel = 'Password less than 6 charachter'
        validationObj.hasErrorLabels = true
    }

    //Checking Password
    if (cpswd === '' || cpswd === null) {
        validationObj.cpswdLabel = 'Field cannot be empty'
        validationObj.hasErrorLabels = true
    }
    else if (String(pswd) !== String(cpswd)) {
        validationObj.cpswdLabel = 'Password don\'t match'
        validationObj.hasErrorLabels = true
    }



    return validationObj;



}