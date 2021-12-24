const User = require("../../../config/db.config");
const RecoveryCode = require("../../../config/db.config");
const Message = require("../../../config/db.config");
const fs = require('fs');
const path = require('path');
const uploadFolder = path.join(__dirname, "../../../uploads/user");
const { encode, decode } = require("../../../utils/encrypt");
const { getPostData } = require("../../../utils/getPostData");
const { signUpValidation, userSignInValidation, editUserProfileValidation, resetPasswordValidation, addAddressValidation, editAddressValidation,
    addProfilePictureValidation, sendEmailToGenerateRecoveryCodeValidation, verifyRecoveryCodeValidation, forgetPasswordFormValidation, contactUsFormValidation
} = require("../validation/user.validation");
const { mailer } = require("../../../utils/mailer");


let signUp = async (req, res) => {
    let body, response, userData;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    const { firstName, lastName, email, password } = body;
    try {
        if (signUpValidation(firstName, lastName, email, password) == true) {
            User.execute(`select * from user where email = '${email}'`, (err, data) => { userFound(data, userData); });
            let userFound = (data, user) => {
                user = data;
                if (user.length == 1) {
                    response = { status: 400, message: "This email already have an account" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
                else {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const idUniqueSuffix = Math.round(Math.random() * 1E9);
                    let hashedPassword = uniqueSuffix + process.env.SECRET_HASH_KEY + password;
                    let userId = Date.now() + process.env.SECRET_ID_KEY + idUniqueSuffix;
                    hashedPassword = encode(hashedPassword);
                    userId = encode(userId);
                    User.execute(`insert into user(_id, firstName, lastName, email, password) values('${userId}','${firstName}','${lastName}','${email}','${hashedPassword}')`);
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        }
        else {
            response = { status: 400, message: signUpValidation(firstName, lastName, email, password) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let userSignIn = async (req, res) => {
    let body, response, userData;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    const { email, password } = body;
    try {
        if (userSignInValidation(email, password) == true) {
            User.execute(`select * from user where email = '${email}'`, (err, data) => { userFound(data, userData); });
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid email" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
                else {
                    let decoedPassword = decode(user[0].password);
                    let pass = decoedPassword.split(process.env.SECRET_HASH_KEY)[1];
                    if (password == pass) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        let token = uniqueSuffix + process.env.SECRET_AUTH_KEY + user[0]._id + process.env.SECRET_AUTH_KEY + user[0].role + process.env.SECRET_AUTH_KEY + process.env.SECRET_HASH_KEY;
                        token = encode(token);
                        response = { status: 200, message: "Success", token: token };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                    else {
                        response = { status: 422, message: "This password is invalid" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                }
            }
        } else {
            response = { status: 400, message: userSignInValidation(email, password) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let editUserProfile = async (req, res) => {
    let body, response, userData, emailData, firstName, lastName, email;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    try {
        if (editUserProfileValidation(body.firstName, body.lastName, body.email) == true) {
            User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (email) => { User.execute((`update user set firstName = '${firstName}', lastName = '${lastName}', email = '${email}' where _id = '${req.id}'`)); }
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user id" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    if (body.firstName) { firstName = body.firstName; }
                    else { firstName = user[0].firstName; }
                    if (body.lastName) { lastName = body.lastName; }
                    else { lastName = user[0].lastName; }
                    if (body.email) { User.execute(`select * from user where email = '${body.email}'`, (err, data) => { emailFound(data, emailData); }); }
                    else {
                        email = user[0].email;
                        updateQuery(email);
                        response = { status: 200, message: "Success" };
                        response = JSON.stringify(response);
                        res.end(response)
                    }
                    let emailFound = (data, email) => {
                        email = data;
                        if (email.length == 1) {
                            response = { status: 400, message: "This email already have an account" };
                            response = JSON.stringify(response);
                            res.end(response)
                        }
                        else {
                            email = body.email;
                            updateQuery(email);
                            response = { status: 200, message: "Success" };
                            response = JSON.stringify(response);
                            res.end(response)
                        }
                    }
                }
            }
        } else {
            response = { status: 400, message: editUserProfileValidation(body.firstName, body.lastName, body.email) };
            response = JSON.stringify(response);
            res.end(response)
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let resetPassword = async (req, res) => {
    let body, response, userData;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    const { oldPassword, newPassword, confirmNewPassword } = body;
    try {
        if (resetPasswordValidation(oldPassword, newPassword, confirmNewPassword) == true) {
            User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (newHashedPassword) => { User.execute((`update user set password = '${newHashedPassword}' where _id = '${req.id}'`)); }
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user id" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    let currentPassword = decode(user[0].password);
                    currentPassword = currentPassword.split(process.env.SECRET_HASH_KEY)[1];
                    if (currentPassword == oldPassword) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        let newHashedPassword = uniqueSuffix + process.env.SECRET_HASH_KEY + newPassword;
                        newHashedPassword = encode(newHashedPassword);
                        updateQuery(newHashedPassword);
                        response = { status: 200, message: "Success" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                    else {
                        response = { status: 400, message: "Please enter correct old password" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                }
            }
        } else {
            response = { status: 400, message: resetPasswordValidation(oldPassword, newPassword, confirmNewPassword) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let addAddress = async (req, res) => {
    let body, response, userData;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    const { country, city, street } = body;
    try {
        if (addAddressValidation(country, city, street) == true) {
            User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (country, city, street) => { User.execute((`update user set country = '${country}', city = '${city}', street = '${street}' where _id = '${req.id}'`)); };
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user id" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    updateQuery(country, city, street);
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        } else {
            response = { status: 400, message: addAddressValidation(country, city, street) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let editAddress = async (req, res) => {
    let body, response, userData, country, city, street;
    await req.on('data', chunk => { body = JSON.parse(chunk); });
    country = body.country;
    city = body.city;
    street = body.street;
    try {
        if (editAddressValidation(country, city, street) == true) {
            User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (country, city, street) => { User.execute((`update user set country = '${country}', city = '${city}', street = '${street}' where _id = '${req.id}'`)); };
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user id" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    if (!body.country) country = user[0].country;
                    if (!body.city) city = user[0].city;
                    if (!body.street) street = user[0].street;
                    updateQuery(country, city, street);
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        } else {
            response = { status: 400, message: editAddressValidation(country, city, street) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let deleteAddress = async (req, res) => {
    let response, userData;
    try {
        User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
        let updateQuery = () => { User.execute((`update user set country = NULL, city = NULL, street = NULL where _id = '${req.id}'`)); };
        let userFound = (data, user) => {
            user = data;
            if (user.length == 0) {
                response = { status: 400, message: "Please enter a valid user id" };
                response = JSON.stringify(response);
                res.end(response)
            }
            else {
                updateQuery();
                response = { status: 200, message: "Success" };
                response = JSON.stringify(response);
                res.end(response);
            }
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let addProfilePicture = async (req, res) => {
    let response, userData;
    try {
        let body = await getPostData(req);
        body = JSON.parse(body);
        let profilePicture = body.profilePicture;
        if (addProfilePictureValidation(profilePicture.data, profilePicture.name) == true) {
            User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (profilePictureURL) => { User.execute((`update user set profilePictureURL = '${profilePictureURL}' where _id = '${req.id}'`)); };
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user id" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const buffer = Buffer.from(profilePicture.data, "base64");
                    const profilePictureURL = 'uploads/user/' + uniqueSuffix + '-' + profilePicture.name;
                    if (user[0].profilePictureURL == null) {
                        fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + profilePicture.name), buffer);
                        updateQuery(profilePictureURL);
                        response = { status: 200, message: "Success" };
                        response = JSON.stringify(response);
                        res.end(response);
                    } else {
                        fs.writeFileSync(path.join(uploadFolder, uniqueSuffix + '-' + profilePicture.name), buffer);
                        updateQuery(profilePictureURL);
                        fs.unlinkSync(user[0].profilePictureURL);
                        response = { status: 200, message: "Success" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                }
            }
        } else {
            response = { status: 400, message: addProfilePictureValidation(profilePicture.data, profilePicture.name) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let deleteProfilePicture = async (req, res) => {
    let response, userData;
    try {
        User.execute(`select * from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
        let updateQuery = () => { User.execute((`update user set profilePictureURL = NULL where _id = '${req.id}'`)); };
        let userFound = (data, user) => {
            user = data;
            if (user.length == 0) {
                response = { status: 400, message: "Please enter a valid user id" };
                response = JSON.stringify(response);
                res.end(response)
            }
            else {
                if (user[0].profilePictureURL == null) {
                    response = { status: 400, message: "Your profile picture already not exists" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
                else {
                    fs.unlinkSync(user[0].profilePictureURL);
                    updateQuery();
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let sendEmailToGenerateRecoveryCode = async (req, res) => {
    let response, userData, recoveryCodeData;
    try {
        let body = await getPostData(req);
        body = JSON.parse(body);
        let { email } = body;
        if (sendEmailToGenerateRecoveryCodeValidation(email) == true) {
            User.execute(`select * from user where email = '${email}'`, (err, data) => { userFound(data, userData); });
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter correct email" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    let randomVerficationCode = Math.floor(Math.random() * 10000000);
                    const idUniqueSuffix = Math.round(Math.random() * 1E9);
                    let recoveryCodeId = Date.now() + process.env.SECRET_ID_KEY + idUniqueSuffix;
                    recoveryCodeId = encode(recoveryCodeId);
                    RecoveryCode.execute(`select * from recoveryCode where userEmail = '${email}'`, (err, data) => { recoveryCodeFound(data, recoveryCodeData); });
                    let recoveryCodeFound = (data, userRecoveryCode) => {
                        userRecoveryCode = data;
                        if (userRecoveryCode.length == 0) {
                            RecoveryCode.execute(`insert into recoveryCode(_id, userEmail, recoveryCode) values('${recoveryCodeId}','${email}','${randomVerficationCode}')`);
                        }
                        else {
                            RecoveryCode.execute((`update recoveryCode set recoveryCode = '${randomVerficationCode}' where userEmail = '${email}'`));
                        }
                    }
                    let resetPassword = {
                        email: email,
                        subject: "Reset Password Email",
                        text: `You forgot your password! Here is your recovery code ${randomVerficationCode}`,
                        html: `
                        <section style="width: 45%; padding: 50px; background-color: gray; margin: 70px auto; box-shadow: 0px 0px 15px
                        0px rgba(0,0,0,0.2);">
                    
                            
                            <div>
                                <h2 style="text-align:center;">Reset your Password!</h2>
                                <p style="font-size: 15px;text-align: left;">You forgot your password! Here is your recovery code</p>
                                    <h3 style="color: #ffb21d;
                                    background: #1b1b1b;
                                    padding: 10px 20px;
                                    border-radius: 4px;
                                    text-decoration: none;
                                    display: block;
                                    margin: auto;
                                    width: 45%;
                                    text-align: center;">${randomVerficationCode} </h3>
                    
                            </div>
                        </section>
                       `,
                    };
                    mailer(resetPassword.email, resetPassword.subject, resetPassword.text, resetPassword.html);
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        } else {
            response = { status: 400, message: sendEmailToGenerateRecoveryCodeValidation(email) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let verifyRecoveryCode = async (req, res) => {
    let response, recoveryCodeData;
    try {
        let body = await getPostData(req);
        body = JSON.parse(body);
        let { email, recoveryCode } = body;
        if (verifyRecoveryCodeValidation(email, recoveryCode) == true) {
            RecoveryCode.execute(`select * from recoveryCode where userEmail = '${email}'`, (err, data) => { recoveryCodeFound(data, recoveryCodeData); });
            let recoveryCodeFound = (data, userRecoveryCode) => {
                userRecoveryCode = data;
                if (userRecoveryCode.length == 0) {
                    response = { status: 400, message: "Please enter a correct email" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
                else {
                    if (userRecoveryCode[0].recoveryCode == recoveryCode) {
                        RecoveryCode.execute(`delete from recoveryCode where userEmail = '${email}'`);
                        response = { status: 200, message: "Success, correct recovery code" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                    else {
                        response = { status: 400, message: "Incorrect recovery code" };
                        response = JSON.stringify(response);
                        res.end(response);
                    }
                }
            }
        } else {
            response = { status: 400, message: verifyRecoveryCodeValidation(email, recoveryCode) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let forgetPasswordForm = async (req, res) => {
    let response, userData;
    try {
        let body = await getPostData(req);
        body = JSON.parse(body);
        let { email, newPassword, confirmNewPassword } = body;
        if (forgetPasswordFormValidation(email, newPassword, confirmNewPassword) == true) {
            User.execute(`select * from user where email = '${email}'`, (err, data) => { userFound(data, userData); });
            let updateQuery = (newHashedPassword) => { User.execute((`update user set password = '${newHashedPassword}' where email = '${email}'`)); }
            let userFound = (data, user) => {
                user = data;
                if (user.length == 0) {
                    response = { status: 400, message: "Please enter a valid user email" };
                    response = JSON.stringify(response);
                    res.end(response)
                }
                else {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    let newHashedPassword = uniqueSuffix + process.env.SECRET_HASH_KEY + newPassword;
                    newHashedPassword = encode(newHashedPassword);
                    updateQuery(newHashedPassword);
                    response = { status: 200, message: "Success" };
                    response = JSON.stringify(response);
                    res.end(response);
                }
            }
        } else {
            response = { status: 400, message: forgetPasswordFormValidation(email, newPassword, confirmNewPassword) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let contactUsForm = async (req, res) => {
    let response;
    try {
        let body = await getPostData(req);
        body = JSON.parse(body);
        let { contactEmail, subject, message } = body;
        if (contactUsFormValidation(contactEmail, subject, message) == true) {
            const idUniqueSuffix = Math.round(Math.random() * 1E9);
            let messageId = Date.now() + process.env.SECRET_ID_KEY + idUniqueSuffix;
            messageId = encode(messageId);
            Message.execute(`insert into message(_id, contactEmail, subject, message) values('${messageId}','${contactEmail}','${subject}','${message}')`);
            response = { status: 200, message: "Success" };
            response = JSON.stringify(response);
            res.end(response)
        } else {
            response = { status: 400, message: contactUsFormValidation(contactEmail, subject, message) };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let getCurrentUser = async (req, res) => {
    let response, userData;
    try {
        User.execute(`select _id, firstName, lastName, email, profilePictureURL, country, city, street, role from user where _id = '${req.id}'`, (err, data) => { userFound(data, userData); });
        let userFound = (data, user) => {
            user = data;
            if (user.length == 0) {
                response = { status: 400, message: "Please enter a valid user id" };
                response = JSON.stringify(response);
                res.end(response)
            }
            else {
                response = { status: 200, message: "Success", user: user[0] };
                response = JSON.stringify(response);
                res.end(response);
            }
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

let getAllUsers = async (req, res) => {
    let response, userData;
    try {
        User.execute(`select _id, firstName, lastName, email, profilePictureURL, country, city, street, role from user`, (err, data) => { userFound(data, userData); });
        let userFound = (data, user) => {
            user = data;
            response = { status: 200, message: "Success", allUsers: user };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong" };
        response = JSON.stringify(response);
        res.end(response);
    }
}

module.exports = {
    signUp,
    userSignIn,
    editUserProfile,
    resetPassword,
    addAddress,
    editAddress,
    deleteAddress,
    addProfilePicture,
    deleteProfilePicture,
    sendEmailToGenerateRecoveryCode,
    verifyRecoveryCode,
    forgetPasswordForm,
    contactUsForm,
    getCurrentUser,
    getAllUsers
}