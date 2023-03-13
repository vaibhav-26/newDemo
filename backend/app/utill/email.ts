import mail from '../config/mail';
import ejs from "ejs"

const sendEmail = async (data: any, template: string) => {

  ejs.renderFile(template, { data }, (err, html) => {
    if (err) {
      console.log(err);
    } else {
      const mailOptions = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: html
      };

      mail.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  });

};

export default sendEmail