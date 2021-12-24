let { signUp, userSignIn, editUserProfile, resetPassword, addAddress, editAddress, deleteAddress, addProfilePicture, deleteProfilePicture, forgetPasswordForm,
    sendEmailToGenerateRecoveryCode, verifyRecoveryCode, contactUsForm, getCurrentUser, getAllUsers } = require("../controller/user.controller");
const { isUserAuthorized, isAdminAuthorized } = require("../../../utils/auth");

let userRoutes = async (req, res) => {
    //Website
    if (req.url == "/signUp" && req.method == "POST") signUp(req, res);
    else if (req.url == "/userSignIn" && req.method == "POST") userSignIn(req, res);
    else if (req.url == "/editUserProfile" && req.method == "PUT") isUserAuthorized(req, res, editUserProfile);
    else if (req.url == "/resetPassword" && req.method == "PUT") isUserAuthorized(req, res, resetPassword);
    else if (req.url == "/addAddress" && req.method == "PUT") isUserAuthorized(req, res, addAddress);
    else if (req.url == "/editAddress" && req.method == "PUT") isUserAuthorized(req, res, editAddress);
    else if (req.url == "/deleteAddress" && req.method == "DELETE") isUserAuthorized(req, res, deleteAddress);
    else if (req.url == "/addProfilePicture" && req.method == "PUT") isUserAuthorized(req, res, addProfilePicture)
    else if (req.url == "/deleteProfilePicture" && req.method == "DELETE") isUserAuthorized(req, res, deleteProfilePicture);
    else if (req.url == "/sendEmailToGenerateRecoveryCode" && req.method == "POST") sendEmailToGenerateRecoveryCode(req, res);
    else if (req.url == "/verifyRecoveryCode" && req.method == "POST") verifyRecoveryCode(req, res);
    else if (req.url == "/forgetPasswordForm" && req.method == "PUT") forgetPasswordForm(req, res);
    else if (req.url == "/contactUsForm" && req.method == "POST") isUserAuthorized(req, res, contactUsForm);
    else if (req.url == "/getCurrentUser" && req.method == "GET") isUserAuthorized(req, res, getCurrentUser);
    //Dashboard
    else if (req.url == "/getAllUsers" && req.method == "GET") isAdminAuthorized(req,res, getAllUsers);
}


module.exports = userRoutes;