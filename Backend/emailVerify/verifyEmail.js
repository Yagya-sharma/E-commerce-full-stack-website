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

// import nodemailer from 'nodemailer';
// import 'dotenv/config';

// export const verifyEmail = async (token, email) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS
//             }
//         });

//         const verifyLink=`${process.env.FRONTEND_URL}/verify/${token}`

//         const mailConfigurations = {
//             from: process.env.MAIL_USER,
//             to: email,
//             subject: 'Email Verification',
//             text: `Hi! You recently registered.
// Please verify your email:${verifyLink}
// Thanks`
//         };

//         const info = await transporter.sendMail(mailConfigurations);

//         console.log('✅ Email Sent Successfully');
//         console.log(info);

//     } catch (error) {
//         console.error(" Email Error:", error.message);

//     }
// };


import nodemailer from 'nodemailer';
import 'dotenv/config';

export const verifyEmail = async (token, email) => {
    try {

        console.log("MAIL USER:", process.env.MAIL_USER);
        console.log("FRONTEND URL:", process.env.FRONTEND_URL);

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    family: 4
});

        // await transporter.verify();
        console.log("✅ Mail server ready");

        const verifyLink = `${process.env.FRONTEND_URL}/verify/${token}`;

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `
                <h2>Email Verification</h2>
                <p>Click below to verify your email:</p>
                <a href="${verifyLink}">Verify Email</a>
            `
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log("✅ Email Sent Successfully");
        console.log(info);

    } catch (error) {

        console.log("❌ FULL EMAIL ERROR:");
        console.log(error);

    }
};

