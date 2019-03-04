(function(mailer){
    const nodemailer = require('nodemailer');
    mailer.sendMail = function(){
        const account = nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'vicky3@ethereal.email',
                pass: 'd94aQ5Fbsrxs5Vaxj5'
            }
        });

        let mailOptions = {
            from: '"Osama Ejaz 👻" <osamaejaz1234@gmail.com>', // sender address
            to: "osama.supertron@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        };

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err)
                return err;
            else
                return info;
        });
    }
})(module.exports)