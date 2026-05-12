// import nodemailer from 'nodemailer'
// import 'dotenv/config'

// export const verifyEmail=(token,email)=>{
//     const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
// });

// const mailConfigurations = {
//     from: process.env.MAIL_USER,
//     to:email,
//     subject: 'Email Verification',
//     text: `Hi! There, You have recently visited 
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:5173/verify/${token} 
//            Thanks`
// };

// transporter.sendMail(mailConfigurations, function(error, info){
//     if (error) throw Error(error);
//     console.log('Email Sent Successfully');
//     console.log(info);
// });

// }

import nodemailer from 'nodemailer';
import 'dotenv/config';

export const verifyEmail = async (token, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const verifyLink=`${process.env.FRONTEND_URL}/verify/${token}`

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Hi! You recently registered.
Please verify your email:${verifyLink}
Thanks`
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log('✅ Email Sent Successfully');
        console.log(info);

    } catch (error) {
        console.error(" Email Error:", error.message);
        
    }
};

