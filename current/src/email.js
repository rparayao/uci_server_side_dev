import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer'

const generatePasswordResetKey = async () =>
  (await randomBytes(16)).toString('hex');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rparayao@gmail.com', pass: 'xxxxx@goo'
  }
});

const generatePasswordResetMessage = (display_name, key) => `
Hello ${display_name},
Someone requested that your password to the jokes site be reset.
`;

export const sendResetEmail =
  async ({ display_name, email, id }) => {
    const key = await generatePasswordResetKey();
    // Since this is just an example (and I don't want to commit my gmail
    // password) this version will just log the email details instead
    console.log('"Sending" an email', {
      from: 'rparayao@gmail.com',
      to: email,
      subject: 'Password Reset ',
      text: generatePasswordResetMessage(display_name, key)
    });
    await transport.sendMail({
       from: 'rparayao@gmail.com',
       to: email,
       subject: 'Password Reset ',
       text: generatePasswordResetMessage(display_name, key)
     });
    return key;
  };

