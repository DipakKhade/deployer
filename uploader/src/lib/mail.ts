import {createTransport} from 'nodemailer';

const transporter = createTransport({
    host: process.env.ENDPOINT,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
})

export const sendTokenViaEmail = async (to:string,message:string,) =>{
    await transporter.sendMail({
        from: "dipakhade214@gmail.com", 
        sender: "dipakhade214@gmail.com",
        to: to,
        subject: "click the follwing url to verfiy your email",
        text:message
    })

}
