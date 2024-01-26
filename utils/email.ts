import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // host của email server
  port: 465, // cổng
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "xuantuananh2212@gmail.com",
    pass: "trbt ovte mwfy roia",
  },
});
const sendMail = async (to: string, subject: string, message: string) => {
  const info = await transporter.sendMail({
    from: "xuantuananh2212@gmail.com", // sender address
    to, // list of receivers
    subject, // Subject line
    html: message, // html body
  });
  return info;
};

export { sendMail };
