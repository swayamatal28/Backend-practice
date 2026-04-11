const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "atalswayam28@gmail.com",
        pass: "esxyadyxbpawsqvl" // NOT your real password
    }
});

module.exports = transporter;