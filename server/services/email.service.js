const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require("path");

const emailTemplates = require('../email-templates')
const ApiError = require("../errors/ApiError");
const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, CLIENT_URL } = require('../configs/configs');

const sendEmail = async (receiverMail, emailAction, locals = {}) => {
    // console.log(receiverMail);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    // console.log(`emailTemplates`);
    // console.log(emailTemplates);

    // console.log(`emailAction`);
    // console.log(emailAction);
    
    const templateInfo = emailTemplates[emailAction]
    if (!templateInfo) {
        throw new ApiError(500, 'Wrong template')
    }

    // console.log(`templateInfo`);
    // console.log(templateInfo);
    
    
    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });
    // console.log(`templateRenderer`);
    // console.log(templateRenderer);

    Object.assign(locals || {}, {frontendURL: 'http://localhost:3000'});

    const html = await templateRenderer.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'SHOPERS_VI',
        to: receiverMail,
        subject: templateInfo.subject,
        html
    })

};

module.exports = {
    sendEmail
}