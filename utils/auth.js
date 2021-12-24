const { decode } = require("./encrypt");

let isUserAuthorized = async (req, res, next) => {
    try {
        let response;
        if (req.headers.authorization) {
            let bareToken = req.headers.authorization;
            let token = bareToken.split(" ")[1];
            let decoded = decode(token);
            let decodedArrayLength = decoded.split(process.env.SECRET_AUTH_KEY).length;
            let lastDecodedElement = decoded.split(process.env.SECRET_AUTH_KEY)[3];
            req.role = decoded.split(process.env.SECRET_AUTH_KEY)[2];
            req.id = decoded.split(process.env.SECRET_AUTH_KEY)[1];
            if(req.role == "user" && decodedArrayLength == 4 && lastDecodedElement == process.env.SECRET_HASH_KEY) {
                next(req,res);
            }
            else {
                response = { status: 401, message: "unauthorized" };
                response = JSON.stringify(response);
                res.end(response);
            }
        }
        else {
            response = { status: 401, message: "unauthorized" };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong"};
        response = JSON.stringify(response);
        res.end(response);
    }
}

let isAdminAuthorized = async (req, res, next) => {
    try {
        let response;
        if (req.headers.authorization) {
            let bareToken = req.headers.authorization;
            let token = bareToken.split(" ")[1];
            let decoded = decode(token);
            let decodedArrayLength = decoded.split(process.env.SECRET_AUTH_KEY).length;
            let lastDecodedElement = decoded.split(process.env.SECRET_AUTH_KEY)[3];
            req.role = decoded.split(process.env.SECRET_AUTH_KEY)[2];
            req.id = decoded.split(process.env.SECRET_AUTH_KEY)[1];
            if( ( req.role == "admin" || req.role == "superAdmin" ) && decodedArrayLength == 4 && lastDecodedElement == process.env.SECRET_HASH_KEY) {
                next(req,res);
            }
            else {
                response = { status: 401, message: "unauthorized" };
                response = JSON.stringify(response);
                res.end(response);
            }
        }
        else {
            response = { status: 401, message: "unauthorized" };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong"};
        response = JSON.stringify(response);
        res.end(response);
    }
}

let isSuperAdminAuthorized = async (req, res, next) => {
    try {
        let response;
        if (req.headers.authorization) {
            let bareToken = req.headers.authorization;
            let token = bareToken.split(" ")[1];
            let decoded = decode(token);
            let decodedArrayLength = decoded.split(process.env.SECRET_AUTH_KEY).length;
            let lastDecodedElement = decoded.split(process.env.SECRET_AUTH_KEY)[3];
            req.role = decoded.split(process.env.SECRET_AUTH_KEY)[2];
            req.id = decoded.split(process.env.SECRET_AUTH_KEY)[1];
            if(req.role == "superAdmin" && decodedArrayLength == 4 && lastDecodedElement == process.env.SECRET_HASH_KEY) {
                next(req,res);
            }
            else {
                response = { status: 401, message: "unauthorized" };
                response = JSON.stringify(response);
                res.end(response);
            }
        }
        else {
            response = { status: 401, message: "unauthorized" };
            response = JSON.stringify(response);
            res.end(response);
        }
    } catch (err) {
        response = { status: 500, message: "Something went wrong"};
        response = JSON.stringify(response);
        res.end(response);
    }
}

module.exports = {
    isUserAuthorized,
    isAdminAuthorized,
    isSuperAdminAuthorized
}