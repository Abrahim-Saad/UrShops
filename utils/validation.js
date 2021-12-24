let isEmpty = data => {return(data == "")}

let isAlphabetic = data => {return(/^[A-Za-z]+$/.test(data))}

let isAlphaNum = data => {return(/^[A-Za-z]{3,}[A-Za-z0-9]+$/).test(data)}

let isNum = data => {return(/^[0-9]+$/.test(data))}

let isEmail = data => {return(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data))}

let isUrl = data => {return(/^(ftp|http|https):\/\/[^ "]+$/.test(data))}

//Minimum 8 characters + Maximum 20 characters + At least one uppercase character + At least one lowercase character + At least one digit + At least one special character 
let isPassword = data => {return(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\/-])[A-Za-z\d@$!%*?&]{8,}$/.test(data))}

let isText = data => {return(/^[A-Za-z ]+$/.test(data))}

let isStreet= data => {return(/^[A-Za-z0-9 ,]+$/.test(data))}

let isBase64 = data => {return(/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/.test(data))}

let isImageExtension = data => {return(/(.*)[.](jpg|jpeg|png|JPG|JPEG|PNG)$/.test(data))}

let isSubject = data => {return(/^[A-Za-z0-9  @$!%*?&,.]{3,90}$/.test(data))}

module.exports = {
    isEmpty,
    isAlphabetic,
    isAlphaNum,
    isNum,
    isEmail,
    isUrl,
    isPassword,
    isText,
    isStreet,
    isBase64,
    isImageExtension,
    isSubject
}