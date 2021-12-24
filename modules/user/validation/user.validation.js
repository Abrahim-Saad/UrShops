let { isEmpty, isAlphabetic, isAlphaNum, isNum, isEmail, isUrl, isPassword, isText, isStreet, isBase64,
    isImageExtension, isSubject } = require("../../../utils/validation");

let signUpValidation = (firstName, lastName, email, password) => {
    if (isAlphabetic(firstName) && isAlphabetic(lastName) && isEmail(email) && isPassword(password) && firstName && lastName && password && email) {
        return true;
    }
    else if (isEmpty(firstName)) {
        return "You have to enter first name";
    }
    else if (isEmpty(lastName)) {
        return "You have to enter last name";
    }
    else if (isEmpty(email)) {
        return "You have to enter email";
    }
    else if (isEmpty(password)) {
        return "You have to enter password";
    }
    else if (!firstName) {
        return "You have to enter first name";
    }
    else if (!lastName) {
        return "You have to enter last name";
    }
    else if (!email) {
        return "You have to enter email";
    }
    else if (!password) {
        return "You have to enter password";
    }
    else if (!isAlphabetic(firstName)) {
        return "Please enter a valid first name";
    }
    else if (!isAlphabetic(lastName)) {
        return "Please enter a valid last name";
    }
    else if (!isEmail(email)) {
        return "Please enter a valid email";
    }
    else if (!isPassword(password)) {
        return "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number";
    }
}

let userSignInValidation = (email, password) => {
    if (isEmail(email) && isPassword(password) && password && email) {
        return true;
    }
    else if (isEmpty(email)) {
        return "You have to enter email";
    }
    else if (isEmpty(password)) {
        return "You have to enter password";
    }
    else if (!email) {
        return "You have to enter email";
    }
    else if (!password) {
        return "You have to enter password";
    }
    else if (!isEmail(email)) {
        return "Please enter a valid email";
    }
    else if (!isPassword(password)) {
        return "Please enter a valid password";
    }
}

let editUserProfileValidation = (firstName, lastName, email) => {
    if ((isAlphabetic(firstName) && firstName && !lastName && !email) || (isAlphabetic(lastName) && lastName && !firstName && !email) ||
        (isEmail(email) && email && !firstName && !lastName) || (isAlphabetic(firstName) && firstName && isAlphabetic(lastName) && lastName && !email)
        || (isAlphabetic(firstName) && firstName && isEmail(email) && email && !lastName) || (isAlphabetic(lastName) && lastName && isEmail(email) && email && !firstName)
        || (isAlphabetic(firstName) && firstName && isAlphabetic(lastName) && lastName && isEmail(email) && email)) {
        return true;
    }
    else if (!(firstName || lastName || email)) {
        return "You have to enter updated data";
    }
    else if (isEmpty(firstName) && firstName) {
        return "You have to enter first name";
    }
    else if (isEmpty(lastName) && lastName) {
        return "You have to enter last name";
    }
    else if (isEmpty(email) && email) {
        return "You have to enter email";
    }
    else if (!isAlphabetic(firstName) && firstName) {
        return "Please enter a valid first name";
    }
    else if (!isAlphabetic(lastName) && lastName) {
        return "Please enter a valid last name";
    }
    else if (!isEmail(email) && email) {
        return "Please enter a valid email";
    }
}

let resetPasswordValidation = (oldPassword, newPassword, confirmNewPassword) => {
    if (isPassword(oldPassword) && isPassword(newPassword) && isPassword(confirmNewPassword) && oldPassword && newPassword && confirmNewPassword
        && (newPassword == confirmNewPassword)) {
        return true;
    }
    else if (!oldPassword) {
        return "You have to enter old password";
    }
    else if (!newPassword) {
        return "You have to enter new password";
    }
    else if (!confirmNewPassword) {
        return "You have to enter confirm password";
    }
    else if (isEmpty(oldPassword)) {
        return "You have to enter old password";
    }
    else if (isEmpty(newPassword)) {
        return "You have to enter new password";
    }
    else if (isEmpty(confirmNewPassword)) {
        return "You have to enter confirm password";
    }
    else if (!isPassword(oldPassword)) {
        return "Please enter a valid old password";
    }
    else if (!isPassword(newPassword)) {
        return "New password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number";
    }
    else if (confirmNewPassword != newPassword) {
        return "New password mismatch";
    }
}

let addAddressValidation = (country, city, street) => {
    if (isText(country) && isText(city) && isStreet(street) && country && city && street) {
        return true;
    }
    else if (!country) {
        return "You have to enter a country";
    }
    else if (!city) {
        return "You have to enter a city";
    }
    else if (!street) {
        return "You have to enter a street";
    }
    else if (isEmpty(country)) {
        return "You have to enter a country";
    }
    else if (isEmpty(city)) {
        return "You have to enter a city";
    }
    else if (isEmpty(street)) {
        return "You have to enter a street";
    }
    else if (!isText(country)) {
        return "Please enter a valid country";
    }
    else if (!isText(city)) {
        return "Please enter a valid city";
    }
    else if (!isStreet(street)) {
        return "Please enter a valid street";
    }
}

let editAddressValidation = (country, city, street) => {
    if ((isText(country) && country && !city && !street) || (isText(city) && city && !country && !street) || (isStreet(street) && street && !country && !city)
        || (isText(country) && isText(city) && country && city && !street) || (isText(country) && isStreet(street) && country && street && !city) ||
        (isText(city) && isStreet(street) && city && street && !country) || (isText(country) && isText(city) && isStreet(street) && city && street && country)) {
        return true;
    }
    else if (!(country || city || street)) {
        return "You have to enter updated data";
    }
    else if (isEmpty(country) && country) {
        return "You have to enter a country";
    }
    else if (isEmpty(city) && city) {
        return "You have to enter a city";
    }
    else if (isEmpty(street) && street) {
        return "You have to enter a street";
    }
    else if (!isText(country) && country) {
        return "Please enter a valid country name";
    }
    else if (!isText(city) && city) {
        return "Please enter a valid city name";
    }
    else if (!isStreet(street) && street) {
        return "Please enter a valid street";
    }
}

let addProfilePictureValidation = (base64Data, fileNameExtension) => {
    if (isBase64(base64Data) && isImageExtension(fileNameExtension) && base64Data && fileNameExtension) {
        return true;
    }
    else if (!base64Data) {
        return "You have to enter a base64 data";
    }
    else if (!fileNameExtension) {
        return "You have to enter a image extension";
    }
    else if (!isBase64(base64Data)) {
        return "You have to enter a valid base64 data";
    }
    else if (!isImageExtension(fileNameExtension)) {
        return "You have to enter a valid image extension";
    }
}

let sendEmailToGenerateRecoveryCodeValidation = (email) => {
    if (isEmail(email) && email) {
        return true;
    }
    else if (!email) {
        return "You have to enter your email to send recovery code";
    }
    else if (!isEmail(email)) {
        return "Please enter a valid email";
    }
}

let verifyRecoveryCodeValidation = (email, recoveryCode) => {
    if (isEmail(email) && isNum(recoveryCode) && email && recoveryCode) {
        return true;
    }
    else if (!email) {
        return "Please enter user email";
    }
    else if (!recoveryCode) {
        return "Please enter recovery code";
    }
    else if (!isEmail(email)) {
        return "Please enter a valid user email";
    }
    else if (!isNum(recoveryCode)) {
        return "Please enter a valid recovery code";
    }
}

let forgetPasswordFormValidation = (email, newPassword, confirmNewPassword) => {
    if (isEmail(email) && isPassword(newPassword) && email && newPassword && confirmNewPassword && (newPassword == confirmNewPassword)) {
        return true;
    }
    else if (!email) {
        return "You have to enter user email";
    }
    else if (!newPassword) {
        return "You have to enter new password";
    }
    else if (!confirmNewPassword) {
        return "You have to enter confirm password";
    }
    else if (!isEmail(email)) {
        return "Please enter a valid email";
    }
    else if (!isPassword(newPassword)) {
        return "New password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number";
    }
    else if (confirmNewPassword != newPassword) {
        return "Password mismatch";
    }
}

let contactUsFormValidation = (contactEmail, subject, message) => {
    if (isEmail(contactEmail) && isSubject(subject) && !isEmpty(message) && contactEmail && subject && message) {
        return true;
    }
    else if (!contactEmail) {
        return "Please enter email to contact you";
    }
    else if (!subject) {
        return "Please enter a message subject";
    }
    else if (!message) {
        return "Please enter a message";
    }
    else if (!isEmail(contactEmail)) {
        return "Please enter a valid email to contact you";
    }
    else if (!isSubject(subject)) {
        return "Message subject must contain minimum eight characters and maximum ninety characters";
    }
    else if (isEmpty(message)) {
        return "Message Cannot be empty";
    }
}

module.exports = {
    signUpValidation,
    userSignInValidation,
    editUserProfileValidation,
    resetPasswordValidation,
    addAddressValidation,
    editAddressValidation,
    addProfilePictureValidation,
    sendEmailToGenerateRecoveryCodeValidation,
    verifyRecoveryCodeValidation,
    forgetPasswordFormValidation,
    contactUsFormValidation
}