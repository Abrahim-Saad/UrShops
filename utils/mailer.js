const nodemailer = require("nodemailer");

let mailer = async (email, subject, text, html) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "UrShops0@gmail.com",
            pass: "2001@UrShops"
        }
    });
    transporter.sendMail(
        {
            from: "UrShops0@gmail.com",
            to: email,
            subject: subject,
            text: text,
            html: html,
        },
        (err, info) => {
            if(info) return true;
            if(err) return false;
        }
    );
}

module.exports = {
    mailer
}